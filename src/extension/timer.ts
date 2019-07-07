import {clearInterval, setInterval} from 'timers';
import {NodeCG} from './types/server';
import {TimerState} from './types/nodecg';

const TRY_TICK_INTERVAL = 100;

export const setupTimer = (nodecg: NodeCG) => {
	const _timerRep = nodecg.Replicant('timer', {
		defaultValue: {
			time: 0,
			state: TimerState.Stopped,
			results: [],
			lastTickTime: Date.now(),
		},
	});

	const timerRep: typeof _timerRep & {
		value: NonNullable<typeof _timerRep['value']>;
	} = _timerRep as any;
	const currentRunRep = nodecg.Replicant('currentRun');

	let tickInterval: NodeJS.Timer;
	let lastIncrement: number;

	const tryTick = () => {
		const now = Date.now();
		if (now - lastIncrement > 1000) {
			lastIncrement += 1000;
			timerRep.value.time += 1;
			timerRep.value.lastTickTime = now;
		}
	};

	const start = (force = false) => {
		if (!force && timerRep.value.state === TimerState.Running) {
			return;
		}
		clearInterval(tickInterval);
		timerRep.value.state = TimerState.Running;
		lastIncrement = Date.now();
		tickInterval = setInterval(tryTick, TRY_TICK_INTERVAL);
	};

	const stop = () => {
		clearInterval(tickInterval);
		timerRep.value.state = TimerState.Stopped;
	};

	const reduceResultState = () => {
		const allRunnerFinished =
			currentRunRep.value &&
			currentRunRep.value.runners.every((_, i) => {
				const result = timerRep.value.results[i];
				return result ? result.state === TimerState.Finished : false;
			});
		if (allRunnerFinished) {
			stop();
			timerRep.value.state = TimerState.Finished;
		}
	};

	if (timerRep.value.state === TimerState.Running) {
		const missedSeconds = Math.round(
			(Date.now() - timerRep.value.lastTickTime) / 1000,
		);
		timerRep.value.time += missedSeconds;
		start(true);
	}

	nodecg.listenFor('startTimer', () => {
		start();
	});
	nodecg.listenFor('stopTimer', stop);
	nodecg.listenFor('resetTimer', () => {
		stop();
		timerRep.value.time = 0;
		timerRep.value.results = [];
	});
	nodecg.listenFor('completeRunner', ({index}) => {
		if (!timerRep.value.results[index]) {
			timerRep.value.results[index] = {
				time: timerRep.value.time,
				state: TimerState.Finished,
			};
		}
		reduceResultState();
	});
	nodecg.listenFor('resumeRunner', ({index}) => {
		timerRep.value.results[index] = null;
		reduceResultState();
		if (timerRep.value.state !== TimerState.Finished) {
			return;
		}
		const missedSeconds = Math.round(
			(Date.now() - timerRep.value.lastTickTime) / 1000,
		);
		timerRep.value.time += missedSeconds;
		start();
	});
	nodecg.listenFor('editTime', ({index, time}) => {
		if (index === 'master') {
			timerRep.value.time = time;
			return;
		}
		const result = timerRep.value.results[index];
		if (!result) {
			return;
		}
		result.time = time;
		reduceResultState();
		if (currentRunRep.value && currentRunRep.value.runners.length === 1) {
			timerRep.value.time = time;
		}
	});
};
