import {setInterval} from 'timers';
import {google} from 'googleapis';
import _ from 'lodash';
import * as moment from 'moment';
import {NodeCG} from './types/server';
import {Participant, Run} from './types/nodecg';

const UPDATE_INTERVAL = 30 * 1000;

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
				ranges: ['schedule!A:N'],
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
				const runner1: Participant = {
					name: game.runner1 || '???',
					nico: game.runner1Nico || undefined,
					twitch: game.runner1Twitch || undefined,
					twitter: game.runner1Twitter || undefined,
				};
				const runner2: Participant = {
					name: game.runner2 || '???',
					nico: game.runner2Nico || undefined,
					twitch: game.runner2Twitch || undefined,
					twitter: game.runner2Twitter || undefined,
				};
				return {
					index,
					category: game.category || '???',
					commentators: [{name: game.commentator || ''}],
					estimate: game.estimate
						? moment.duration(game.estimate).asSeconds()
						: 0,
					game: game.title || '???',
					runners: [runner1, runner2],
					startTime: game.startTime
						? new Date(`${game.startTime}+0900`).getTime()
						: 0,
					platform: game.platform,
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
