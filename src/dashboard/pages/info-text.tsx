import 'modern-normalize/modern-normalize.css';
import React from 'react';
import styled from 'styled-components';
import {render} from '../render';

const Container = styled.div`
	padding: 8px;
	width: 100%;
	display: grid;
	grid-template-rows: 5em auto;
	gap: 8px;
`;
const TextArea = styled.textarea`
	resize: none;
`;
const Submit = styled.button`
	justify-self: end;
	padding: 2px;
	cursor: pointer;
`;

render(
	<Container>
		<TextArea />
		<Submit>表示</Submit>
	</Container>,
);
