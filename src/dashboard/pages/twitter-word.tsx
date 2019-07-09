import 'modern-normalize/modern-normalize.css';
import React, {useState} from 'react';
import styled from 'styled-components';
import {useReplicant} from '../../use-nodecg/use-replicant';
import {render} from '../render';

const trackWordsRep = nodecg.Replicant('tweetTrackWords');
const Container = styled.div`
	padding: 8px;
	width: 100%;
	display: grid;
	grid-auto-flow: row;
	gap: 8px;
`;
const TwitterWord: React.FunctionComponent = () => {
	const [trackWords, setTrackWords] = useReplicant(trackWordsRep);
	const [input, setInput] = useState('');
	if (!trackWords) {
		return null;
	}

	return (
		<Container>
			<input
				type='text'
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
			/>
			<button
				onClick={() => {
					setTrackWords([...trackWords, input]);
					setInput('');
				}}
			>
				登録
			</button>
			<ul>
				{trackWords.map((word) => (
					<li>
						<span>{word}</span>&nbsp;
						<span
							style={{cursor: 'pointer'}}
							onClick={() => {
								setTrackWords(
									trackWords.filter((w) => w !== word),
								);
							}}
						>
							×
						</span>
					</li>
				))}
			</ul>
		</Container>
	);
};

render(<TwitterWord />);
