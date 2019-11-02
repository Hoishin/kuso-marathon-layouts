import 'modern-normalize/modern-normalize.css';
import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import {render} from '../render';
import {useReplicant} from '../../use-nodecg/use-replicant';
import TweetItem from '../organisms/tweet';

const tweetsRep = nodecg.Replicant('tweets');

const Container = styled.div`
	padding: 8px;
	width: 100%;
	height: 480px;
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

	if (!tweets) {
		return null;
	}

	return (
		<Container>
			{tweets.map((tweet) => (
				<TweetItem key={tweet.id} tweet={tweet} />
			))}
		</Container>
	);
};

render(<Twitter />);
