import * as moment from 'moment';

export const formatTime = (time: number) => {
	const duration = moment.duration(time, 'seconds');
	return [
		Math.floor(duration.asHours()),
		String(duration.minutes()).padStart(2, '0'),
		String(duration.seconds()).padStart(2, '0'),
	].join(':');
};
