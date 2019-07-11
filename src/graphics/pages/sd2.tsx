import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import BasePage from '../base-page';
import LogoArea from '../organisms/logo-area';
import frameImg from '../assets/frames/sd2.png';
import VerticalGameArea from '../organisms/vertical-game-area';
import TimerArea from '../organisms/timer-area';
import InfoArea from '../organisms/info-area';
import {GlobalStyle} from '../styles';
import RunnerArea from '../organisms/runner-area';
import CommentatorArea from '../organisms/commentator-area';
import {useCurrentRun} from '../../shared/use-current-run';

const Logo = styled(LogoArea)`
	position: absolute;
	right: 35px;
	bottom: 75px;
	width: 410px;
	height: 92px;
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

const Page: React.FunctionComponent = () => {
	const currentRun = useCurrentRun();
	return (
		<>
			<GlobalStyle />
			<BasePage frameImg={frameImg}>
				<Logo />
				<Game />
				{currentRun && (
					<>
						<LeftRunner participant={currentRun.runners[0]} />
						<RightRunner participant={currentRun.runners[1]} />
						<Commentator participant={currentRun.commentators[0]} />
					</>
				)}
				<Timer />
				<Info />
			</BasePage>
		</>
	);
};

ReactDOM.render(<Page />, document.querySelector('#root'));
