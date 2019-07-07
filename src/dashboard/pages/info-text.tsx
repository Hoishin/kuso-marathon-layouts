import 'modern-normalize/modern-normalize.css';
import React, {useState} from 'react';
import styled, { css } from 'styled-components';
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
	${(props: {disabled: boolean}) =>
		props.disabled
			? null
			: css`
					cursor: pointer;
			  `}
`;

const InfoText: React.FunctionComponent = () => {
	const [text, setText] = useState('');
	return (
		<Container>
			<TextArea
				value={text}
				onChange={(e) => {
					setText(e.target.value);
				}}
			/>
				<Submit
					onClick={() => {
						nodecg.sendMessage('showInfo', {text});
					}}
					disabled={!text}
				>
					表示
				</Submit>
		</Container>
	);
};

render(<InfoText />);
