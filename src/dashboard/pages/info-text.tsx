import 'modern-normalize/modern-normalize.css';
import React, {useState} from 'react';
import styled, {css} from 'styled-components';

import {render} from '../render';
import {useReplicant} from '../../use-nodecg/use-replicant';

const Container = styled.div`
	padding: 8px;
	width: 100%;
	display: grid;
	grid-template-rows: 5em auto auto;
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

const ListContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;

	& > * {
		padding: 8px 4px;
		border-top: 1px dotted black;
		display: grid;
		grid-template-columns: 1fr auto auto;
		& > div {
			overflow: hidden;
			word-break: break-all;
		}
		& > button {
			align-self: center;
		}
	}
`;

const infoRep = nodecg.Replicant('info');
const InfoText: React.FunctionComponent = () => {
	const [text, setText] = useState('');
	const [info, setInfo] = useReplicant(infoRep);
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
					setInfo([...(info || []), {content: text, enabled: false}]);
					setText('');
				}}
				disabled={!text}
			>
				追加
			</Submit>
			{info && (
				<ListContainer>
					{info.map((infoItem, index) => {
						return (
							<div
								key={`${infoItem.content}${index}`}
								style={{
									backgroundColor: infoItem.enabled
										? '#90f798'
										: '#f79090',
								}}
							>
								<div>{infoItem.content}</div>
								<button
									onClick={() => {
										setInfo(
											info.map((_info, i) =>
												index === i
													? {
															content:
																_info.content,
															enabled: !_info.enabled,
													  }
													: _info,
											),
										);
									}}
								>
									{infoItem.enabled ? '表示中' : '無効中'}
								</button>
								<button
									onClick={() => {
										setInfo(
											info.filter((_, i) => i !== index),
										);
									}}
								>
									削除
								</button>
							</div>
						);
					})}
				</ListContainer>
			)}
		</Container>
	);
};

render(<InfoText />);
