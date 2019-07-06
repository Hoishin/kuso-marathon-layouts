import 'modern-normalize/modern-normalize.css';
import React from 'react';
import styled from 'styled-components';
import {render} from '../render';
import editIcon from '../assets/edit.svg';
import pauseIcon from '../assets/pause.svg';
import playIcon from '../assets/play.svg';
import stopIcon from '../assets/stop.svg';

const Container = styled.div`
	padding: 8px;
	display: grid;
	grid-template-columns: 50% 1fr 1fr;
	grid-template-rows: 48px 48px;
	gap: 8px;
`;

const TimeDisplay = styled.div`
	font-size: 48px;
	font-weight: bold;
	grid-row: 1 / 3;
	grid-column: 1 / 2;
	justify-self: center;
	align-self: center;
`;

const TimerButton = styled.button`
	width: 100%;
	height: 100%;
	cursor: pointer;
	display: inline-block;

	& > * {
		vertical-align: middle;
	}
`;

const StartButton = styled(TimerButton)`
	grid-row: 1 / 2;
	grid-column: 2 / 3;
`;

const PauseButton = styled(TimerButton)`
	grid-row: 1 / 2;
	grid-column: 3 / 4;
`;

const ResetButton = styled(TimerButton)`
	grid-row: 2 / 3;
	grid-column: 2 / 3;
`;

const EditButton = styled(TimerButton)`
	grid-row: 2 / 3;
	grid-column: 3 / 4;
`;

render(
	<Container>
		<TimeDisplay>12:35</TimeDisplay>
		<StartButton>
			<img src={playIcon} />
			<span>開始</span>
		</StartButton>
		<PauseButton>
			<img src={pauseIcon} />
			<span>停止</span>
		</PauseButton>
		<ResetButton>
			<img src={stopIcon} />
			<span>リセット</span>
		</ResetButton>
		<EditButton>
			<img src={editIcon} />
			<span>編集</span>
		</EditButton>
	</Container>,
);
