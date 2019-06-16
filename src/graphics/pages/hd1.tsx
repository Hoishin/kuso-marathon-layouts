import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import BasePage from '../components/base-page';
import LogoArea from '../components/organisms/logo-area';
import frameImg from '../assets/frames/hd1.png';
import ParticipantsArea from '../components/organisms/participants-area';
import TimerArea from '../components/organisms/timer-area';
import InfoArea from '../components/organisms/info-area';
import {GlobalStyle} from '../styles';
import HorizontalGameArea from '../components/organisms/horizontal-game-area';

const Logo = styled(LogoArea)`
	position: absolute;
	left: 34px;
	top: 40px;
	width: 274px;
	height: 110px;
	padding: 24px 12px;
`;

const Game = styled(HorizontalGameArea)`
	position: absolute;
	left: 343px;
	top: 39px;
	width: 896px;
	height: 62px;
`;

const Participants = styled(ParticipantsArea)`
	position: absolute;
	left: 34px;
	top: 245px;
	width: 274px;
	height: 190px;
`;

const Timer = styled(TimerArea)`
	position: absolute;
	left: 34px;
	bottom: 75px;
	width: 274px;
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
			<Participants vertical />
			<Timer />
			<Info />
		</BasePage>
	</>
);

ReactDOM.render(page, document.querySelector('#root'));
