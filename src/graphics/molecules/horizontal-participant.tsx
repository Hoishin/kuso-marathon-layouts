import React from 'react';
import styled from 'styled-components';
import {FunctionComponentWithClassName} from '../../types/react';
import FitText from '../../shared/atoms/fit-text';
import {textStyle, absoluteCenterContent} from '../styles';
import SocialIcon from '../atoms/social-icon';
import ParticipantIcon, {ParticipantType} from '../atoms/participant-icon';
import {Participant} from '../../extension/types/nodecg';
import {useSocialLoop} from './hooks/use-social-loop';

const INFO_ROW_GAP = 4;

const Container = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-template-columns:
		60px
		calc((100% - (60px + ${INFO_ROW_GAP * 2}px)) * 2 / 3) calc((
					100% - (60px + ${INFO_ROW_GAP * 2}px)
				) / 3);
	gap: ${INFO_ROW_GAP}px;
`;

const Icon = styled(ParticipantIcon)`
	justify-self: center;
	align-self: center;
`;

const Name = styled(FitText)`
	${textStyle}
	font-size: 25px;
	text-shadow: 2px 2px 1px black;
	${absoluteCenterContent}
`;

const Social = styled.div`
	justify-self: stretch;
	display: grid;
	grid-auto-flow: column;
	justify-content: end;
	align-items: center;
	opacity: 0;
`;

const StyledSocialIcon = styled(SocialIcon)`
	margin-right: 2px;
`;

const SocialText = styled(FitText)`
	${textStyle}
	font-size: 12.5px;
	text-shadow: 2px 2px 1px black;
`;

const HorizontalParticipant: FunctionComponentWithClassName<{
	type: ParticipantType;
	participant?: Participant;
}> = (props) => {
	const social = useSocialLoop(props.participant);
	return (
		<Container className={props.className}>
			<Icon type={props.type} />
			{props.participant && <Name>{props.participant.name}</Name>}
			<Social ref={social.ref}>
				{social.type && <StyledSocialIcon media={social.type} />}
				<SocialText>{social.text}</SocialText>
			</Social>
		</Container>
	);
};

export default HorizontalParticipant;
