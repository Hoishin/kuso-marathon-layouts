import 'modern-normalize/modern-normalize.css';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {render} from '../render';
import {useReplicant} from '../../use-nodecg/use-replicant';
import TweetItem from '../organisms/tweet';

const nodecgWindow = window.parent.window;
const tweetsRep = nodecg.Replicant('tweets');

const calcTwitterHeight = () => {
	return nodecgWindow.document.body.clientHeight - 136 - 8;
};

const Container = styled.div`
	padding: 8px;
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	overflow-x: hidden;
	overflow-y: scroll;
	& > *:not(:first-child) {
		padding-top: 6px;
	}
	& > *:not(:last-child) {
		padding-bottom: 6px;
		border-bottom: 1px dotted black;
	}
`;

const Twitter: React.FunctionComponent = () => {
	const [tweets] = useReplicant(tweetsRep);
	const [height, setHeight] = useState(calcTwitterHeight());

	useEffect(() => {
		const setHeightToWindow = _.debounce(() => {
			setHeight(calcTwitterHeight());
		}, 100);
		setHeightToWindow();
		nodecgWindow.addEventListener('resize', setHeightToWindow);
	}, []);

	if (!tweets) {
		return null;
	}

	return (
		<Container style={{height: `${height}px`}}>
			{tweets.map((tweet) => (
				<TweetItem key={tweet.id} tweet={tweet} />
			))}
		</Container>
	);
};

render(<Twitter />);
