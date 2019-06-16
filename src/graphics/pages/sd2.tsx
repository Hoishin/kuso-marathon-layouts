import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import BasePage from '../components/base-page';
import LogoArea from '../components/organisms/logo-area';
import frameImg from '../assets/frames/sd2.png';
import VerticalGameArea from '../components/organisms/vertical-game-area';
import TimerArea from '../components/organisms/timer-area';
import InfoArea from '../components/organisms/info-area';
import {GlobalStyle} from '../styles';
import RunnerArea from '../components/organisms/runner-area';
import CommentatorArea from '../components/organisms/commentator-area';

const Logo = styled(LogoArea)`
	position: absolute;
	right: 35px;
	bottom: 75px;
	width: 410px;
	height: 92px;
	padding: 5px 50px;
`;

const Game = styled(VerticalGameArea)`
	position: absolute;
	left: 35px;
	bottom: 75px;
	width: 410px;
	height: 92px;
`;

const LeftRunner = styled(RunnerArea)`
	position: absolute;
	left: 35px;
	top: 35px;
	width: 410px;
	height: 40px;
`;

const RightRunner = styled(RunnerArea)`
	position: absolute;
	right: 35px;
	top: 35px;
	width: 410px;
	height: 40px;
`;

const Commentator = styled(CommentatorArea)`
	position: absolute;
	left: 475px;
	top: 35px;
	width: 330px;
	height: 40px;
`;

const Timer = styled(TimerArea)`
	position: absolute;
	left: 475px;
	bottom: 75px;
	width: 330px;
	height: 92px;
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
			<LeftRunner />
			<RightRunner />
			<Commentator />
			<Timer />
			<Info />
		</BasePage>
	</>
);

ReactDOM.render(page, document.querySelector('#root'));
