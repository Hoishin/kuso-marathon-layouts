import React from 'react';
import styled from 'styled-components';
import {boxBackground, textStyle} from '../styles';
import FitText from '../../shared/atoms/fit-text';
import {FunctionComponentWithClassName} from '../../types/react';
import {useReplicant} from '../../use-nodecg/use-replicant';

const Container = styled.div`
	position: absolute;
	${boxBackground}
	width: 530px;
	height: 60px;
	display: grid;
	grid-template-rows: 1fr 1px 1fr;
	grid-template-columns: 1fr 1px 1fr;
`;

const Title = styled(FitText)`
	${textStyle}
	grid-column: 1 / 4;
	grid-row: 1 / 2;
	font-size: 21px;
	text-shadow: 2px 2px 1px black;
	margin: 0 5px;
`;

const Misc = styled(FitText)`
	${textStyle}
	font-size: 16.667px;
	text-shadow: 3px 3px 1px black;
	margin: 0 5px;
`;

const Category = styled(Misc)`
	grid-column: 1 / 2;
	grid-row: 3 / 4;
`;

const Runner = styled(Misc)`
	grid-column: 3 / 4;
	grid-row: 3 / 4;
`;

const HorizontalDivider = styled.div`
	background-color: #fff;
	margin: 0 5px;
	grid-column: 1 / 4;
	grid-row: 2 / 3;
`;

const VerticalDivider = styled.div`
	background-color: #fff;
	margin: 5px 0;
	grid-column: 2 / 3;
	grid-row: 3 / 4;
`;

const currentRunIndexRep = nodecg.Replicant('currentRunIndex');
const scheduleRep = nodecg.Replicant('schedule');
const RunInfoBreak: FunctionComponentWithClassName<{
	indexFn: (n: number) => number;
}> = (props) => {
	const [currentRunIndex] = useReplicant(currentRunIndexRep);
	const [schedule] = useReplicant(scheduleRep);
	if (typeof currentRunIndex !== 'number' || !schedule) {
		return null;
	}
	const targetRun = schedule[props.indexFn(currentRunIndex)];
	return (
		<Container className={props.className}>
			<Title>{targetRun && targetRun.game}</Title>
			<Category>{targetRun && targetRun.category}</Category>
			<Runner>
				{targetRun &&
					targetRun.runners.map((runner) => runner.name).join(', ')}
			</Runner>
			<HorizontalDivider />
			<VerticalDivider />
		</Container>
	);
};

export default RunInfoBreak;
