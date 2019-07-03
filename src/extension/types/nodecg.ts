export type Participant = {
	name: string;
	twitch?: string;
	twitter?: string;
	nico?: string;
};

export type Run = {
	game: string;
	category: string;
	runners: Participant[];
	commentators: Participant[];
	/**
	 * In milliseconds
	 */
	estimateDuration: number;
	/**
	 * Short description from horaro
	 */
	description: string;
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

export type ReplicantMap = {
	schedule: Run[];
	currentRun?: Run;
	nextRun?: Run;
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
};
