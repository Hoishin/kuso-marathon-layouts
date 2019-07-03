import 'modern-normalize/modern-normalize.css';
import React from 'react';
import styled from 'styled-components';
import {render} from '../render';
import InfoBlock from '../molecules/info-block';

const PRIMARY_COLOR = '#2f3a4f';
// const SECONDARY_COLOR = '#00bebe';

const Container = styled.div`
	padding: 8px;
	width: 100%;
	display: grid;
	grid-template-rows: 64px auto;
	gap: 16px;
`;

const Control = styled.div`
	display: grid;
	grid-template-columns: 25% 1fr 25%;
	gap: 8px;
`;

const Button = styled.button`
	width: 100%;
	height: 100%;
	cursor: pointer;
	background-color: ${PRIMARY_COLOR};
	color: white;
	font-weight: bold;
`;

const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr 2px 1fr;
	gap: 8px;
`;

const ContentItem = styled.div`
	display: flex;
	flex-flow: column nowrap;
	& > * {
		&:not(:first-child) {
			padding-top: 12px;
		}
		&:not(:last-child) {
			padding-bottom: 12px;
			border-bottom: 1px dotted black;
		}
	}
`;

const Divider = styled.div`
	background-color: black;
`;

const RunnerGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 8px;
`;
const MiscGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
`;
const ContentTitle = styled.div`
	text-align: center;
	font-size: 20px;
	font-weight: bold;
`;

const Run = (
	<ContentItem>
		<ContentTitle>現在のゲーム (#12)</ContentTitle>
		<InfoBlock
			label='ゲーム'
			content={'くまのプーさんのホームランダービー'.repeat(10)}
		/>
		<MiscGrid>
			<InfoBlock label='カテゴリ' content='Any%' />
			<InfoBlock label='機種' content='Mega Drive' />
		</MiscGrid>
		<RunnerGrid>
			{Array.from({length: 4}).map((_, i) => (
				<InfoBlock
					key={i}
					label={`走者${i + 1}`}
					content={'ほげほげ'.repeat(Math.random() * 3 + 1)}
				/>
			))}
		</RunnerGrid>
		<MiscGrid>
			<InfoBlock label='解説' content='ふがふが' />
			<InfoBlock label='予定タイム' content='1:23:46' />
		</MiscGrid>
	</ContentItem>
);

render(
	<Container>
		<Control>
			<Button>←前</Button>
			<div />
			<Button>次→</Button>
		</Control>
		<Content>
			{Run}
			<Divider />
			{Run}
		</Content>
	</Container>,
);
