import React from 'react';
import styled from 'styled-components';
import {FunctionComponentWithClassName} from '../../../shared/react';
import FitText from '../atoms/fit-text';
import {textStyle, absoluteCenterContent} from '../../styles';
import SocialIcon from '../atoms/social-icon';
import ParticipantIcon, {ParticipantType} from '../atoms/participant-icon';

const Container = styled.div`
	display: grid;
	grid-auto-flow: row;
	grid-template-rows: 1fr auto auto;
	padding: 5px 0;
`;

const Icon = styled(ParticipantIcon)`
	justify-self: start;
	align-self: start;
`;

const Name = styled(FitText)`
	${textStyle}
	${absoluteCenterContent};
	font-size: 25px;
	text-shadow: 2px 2px 1px black;
`;

const Social = styled.div`
	${absoluteCenterContent};
	grid-auto-flow: column;
	align-items: center;
`;

const StyledSocialIcon = styled(SocialIcon)`
	margin-right: 2px;
`;

const SocialText = styled(FitText)`
	${textStyle}
	font-size: 16.6px;
	text-shadow: 2px 2px 1px black;
`;

const VerticalParticipant: FunctionComponentWithClassName<{
	type: ParticipantType;
}> = (props) => {
	return (
		<Container className={props.className}>
			<Icon type={props.type} />
			<Name>{'w'.repeat(Math.random() * 20)}</Name>
			<Social>
				<StyledSocialIcon media='twitter' />
				<SocialText>{'w'.repeat(Math.random() * 20)}</SocialText>
			</Social>
		</Container>
	);
};

export default VerticalParticipant;
