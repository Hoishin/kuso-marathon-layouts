import {setInterval} from 'timers';
import {google} from 'googleapis';
import _ from 'lodash';
import * as moment from 'moment';
import {NodeCG} from './types/server';
import {Participant, Run} from './types/nodecg';

// rate limit is 100req / 100sec
const UPDATE_INTERVAL = 3 * 1000;

export const setupSchedule = (nodecg: NodeCG) => {
	const googleConfig = nodecg.bundleConfig.google;

	if (!googleConfig) {
		nodecg.log.warn('Google API is not set up');
		return;
	}

	const scheduleRep = nodecg.Replicant('schedule', {defaultValue: []});

	const sheets = google.sheets({version: 'v4', auth: googleConfig.apiKey});

	const fetch = async () => {
		try {
			const res = await sheets.spreadsheets.values.batchGet({
				spreadsheetId: googleConfig.spreadsheetId,
				ranges: ['schedule!A:R'],
			});
			const sheetValues = res.data.valueRanges;
			if (!sheetValues) {
				nodecg.log.error('Could not fetch values from spreadsheet');
				return;
			}

			const [scheduleValue] = sheetValues;

			if (!scheduleValue.values) {
				nodecg.log.error('Fetch spreadsheet values is empty');
				return;
			}

			const [labels, ...contents] = scheduleValue.values;

			const games = contents.map((content) =>
				_.zipObject(labels, content),
			);

			const newSchedule = games.map<Run>((game, index) => {
				const runners: Participant[] = [
					{
						name: game.runner1 || '???',
						nico: game.runner1Nico || undefined,
						twitch: game.runner1Twitch || undefined,
						twitter: game.runner1Twitter || undefined,
					},
				];
				if (game.runner2) {
					runners.push({
						name: game.runner2 || '???',
						nico: game.runner2Nico || undefined,
						twitch: game.runner2Twitch || undefined,
						twitter: game.runner2Twitter || undefined,
					});
				}
				return {
					index,
					category: game.category || '???',
					commentators: [
						{
							name: game.commentator || '',
							twitch: game.commentatorTwitch,
							twitter: game.commentatorTwitter,
							nico: game.commentatorNico,
						},
					],
					estimate: game.estimate
						? moment.duration(game.estimate).asSeconds()
						: 0,
					game: game.title || '???',
					runners,
					startTime: game.startTime
						? new Date(`${game.startTime}+0900`).getTime()
						: 0,
					platform: game.platform,
					imageUrl: game.image,
				};
			});

			if (!_.isEqual(scheduleRep.value, newSchedule)) {
				scheduleRep.value = newSchedule;
			}
		} catch (error) {
			nodecg.log.error('Failed to update schedule:', error.stack);
		}
	};

	fetch();
	let fetchInterval: NodeJS.Timeout;
	fetchInterval = setInterval(fetch, UPDATE_INTERVAL);
	nodecg.listenFor('updateSchedule', () => {
		fetch();
		clearInterval(fetchInterval);
		fetchInterval = setInterval(fetch, UPDATE_INTERVAL);
	});
};
