import {useState, useRef, useEffect} from 'react';
import {TweenLite, TimelineMax} from 'gsap';
import {Participant} from '../../../extension/types/nodecg';

export const useSocialLoop = (participant: Participant | undefined) => {
	const [social, setSocial] = useState<'twitter' | 'twitch' | 'nico'>();
	const [socialInfo, setSocialInfo] = useState('');
	const socialRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!participant) {
			return;
		}
		const socialEl = socialRef.current;
		if (!socialEl) {
			return;
		}
		TweenLite.to(socialEl, 0.5, {opacity: 0});
		const tl = new TimelineMax({repeat: -1});
		const {twitter, twitch, nico} = participant;
		if (twitter) {
			tl.call(() => {
				setSocial('twitter');
				setSocialInfo(twitter);
			});
			tl.to(socialEl, 0.5, {opacity: 1});
			tl.to(socialEl, 0.5, {opacity: 0}, '+=15');
		}
		if (twitch) {
			tl.call(() => {
				setSocial('twitch');
				setSocialInfo(twitch);
			});
			tl.to(socialEl, 0.5, {opacity: 1});
			tl.to(socialEl, 0.5, {opacity: 0}, '+=15');
		}
		if (nico) {
			tl.call(() => {
				setSocial('nico');
				setSocialInfo(nico);
			});
			tl.to(socialEl, 0.5, {opacity: 1});
			tl.to(socialEl, 0.5, {opacity: 0}, '+=15');
		}
		return () => {
			tl.kill();
		};
	}, [participant]);

	return {type: social, text: socialInfo, ref: socialRef};
};
