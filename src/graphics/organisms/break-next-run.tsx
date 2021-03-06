import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import moment from 'moment';

import {boxBackground, textStyle} from '../styles';
import {FunctionComponentWithClassName} from '../../types/react';
import gameImageFrame from '../assets/game-image-frame.png';
import FitText from '../../shared/atoms/fit-text';
import {useReplicant} from '../../use-nodecg/use-replicant';
import {formatTime} from '../../shared/format-time';

const Container = styled.div`
	${boxBackground};
	width: 710px;
	height: 230px;
	display: grid;
	grid-template-columns: 375px 330px;
	justify-content: start;
`;

const GameImageFrame = styled.div`
	grid-column: 2 / 3;
	grid-row: 1 / 2;
	align-self: center;
	background: url(${gameImageFrame}) no-repeat;
	padding: 5px;
	height: 190px;

	& > img {
		width: 100%;
		height: 100%;
	}
`;

const Divider = styled.div`
	background-color: #fff;
	margin: 0 5px;
`;

const Content = styled.div`
	grid-column: 1 / 2;
	grid-row: 1 / 2;
	display: grid;
	grid-template-rows: 1fr 1px 2fr 1px 1fr 1px 1fr 1px 1fr;
`;

const InfoRow = styled(FitText)`
	${textStyle}
	margin: 0 5px;
`;

const MiscText = styled(InfoRow)`
	font-size: 21px;
	text-shadow: 2px 2px 1px black;
`;

const TitleContainer = styled.div`
	${textStyle}
	margin: 5px;
	display: grid;
	grid-auto-flow: row;
	justify-content: center;
`;
const TitleText = styled(FitText)`
	font-size: 29px;
	text-shadow: 3px 3px 1px black;
`;
const Title: FunctionComponentWithClassName<{children: string}> = (props) => {
	const NEW_LINE_TOKEN = '<br>';
	return (
		<TitleContainer className={props.className}>
			{props.children
				.split(NEW_LINE_TOKEN)
				.slice(0, 2)
				.map((chunk, index) => (
					<TitleText key={`${chunk}${index}`}>{chunk}</TitleText>
				))}
		</TitleContainer>
	);
};

const currentRunIndexRep = nodecg.Replicant('currentRunIndex');
const scheduleRep = nodecg.Replicant('schedule');
const BreakNextRun: FunctionComponentWithClassName = (props) => {
	const [currentRunIndex] = useReplicant(currentRunIndexRep);
	const [schedule] = useReplicant(scheduleRep);
	const [startsIn, setStartsIn] = useState('0:00:00');
	useEffect(() => {
		if (
			typeof currentRunIndex !== 'number' ||
			!schedule ||
			!schedule[currentRunIndex]
		) {
			return;
		}
		const interval = setInterval(() => {
			const diff = moment(schedule[currentRunIndex].startTime).diff(
				moment(),
			);
			if (diff > 0) {
				setStartsIn(`開始まで ${formatTime(diff / 1000)}`);
			} else {
				setStartsIn('このあとすぐ');
			}
		}, 100);
		return () => {
			clearInterval(interval);
		};
	}, [currentRunIndex, schedule]);
	if (
		typeof currentRunIndex !== 'number' ||
		!schedule ||
		!schedule[currentRunIndex]
	) {
		return null;
	}
	const currentRun = schedule[currentRunIndex];
	return (
		<Container className={props.className}>
			<Content>
				<MiscText>{startsIn}</MiscText>
				<Divider />
				<Title>{currentRun.game}</Title>
				<Divider />
				<MiscText>{currentRun.category}</MiscText>
				<Divider />
				<MiscText>
					{currentRun.runners.map((runner) => runner.name).join(', ')}
				</MiscText>
				<Divider />
				<MiscText>{formatTime(currentRun.estimate)}</MiscText>
			</Content>
			<GameImageFrame>
				{currentRun.imageUrl && <img src={currentRun.imageUrl} />}
			</GameImageFrame>
		</Container>
	);
};

export default BreakNextRun;
