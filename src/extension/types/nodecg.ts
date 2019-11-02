export interface Participant {
	name: string;
	twitch?: string;
	twitter?: string;
	nico?: string;
}

export interface Run {
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
	imageUrl: string | null;
}

export interface Tweet {
	id: string;
	user: {
		icon: string;
		name: string;
		screenName: string;
	};
	content: string;
}

export interface Info {
	content: string;
	enabled: boolean;
}

export enum TimerState {
	Stopped = 'stopped',
	Running = 'running',
	Finished = 'finished',
}
export interface Timer {
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
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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
	'assets:sponsorLogo': {
		base: string;
		bundleName: string;
		category: string;
		ext: string;
		name: string;
		sum: string;
		url: string;
	}[];
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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
	editTime: {data: {index: number | 'master'; time: number}};
	updateSchedule: {};
	previousRun: {};
	nextRun: {};
};
