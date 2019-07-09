import Twit from 'twit';
import _ from 'lodash';
import {NodeCG} from './types/server';
import tweetSample from './samples/raw-tweet.json';
import {Tweet} from './types/nodecg';

export const setupTweets = (nodecg: NodeCG) => {
	const logger = new nodecg.Logger('extension/tweets.ts');

	const twitterConfig = nodecg.bundleConfig.twitter;
	if (!twitterConfig) {
		logger.warn('Add twitter configuration to use tweet stream');
		return;
	}

	const streamLogger = new nodecg.Logger('extension/tweets.ts:stream');
	const tweetsRep = nodecg.Replicant('tweets', {defaultValue: []});
	const addTweet = (newTweet: Tweet) => {
		if (
			tweetsRep.value &&
			!tweetsRep.value.some((tweet) => tweet.id === newTweet.id)
		) {
			tweetsRep.value = [newTweet, ...tweetsRep.value.slice(0, 99)];
		} else {
			tweetsRep.value = [newTweet];
		}
	};
	const tweetTrackWordsRep = nodecg.Replicant('tweetTrackWords', {
		defaultValue: [],
	});
	const tweetStreamStatus = nodecg.Replicant('tweetStreamStatus', {
		defaultValue: {connection: 'disconnected', error: false},
	});

	const twit = new Twit({
		consumer_key: twitterConfig.consumerKey,
		consumer_secret: twitterConfig.consumerSecret,
		access_token: twitterConfig.accessToken,
		access_token_secret: twitterConfig.accessTokenSecret,
	});

	/**
	 * Incoming stream from Twitter
	 */
	let stream: Twit.Stream | null = null;

	const startStream = _.throttle((trackWords: string[]) => {
		try {
			if (stream) {
				stream.stop();
			}

			if (tweetStreamStatus.value) {
				tweetStreamStatus.value.connection = 'disconnected';
			} else {
				tweetStreamStatus.value = {
					connection: 'disconnected',
					error: false,
				};
			}

			if (trackWords.length === 0) {
				streamLogger.warn('Tracking words are empty. Pausing stream.');
				return;
			}

			stream = twit.stream('statuses/filter', {track: trackWords});

			stream.on('tweet', (rawTweet: typeof tweetSample) => {
				if (tweetStreamStatus.value) {
					if (tweetStreamStatus.value.connection !== 'connected') {
						tweetStreamStatus.value.connection = 'connected';
					}
					if (tweetStreamStatus.value.error === true) {
						tweetStreamStatus.value.error = false;
					}
				} else {
					tweetStreamStatus.value = {
						connection: 'connected',
						error: false,
					};
				}

				if (
					rawTweet.retweeted_status ||
					rawTweet.quoted_status ||
					rawTweet.in_reply_to_user_id
				) {
					return;
				}

				const newTweet: Tweet = {
					id: rawTweet.id_str,
					user: {
						icon: rawTweet.user.profile_image_url_https,
						name: rawTweet.user.name,
						screenName: rawTweet.user.screen_name,
					},
					content: rawTweet.text,
				};
				addTweet(newTweet);
			});
			stream.on('disconnect', (msg) => {
				// Twitter disconnected the connection
				streamLogger.error('disconnect', msg);
				if (tweetStreamStatus.value) {
					tweetStreamStatus.value.connection = 'disconnected';
					tweetStreamStatus.value.error = true;
				} else {
					tweetStreamStatus.value = {
						connection: 'disconnected',
						error: true,
					};
				}
				startStream(trackWords);
			});
			stream.on('connect', () => {
				// Started connection attempt
				if (tweetStreamStatus.value) {
					tweetStreamStatus.value.connection = 'connecting';
				} else {
					tweetStreamStatus.value = {
						connection: 'connecting',
						error: false,
					};
				}
			});
			stream.on('reconnect', (_req, _res, connectInterval: number) => {
				// Twitter is having problems or we get rate limited. Reconnetion scheduled.
				streamLogger.warn(`Reconnecting in ${connectInterval}ms`);
				tweetStreamStatus.value = {
					connection: 'connecting',
					error: true,
				};
			});
			stream.on('connected', () => {
				// Successfully connected stream
				tweetStreamStatus.value = {
					connection: 'connected',
					error: false,
				};
			});
			stream.on('warning', (warnMsg) => {
				// Stream is stalling
				streamLogger.warn('Warning:', warnMsg);
			});
			stream.on(
				'error',
				(error: {
					message: string;
					statusCode: string;
					code: string;
					twitterReply: string;
					allErrors: string;
				}) => {
					streamLogger.error(error);
				},
			);
		} catch (error) {
			streamLogger.error(error.stack);
			if (tweetStreamStatus.value) {
				tweetStreamStatus.value.error = true;
			}
			startStream(trackWords);
		}
	}, 10 * 1000);

	tweetTrackWordsRep.on('change', startStream);

	nodecg.listenFor('deleteTweet', (data) => {
		if (!tweetsRep.value || twitterConfig.debug) {
			return;
		}
		tweetsRep.value = tweetsRep.value.filter(
			(tweet) => tweet.id !== data.id,
		);
	});
};
