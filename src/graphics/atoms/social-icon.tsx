import React from 'react';
import styled from 'styled-components';
import {FunctionComponentWithClassName} from '../../types/react';
import twitter from '../assets/social-icons/twitter.png';
import twitch from '../assets/social-icons/twitch.png';

export type Media = 'twitter' | 'twitch';

const getIconSrc = (media: Media) => {
	switch (media) {
		case 'twitter':
			return twitter;
		case 'twitch':
			return twitch;
	}
};

const IconImg = styled.img`
	max-width: 25px;
	max-height: 25px;
	filter: drop-shadow(2px 2px 1px black);
`;

const SocialIcon: FunctionComponentWithClassName<{media: Media}> = (props) => {
	return (
		<IconImg src={getIconSrc(props.media)} className={props.className} />
	);
};

export default SocialIcon;
