import React from 'react';
import styled from 'styled-components';
import {FunctionComponentWithClassName} from '../../types/react';
import {boxBackground, textStyle, absoluteCenterContent} from '../styles';
import FitText from '../../shared/atoms/fit-text';

const Container = styled.div`
	${boxBackground};
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 66% 1px 1fr;
	gap: 5px;
	padding: 5px 5px;
`;

const GameTitle = styled(FitText)`
	${textStyle};
	${absoluteCenterContent};
	font-size: 29px;
	text-shadow: 4px 4px 1px black;
	white-space: nowrap;
	overflow: hidden;
`;

const RunCategory = styled(FitText)`
	${textStyle};
	${absoluteCenterContent};
	font-size: 21px;
	text-shadow: 3px 3px 1px black;
	white-space: nowrap;
	overflow: hidden;
`;

const Divider = styled.div`
	background: white;
`;

const HorizontalGameArea: FunctionComponentWithClassName = (props) => {
	return (
		<Container className={props.className}>
			<GameTitle>ドン・キホーテwwwwwwwwwwwwwwwww</GameTitle>
			<Divider />
			<RunCategory>wwwwwww100%wwwwwwwwwwwwwwwwwwwwww</RunCategory>
		</Container>
	);
};

export default HorizontalGameArea;
