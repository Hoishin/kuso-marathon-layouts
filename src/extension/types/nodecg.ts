export type Participant = {
	name: string;
	twitch?: string;
	twitter?: string;
	nico?: string;
};

export type Run = {
	index: number;
	game: string;
	category: string;
	runners: Participant[];
	commentators: Participant[];
	/**
	 * In seconds
	 */
	estimate: number;
	startTime: number;
	platform: string;
};

export type Tweet = {
	id: string;
	user: {
		icon: string;
		name: string;
		screenName: string;
	};
	content: string;
};

export type Info = {
	content: string;
	enabled: boolean;
};

export enum TimerState {
	Stopped = 'stopped',
	Running = 'running',
	Finished = 'finished',
}
export type Timer = {
	/**
	 * in second
	 */
	time: number;
	/**
	 * in millisecond
	 */
	lastTickTime: number;
	state: TimerState;
	results: ({time: number; state: TimerState} | null)[];
};

export type ReplicantMap = {
	schedule: Run[];
	currentRunIndex: number;
	tweets: Tweet[];
	info: Info[];
	tweetTrackWords: string[];
	tweetStreamStatus: {
		connection:
			| 'connecting'
			| 'connected'
			| 'disconnecting'
			| 'disconnected';
		error: boolean;
	};
	timer: Timer;
};

export type MessageMap = {
	showTweet: {
		data: Tweet;
	};
	deleteTweet: {
		data: {id: string};
	};
	startTimer: {};
	stopTimer: {};
	resetTimer: {};
	completeRunner: {data: {index: number}};
	resumeRunner: {data: {index: number}};
	editTime: {data: {index: number | 'master', time: number}};
	updateSchedule: {};
	previousRun: {},
	nextRun: {},
};
