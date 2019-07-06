import React from 'react';
import styled from 'styled-components';
import {Tweet} from '../../extension/types/nodecg';
import InfoBlock from '../molecules/info-block';
import sendIcon from '../assets/send.svg';
import trashIcon from '../assets/trash.svg';

const Container = styled.div`
	display: grid;
	grid-template-columns: 48px 1fr 48px;
	gap: 8px;
`;

const Icon = styled.img`
	align-self: center;
	justify-self: center;
	border-radius: 100%;
`;

const Controls = styled.div`
	display: grid;
	grid-template-rows: auto auto;
	align-content: center;
	justify-content: center;
	gap: 8px;
`;

const ControlButton = styled.button`
	border: none;
	background: transparent;
	padding: 0;
	cursor: pointer;
	display: grid;
	align-items: center;
	justify-items: center;
`;

const TweetItem: React.FunctionComponent<{tweet: Tweet}> = (props) => {
	const label = `${props.tweet.user.screenName} (@${props.tweet.user.name})`;
	return (
		<Container>
			<Icon src={props.tweet.user.icon} />
			<InfoBlock label={label} content={props.tweet.content} />
			<Controls>
				<ControlButton>
					<img src={sendIcon} />
				</ControlButton>
				<ControlButton>
					<img src={trashIcon} />
				</ControlButton>
			</Controls>
		</Container>
	);
};

export default TweetItem;