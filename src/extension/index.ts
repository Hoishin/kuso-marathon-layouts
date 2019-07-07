import {NodeCG} from './types/server';
import {setupTweets} from './tweets';
import {setupTimer} from './timer';
import { setupRuns } from './runs';
import { setupSchedule } from './schedule';

export = (nodecg: NodeCG) => {
	setupTweets(nodecg);
	setupTimer(nodecg);
	setupSchedule(nodecg)
	setupRuns(nodecg)
};
