import React from 'react';
import styled from 'styled-components';
import {FunctionComponentWithClassName} from '../../types/react';
import {boxBackground} from '../styles';
import HorizontalParticipant from '../molecules/horizontal-participant';
import VerticalParticipant from '../molecules/vertical-participant';
import {useCurrentRun} from '../../shared/use-current-run';

const Container = styled.div`
	display: grid;
	grid-template-rows: 1fr 1px 1fr;
	padding: 0 5px;
	${boxBackground}
`;

const Divider = styled.div`
	background-color: white;
`;

const ParticipantsArea: FunctionComponentWithClassName<{
	vertical?: boolean;
	index?: number;
}> = (props) => {
	const Participant = props.vertical
		? VerticalParticipant
		: HorizontalParticipant;
	const currentRun = useCurrentRun();
	return (
		<Container className={props.className}>
			{currentRun && (
				<>
					<Participant
						type='runner'
						participant={currentRun.runners[props.index || 0]}
					/>
					<Divider />
					<Participant
						type='commentator'
						participant={currentRun.commentators[0]}
					/>
				</>
			)}
		</Container>
	);
};

export default ParticipantsArea;
