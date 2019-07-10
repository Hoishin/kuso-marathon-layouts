import {NodeCG} from './types/server';
import {setupTweets} from './tweets';
import {setupTimer} from './timer';
import {setupRuns} from './runs';
import {setupSchedule} from './schedule';

module.exports = (nodecg: NodeCG) => {
	setupTweets(nodecg);
	setupTimer(nodecg);
	setupSchedule(nodecg);
	setupRuns(nodecg);
};
