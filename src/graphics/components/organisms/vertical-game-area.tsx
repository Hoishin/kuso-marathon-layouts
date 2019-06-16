import React from 'react';
import styled from 'styled-components';
import {FunctionComponentWithClassName} from '../../../shared/react';
import {absoluteCenterContent, textStyle, boxBackground} from '../../styles';
import FitText from '../atoms/fit-text';

const Container = styled.div`
	${boxBackground};
	display: grid;
	grid-auto-flow: row;
	grid-template-rows: 69% 31%;
	padding: 0 5px;
`;

const GameTitle = styled(FitText)`
	${textStyle};
	${absoluteCenterContent};
	font-size: 37.5px;
	text-shadow: 4px 4px 1px black;
	white-space: nowrap;
	overflow: hidden;
	border-bottom: 1px solid white;
`;

const RunCategory = styled(FitText)`
	${textStyle};
	${absoluteCenterContent};
	font-size: 21px;
	text-shadow: 3px 3px 1px black;
	white-space: nowrap;
	overflow: hidden;
`;

const VerticalGameArea: FunctionComponentWithClassName = (props) => {
	return (
		<Container className={props.className}>
			<GameTitle>ドン・キホーテwwwwwwwwwwwwwwwww</GameTitle>
			<RunCategory>wwwwwww100%wwwwwwwwwwwwwwwwwwwwww</RunCategory>
		</Container>
	);
};

export default VerticalGameArea;
