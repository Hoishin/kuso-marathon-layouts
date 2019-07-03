import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import BasePage from '../base-page';
import LogoArea from '../organisms/logo-area';
import frameImg from '../assets/frames/sd1.png';
import VerticalGameArea from '../organisms/vertical-game-area';
import ParticipantsArea from '../organisms/participants-area';
import TimerArea from '../organisms/timer-area';
import InfoArea from '../organisms/info-area';
import {GlobalStyle} from '../styles';

const Logo = styled(LogoArea)`
	position: absolute;
	left: 35px;
	top: 46px;
	width: 370px;
	height: 138px;
	padding: 24px 12px;
`;

const Game = styled(VerticalGameArea)`
	position: absolute;
	left: 35px;
	top: 235px;
	width: 370px;
	height: 110px;
`;

const Participants = styled(ParticipantsArea)`
	position: absolute;
	left: 35px;
	top: 395px;
	width: 370px;
	height: 90px;
`;

const Timer = styled(TimerArea)`
	position: absolute;
	left: 35px;
	top: 535px;
	width: 370px;
	height: 110px;
`;

const Info = styled(InfoArea)`
	position: absolute;
	left: 5px;
	bottom: 5px;
	width: 1270px;
	height: 30px;
`;

const page = (
	<>
		<GlobalStyle />
		<BasePage frameImg={frameImg}>
			<Logo />
			<Game />
			<Participants />
			<Timer />
			<Info />
		</BasePage>
	</>
);

ReactDOM.render(page, document.querySelector('#root'));
