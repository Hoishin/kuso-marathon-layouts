import React from 'react';
import styled from 'styled-components';
import {textStyle, absoluteCenterContent, boxBackground} from '../styles';
import {FunctionComponentWithClassName} from '../../types/react';
import FitText from '../../shared/atoms/fit-text';

const Container = styled.div`
	font-size: 16.667px;
	${textStyle}
	text-shadow: 2px 2px 1px black;
	${absoluteCenterContent}
	padding: 0 8px;
	${boxBackground}
`;

const InfoArea: FunctionComponentWithClassName = (props) => {
	return (
		<Container className={props.className}>
			<FitText>{'w'.repeat(1000)}</FitText>
		</Container>
	);
};

export default InfoArea;
