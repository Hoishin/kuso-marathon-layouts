import React from 'react';
import styled from 'styled-components';
import {FunctionComponentWithClassName} from '../../../types/react';
import runnerIcon from '../../assets/controller.png';
import commentatorIcon from '../../assets/mic.png';

export type ParticipantType = 'runner' | 'commentator';

const IconImg = styled.img`
	filter: drop-shadow(2px 2px 1px black);
`;

const ParticipantIcon: FunctionComponentWithClassName<{
	type: ParticipantType;
}> = (props) => {
	return (
		<IconImg
			src={props.type === 'runner' ? runnerIcon : commentatorIcon}
			className={props.className}
		/>
	);
};

export default ParticipantIcon;
