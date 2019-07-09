import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {TimelineMax, TweenLite, TimelineLite, Power2, Linear} from 'gsap';
import _ from 'lodash';
import {textStyle, absoluteCenterContent, boxBackground} from '../styles';
import {FunctionComponentWithClassName} from '../../types/react';
import FitText from '../../shared/atoms/fit-text';
import {Tweet} from '../../extension/types/nodecg';
import {useReplicant} from '../../use-nodecg/use-replicant';
import twitterIcon from '../assets/social-icons/twitter.png';

const Container = styled.div`
	font-size: 16.667px;
	${textStyle}
	text-shadow: 2px 2px 1px black;
	${absoluteCenterContent}
	padding: 0 8px;
	${boxBackground}
	transition: opacity 0.66s;
	display: grid;
	justify-content: start;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr;
	overflow: hidden;
`;

const InfoText = styled(FitText)`
	grid-column: 1 / 2;
	grid-row: 1 / 2;
`;
const TweetArea = styled.div`
	grid-column: 1 / 2;
	grid-row: 1 / 2;
	opacity: 0;
	display: grid;
	grid-template-columns: auto auto 1fr;
	align-content: center;
	align-items: center;
	justify-items: start;
	gap: 4px;
	& > img {
		height: 48px;
		width: 48px;
	}
	& > div {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;
		width: 100%;
		& > div {
			white-space: nowrap;
			will-change: transform;
		}
	}
`;

const infoRep = nodecg.Replicant('info');
const InfoArea: FunctionComponentWithClassName = (props) => {
	const textRef = useRef<HTMLDivElement>(null);
	const tweetRef = useRef<HTMLDivElement>(null);
	const tweetTextRef = useRef<HTMLDivElement>(null);
	const tweetTextContainerRef = useRef<HTMLDivElement>(null);
	const [showingInfo, setShowingInfo] = useState('');
	const [showingTweet, setShowingTweet] = useState<Tweet | null>(null);
	const [infoValue] = useReplicant(infoRep);
	const [timeline, setTimeline] = useState<TimelineLite | null>(null);

	useEffect(() => {
		const showTweetHandler = (data: Tweet) => {
			const tweetEl = tweetRef.current;
			const container = tweetTextContainerRef.current;
			const text = tweetTextRef.current;
			if (!tweetEl || !container || !text) {
				return;
			}
			if (timeline) {
				timeline.clear();
				timeline.kill();
			}
			const tl = new TimelineLite();
			setTimeline(tl);
			tl.to(tweetEl, 0.5, {opacity: 0});
			tl.set(text, {x: 0});
			tl.set(tweetEl, {x: 720});
			tl.call(() => {
				setShowingTweet(data);
			});
			tl.set(tweetEl, {opacity: 1}, '+=0.5');
			tl.to(tweetEl, 0.5, {x: 0, ease: Power2.easeOut});
			tl.add(() => {
				const maxWidth = container.clientWidth;
				const currentWidth = text.clientWidth;
				if (maxWidth >= currentWidth) {
					tl.to(tweetEl, 0.5, {opacity: 0}, '+=15');
				} else {
					const pixelsToScroll = currentWidth - maxWidth;
					tl.to(
						text,
						pixelsToScroll * 0.01,
						{x: -1 * pixelsToScroll, ease: Linear.easeNone},
						'+=10',
					);
					tl.to(tweetEl, 0.5, {opacity: 0}, `+=5`);
				}
				tl.call(() => {
					setShowingTweet(null);
				});
			});
		};
		nodecg.listenFor('showTweet', showTweetHandler);
		return () => {
			// @ts-ignore
			nodecg.unlisten('showTweet', showTweetHandler);
		};
	}, [timeline]);

	useEffect(() => {
		if (!infoValue) {
			return;
		}
		const textEl = textRef.current;
		if (!textEl) {
			return;
		}
		TweenLite.to(textEl, 0.5, {opacity: 0});
		if (showingTweet) {
			return;
		}
		const tl = new TimelineMax({repeat: -1, delay: 0.5});
		for (const info of infoValue.filter((i) => i.enabled)) {
			tl.call(() => {
				setShowingInfo(info.content);
			});
			tl.to(textEl, 0.5, {opacity: 1});
			tl.to(textEl, 0.5, {opacity: 0}, `+=15`);
		}
		return () => {
			tl.kill();
		};
	}, [infoValue, showingTweet]);

	return (
		<Container className={props.className}>
			<InfoText ref={textRef}>{showingInfo}</InfoText>
			<TweetArea ref={tweetRef}>
				<img src={twitterIcon} />
				<div>{showingTweet && `@${showingTweet.user.screenName}:`}</div>
				<div ref={tweetTextContainerRef}>
					<div ref={tweetTextRef}>
						{showingTweet && showingTweet.content}{' '}
					</div>
				</div>
			</TweetArea>
		</Container>
	);
};

export default InfoArea;
