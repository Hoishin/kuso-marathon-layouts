import Twit from 'twit';
import {throttle} from 'lodash';
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

	const startStream = throttle((trackWords: string[]) => {
		try {
			if (stream) {
				stream.stop();
			}

			tweetStreamStatus.value = {
				connection: 'disconnected',
				error: false,
			};

			stream = twitterConfig.debug
				? twit.stream('statuses/sample')
				: twit.stream('statuses/filter', {track: trackWords});

			stream.on('tweet', (rawTweet: typeof tweetSample) => {
				if (tweetStreamStatus.value) {
					if (tweetStreamStatus.value.connection !== 'connected') {
						tweetStreamStatus.value.connection = 'connected';
					}
					if (tweetStreamStatus.value.error === true) {
						tweetStreamStatus.value.error = false;
					}
				}
				const tweet: Tweet = {
					id: rawTweet.id_str,
					user: {
						name: rawTweet.user.name,
						screenName: rawTweet.user.screen_name,
					},
					content: rawTweet.text,
				};
				if (tweetsRep.value) {
					if (tweetsRep.value.length >= 100) {
						tweetsRep.value.shift();
					}
					tweetsRep.value.push(tweet);
				} else {
					tweetsRep.value = [tweet];
				}
			});
			stream.on('disconnect', (msg) => {
				// Twitter disconnected the connection
				streamLogger.error('disconnect', msg);
				if (tweetStreamStatus.value) {
					tweetStreamStatus.value.error = true;
				}
				startStream(trackWords);
			});
			stream.on('connect', () => {
				// Started connection attempt
				if (tweetStreamStatus.value) {
					tweetStreamStatus.value.connection = 'connecting';
				}
			});
			stream.on('reconnect', (_req, _res, connectInterval: number) => {
				// Twitter is having problems or we get rate limited. Reconnetion scheduled.
				streamLogger.warn(`Reconnecting in ${connectInterval}ms`);
				if (tweetStreamStatus.value) {
					tweetStreamStatus.value.connection = 'connecting';
				}
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
		}
	}, 10 * 1000);

	tweetTrackWordsRep.on('change', startStream);
};
