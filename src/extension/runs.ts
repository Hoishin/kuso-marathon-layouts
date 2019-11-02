import _ from 'lodash';

import {NodeCG} from './types/server';

export const setupRuns = (nodecg: NodeCG) => {
	const scheduleRep = nodecg.Replicant('schedule', {defaultValue: []});
	const currentRunRep = nodecg.Replicant('currentRunIndex', {
		defaultValue: 0,
	});

	const setCurrentRun = (index: number) => {
		if (!scheduleRep.value) {
			return;
		}
		if (scheduleRep.value[index]) {
			currentRunRep.value = index;
		}
	};

	nodecg.listenFor('previousRun', () => {
		if (typeof currentRunRep.value === 'number') {
			setCurrentRun(currentRunRep.value - 1);
		} else {
			setCurrentRun(0);
		}
	});
	nodecg.listenFor('nextRun', () => {
		if (typeof currentRunRep.value === 'number') {
			setCurrentRun(currentRunRep.value + 1);
		} else {
			setCurrentRun(0);
		}
	});
};
