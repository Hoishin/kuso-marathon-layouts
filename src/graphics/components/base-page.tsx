import React from 'react';
import styled from 'styled-components';
import {FunctionComponentWithClassName} from '../../types/react';

const Container = styled.div`
	position: absolute;
	width: 1280px;
	height: 720px;
	overflow: hidden;

	background: url(${(props: {frameImg: string}) => props.frameImg}),
		linear-gradient(
			to bottom,
			hsla(265, 52%, 27%, 1) 33%,
			hsla(264, 62%, 15%, 1) 66%
		);
`;

const BasePage: FunctionComponentWithClassName<{frameImg: string}> = (
	props,
) => {
	return (
		<Container frameImg={props.frameImg} className={props.className}>
			{props.children}
		</Container>
	);
};

export default BasePage;
