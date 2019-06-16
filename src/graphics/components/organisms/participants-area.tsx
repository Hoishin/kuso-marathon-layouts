import React from 'react';
import styled from 'styled-components';
import {FunctionComponentWithClassName} from '../../../shared/react';
import {boxBackground} from '../../styles';
import HorizontalParticipant from '../molecules/horizontal-participant';
import VerticalParticipant from '../molecules/vertical-participant';

const Container = styled.div`
	display: grid;
	grid-template-rows: 1fr 1px 1fr;
	padding: 0 5px;
	${boxBackground}
`;

const Divider = styled.div`
	background-color: white;
`;

const ParticipantsArea: FunctionComponentWithClassName<{vertical?: boolean}> = (
	props,
) => {
	const Participant = props.vertical
		? VerticalParticipant
		: HorizontalParticipant;
	return (
		<Container className={props.className}>
			<Participant type='runner' />
			<Divider />
			<Participant type='commentator' />
		</Container>
	);
};

export default ParticipantsArea;
