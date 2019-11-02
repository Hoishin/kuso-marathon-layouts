import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import {TweenLite, TimelineMax} from 'gsap';

import eventLogo from '../assets/logo.png';
import {boxBackground} from '../styles';
import {FunctionComponentWithClassName} from '../../types/react';
import {useReplicant} from '../../use-nodecg/use-replicant';

const Container = styled.div`
	${boxBackground}

	display: grid;
	align-content: stretch;
	align-items: center;
	justify-content: stretch;
	justify-items: center;

	& > div {
		grid-row: 1 / 2;
		grid-column: 1 / 2;
		width: 100%;
		height: 100%;
		display: grid;
		align-content: stretch;
		align-items: center;
		justify-content: stretch;
		justify-items: center;
		opacity: 0;
		will-change: opacity;

		& > img {
			max-width: calc(100% - 16px);
			max-height: calc(100% - 16px);
		}
	}
`;

const sponsorAssetsRep = nodecg.Replicant('assets:sponsorLogo');
const LogoArea: FunctionComponentWithClassName = (props) => {
	const [sponsorAssets] = useReplicant(sponsorAssetsRep);
	const eventLogoRef = useRef(null);
	const sponsorRef = useRef(null);

	useEffect(() => {
		if (!sponsorAssets || sponsorAssets.length === 0) {
			return;
		}
		const eventLogoEl = eventLogoRef.current;
		const sponsorEl = sponsorRef.current;
		if (!eventLogoEl) {
			return;
		}
		TweenLite.to(eventLogoEl, 0.5, {opacity: 1});
		if (!sponsorEl) {
			return;
		}
		TweenLite.set(sponsorEl, {opacity: 0});
		const tl = new TimelineMax({repeat: -1});
		tl.to(eventLogoEl, 0.5, {opacity: 0}, '+=15');
		tl.to(sponsorEl, 0.5, {opacity: 1});
		tl.to(sponsorEl, 0.5, {opacity: 0}, '+=15');
		tl.to(eventLogoEl, 0.5, {opacity: 1});
		return () => {
			tl.kill();
			TweenLite.set(sponsorEl, {opacity: 0});
			TweenLite.to(eventLogoEl, 0.5, {opacity: 1});
		};
	}, [sponsorAssets]);

	return (
		<Container className={props.className}>
			<div ref={eventLogoRef}>
				<img src={eventLogo} />
			</div>
			{sponsorAssets && (
				<div ref={sponsorRef} style={{gridTemplateColumns: `repeat(${sponsorAssets.length}, 1fr)`}}>
					{sponsorAssets.map((asset) => (
						<img src={asset.url} key={asset.sum} />
					))}
				</div>
			)}
		</Container>
	);
};

export default LogoArea;
