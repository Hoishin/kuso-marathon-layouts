import React from 'react';
import styled from 'styled-components';

import {FunctionComponentWithClassName} from '../../types/react';
import {textStyle, absoluteCenterContent, boxBackground} from '../styles';
import FitText from '../../shared/atoms/fit-text';
import {useReplicant} from '../../use-nodecg/use-replicant';
import {formatTime} from '../../shared/format-time';
import {useCurrentRun} from '../../shared/use-current-run';

const timerRep = nodecg.Replicant('timer');

const Container = styled.div`
	display: grid;
	grid-template-rows: 68% 1fr;
	padding: 0 5px;
	${boxBackground}
`;

const CurrentTime = styled(FitText)`
	font-size: 50px;
	${textStyle}
	text-shadow: 4px 4px 1px black;
	border-bottom: 1px solid white;
	${absoluteCenterContent}
`;

const Estimate = styled(FitText)`
	font-size: 21px;
	${textStyle}
	text-shadow: 2px 2px 1px black;
	${absoluteCenterContent}
`;

const Timer: FunctionComponentWithClassName = (props) => {
	const [timer] = useReplicant(timerRep);
	const currentRun = useCurrentRun();
	return (
		<Container className={props.className}>
			<CurrentTime>{timer ? formatTime(timer.time) : '???'}</CurrentTime>
			<Estimate>
				{currentRun ? formatTime(currentRun.estimate) : '???'}
			</Estimate>
		</Container>
	);
};

export default Timer;
