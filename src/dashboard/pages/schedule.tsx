import 'modern-normalize/modern-normalize.css';
import React from 'react';
import styled, {css} from 'styled-components';
import {render} from '../render';
import InfoBlock from '../molecules/info-block';
import {FunctionComponentWithClassName} from '../../types/react';
import {Run} from '../../extension/types/nodecg';
import {formatTime} from '../../shared/format-time';
import {useReplicant} from '../../use-nodecg/use-replicant';

const Container = styled.div`
	padding: 8px;
	width: 100%;
	display: grid;
	grid-template-rows: 64px auto;
	gap: 16px;
`;

const Control = styled.div`
	display: grid;
	grid-template-columns: 25% 1fr 25%;
	gap: 8px;
`;

const Button = styled.button`
	width: 100%;
	height: 100%;
	${(props: {disabled: boolean}) =>
		props.disabled
			? null
			: css`
					cursor: pointer;
			  `}
`;

const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr 2px 1fr;
	gap: 8px;
`;

const ContentItem = styled.div`
	display: flex;
	flex-flow: column nowrap;
	& > * {
		&:not(:first-child) {
			padding-top: 12px;
		}
		&:not(:last-child) {
			padding-bottom: 12px;
			border-bottom: 1px dotted black;
		}
	}
`;

const Divider = styled.div`
	background-color: black;
`;

const RunnerGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 8px;
`;
const MiscGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
`;
const ContentTitle = styled.div`
	text-align: center;
	font-size: 20px;
	font-weight: bold;
`;

const RunItem: FunctionComponentWithClassName<{title: string; run: Run}> = ({
	title,
	run,
}) => {
	return (
		<ContentItem>
			<ContentTitle>{`${title} (#${run.index + 1})`}</ContentTitle>
			<InfoBlock label='ゲーム' content={run.game} />
			<MiscGrid>
				<InfoBlock label='カテゴリ' content={run.category} />
				<InfoBlock label='機種' content={run.platform} />
			</MiscGrid>
			<RunnerGrid>
				{Array.from({length: 4}).map(
					(_, i) =>
						run.runners[i] && (
							<InfoBlock
								key={i}
								label={`走者${i + 1}`}
								content={run.runners[i].name}
							/>
						),
				)}
			</RunnerGrid>
			<MiscGrid>
				<InfoBlock
					label='解説'
					content={run.commentators.map((c) => c.name).join(', ')}
				/>
				<InfoBlock
					label='予定タイム'
					content={formatTime(run.estimate)}
				/>
			</MiscGrid>
		</ContentItem>
	);
};

const scheduleRep = nodecg.Replicant('schedule');
const currentRunRep = nodecg.Replicant('currentRunIndex');
const Schedule: React.FunctionComponent = () => {
	const [schedule] = useReplicant(scheduleRep);
	const [currentRunIndex] = useReplicant(currentRunRep);
	if (schedule === undefined || currentRunIndex === undefined) {
		return null;
	}
	const currentRun =
		currentRunIndex === null ? null : (
			<RunItem title='現在のゲーム' run={schedule[currentRunIndex]} />
		);
	const nextRun =
		currentRunIndex === null || !schedule[currentRunIndex + 1] ? null : (
			<RunItem title='次のゲーム' run={schedule[currentRunIndex + 1]} />
		);
	return (
		<Container>
			<Control>
				<Button
					onClick={() => {
						nodecg.sendMessage('previousRun');
					}}
					disabled={currentRunIndex === 0}
				>
					←前
				</Button>
				<div />
				<Button
					onClick={() => {
						nodecg.sendMessage('nextRun');
					}}
					disabled={currentRunIndex >= schedule.length - 1}
				>
					次→
				</Button>
			</Control>
			<Content>
				{currentRun}
				<Divider />
				{nextRun}
			</Content>
		</Container>
	);
};

render(<Schedule />);
