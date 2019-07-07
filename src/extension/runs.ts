import _ from 'lodash';
import {NodeCG} from './types/server';

export const setupRuns = (nodecg: NodeCG) => {
	const scheduleRep = nodecg.Replicant('schedule', {defaultValue: []});
	const currentRunRep = nodecg.Replicant('currentRun', {defaultValue: null});

	const setCurrentRun = (index: number) => {
		if (!scheduleRep.value) {
			return;
		}
		const newCurrentRun = scheduleRep.value[index];
		if (newCurrentRun) {
			currentRunRep.value = _.clone(newCurrentRun);
		}
	};

	nodecg.listenFor('previousRun', () => {
		if (currentRunRep.value) {
			setCurrentRun(currentRunRep.value.index - 1);
		} else {
			setCurrentRun(0);
		}
	});
	nodecg.listenFor('nextRun', () => {
		if (currentRunRep.value) {
			setCurrentRun(currentRunRep.value.index + 1);
		} else {
			setCurrentRun(0);
		}
	});
};
