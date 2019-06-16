import {NodeCG} from './types/server';
import {setupTweets} from './tweets';

export = (nodecg: NodeCG) => {
	setupTweets(nodecg);
};
