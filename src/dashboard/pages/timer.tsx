import 'modern-normalize/modern-normalize.css';
import React from 'react';
import styled, {css} from 'styled-components';

import {render} from '../render';
import editIcon from '../assets/edit.svg';
import pauseIcon from '../assets/pause.svg';
import playIcon from '../assets/play.svg';
import stopIcon from '../assets/stop.svg';
import {useReplicant} from '../../use-nodecg/use-replicant';
import {TimerState} from '../../extension/types/nodecg';
import {formatTime} from '../../shared/format-time';

const timerRep = nodecg.Replicant('timer');

const Container = styled.div`
	padding: 8px;
	display: grid;
	grid-auto-flow: row;
`;

const Master = styled.div`
	display: grid;
	grid-template-columns: 50% 1fr 1fr;
	grid-template-rows: 48px 48px;
	gap: 8px;
	padding-bottom: 8px;
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
	${(props: {disabled?: boolean}) =>
		!props.disabled &&
		css`
			cursor: pointer;
		`}
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

const Runner = styled.div`
	display: grid;
	grid-template-columns: 1fr auto auto;
	gap: 4px;
	padding: 8px;
	height: 3em;
	${(props: {running: boolean}) =>
		props.running
			? css`
					background-color: #90f798;
			  `
			: css`
					background-color: #f79090;
			  `}
`;

const RunnerName = styled.div`
	font-size: 24px;
	align-self: center;
	justify-self: center;
`;

const RunnerButton = styled.button`
	${(props: {disabled?: boolean}) =>
		!props.disabled &&
		css`
			cursor: pointer;
		`}
`;

const colorByState = (state: TimerState) => {
	switch (state) {
		case TimerState.Running:
			return '#f5f790';
		case TimerState.Finished:
			return '#90f798';
		case TimerState.Stopped:
			return '#f79090';
	}
};

const scheduleRep = nodecg.Replicant('schedule');
const currRunIndexRep = nodecg.Replicant('currentRunIndex');
const Timer: React.FunctionComponent = () => {
	const [timer] = useReplicant(timerRep);
	const [schedule] = useReplicant(scheduleRep);
	const [currentRunIndex] = useReplicant(currRunIndexRep);

	if (!timer || !schedule || typeof currentRunIndex !== 'number') {
		return null;
	}

	const currentRun = schedule[currentRunIndex];

	const disableStart = timer.state !== TimerState.Stopped;
	const disablePause = timer.state !== TimerState.Running;

	return (
		<Container>
			<Master>
				<TimeDisplay>{formatTime(timer.time)}</TimeDisplay>
				<StartButton
					onClick={() => {
						nodecg.sendMessage('startTimer');
					}}
					disabled={disableStart}
				>
					<img src={playIcon} />
					<span>開始</span>
				</StartButton>
				<PauseButton
					onClick={() => {
						nodecg.sendMessage('stopTimer');
					}}
					disabled={disablePause}
				>
					<img src={pauseIcon} />
					<span>停止</span>
				</PauseButton>
				<ResetButton
					onClick={() => {
						nodecg.sendMessage('resetTimer');
					}}
				>
					<img src={stopIcon} />
					<span>リセット</span>
				</ResetButton>
				<EditButton disabled>
					<img src={editIcon} />
					<span>編集</span>
				</EditButton>
			</Master>
			{currentRun &&
				currentRun.runners.map((runner, index) => {
					const result = timer.results[index];
					const state = result ? result.state : timer.state;
					const time = formatTime(result ? result.time : timer.time);
					const action =
						state === TimerState.Running ||
						timer.state === TimerState.Stopped
							? 'completeRunner'
							: 'resumeRunner';
					const onClick = () => {
						nodecg.sendMessage(action, {index});
					};
					return (
						<Runner
							key={`${runner.name}${index}`}
							style={{
								backgroundColor: colorByState(state),
							}}
							running={state === TimerState.Running}
						>
							<RunnerName>
								{`${runner.name} (${time})`}
							</RunnerName>
							<RunnerButton onClick={onClick}>
								{action === 'completeRunner' ? '完走' : '再開'}
							</RunnerButton>
						</Runner>
					);
				})}
		</Container>
	);
};

render(<Timer />);
