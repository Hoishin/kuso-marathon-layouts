import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import BasePage from '../base-page';
import frameImg from '../assets/frames/break.png';
import {GlobalStyle, boxBackground} from '../styles';
import BreakRunInfo from '../organisms/break-run-info';
import loadingImage from '../assets/loading.png';
import nextIcon from '../assets/next-icon.png';
import prevIcon from '../assets/prev-icon.png';
import nextText from '../assets/next-text.png';
import prevText from '../assets/prev-text.png';
import BreakNextRun from '../organisms/break-next-run';

const RunInfo1 = styled(BreakRunInfo)`
	left: 180px;
	top: 30px;
`;
const RunInfo2 = styled(BreakRunInfo)`
	left: 180px;
	top: 120px;
`;
const RunInfo3 = styled(BreakRunInfo)`
	left: 180px;
	top: 505px;
`;
const RunInfo4 = styled(BreakRunInfo)`
	left: 180px;
	top: 595px;
`;

const Loading = styled.img`
	position: absolute;
	left: 913px;
	top: 625px;
`;

const NextIcon = styled.img`
	position: absolute;
	left: 76px;
	top: 464px;
`;
const PrevIcon = styled.img`
	position: absolute;
	left: 76px;
	top: 159px;
`;
const NextText = styled.img`
	position: absolute;
	left: 65px;
	top: 515px;
`;
const PrevText = styled.img`
	position: absolute;
	left: 67px;
	top: 134px;
`;

const LogoArea = styled.div`
	${boxBackground};
	position: absolute;
	left: 870px;
	top: 251px;
	width: 320px;
	height: 180px;
`;

const NextRun = styled(BreakNextRun)`
	position: absolute;
	left: 90px;
	top: 227px;
`

const page = (
	<>
		<GlobalStyle />
		<BasePage frameImg={frameImg} />
		<NextRun />
		<RunInfo1 indexFn={n => n - 2} />
		<RunInfo2 indexFn={n => n - 1} />
		<RunInfo3 indexFn={n => n + 1} />
		<RunInfo4 indexFn={n => n + 2} />
		<LogoArea />
		<Loading src={loadingImage} />
		<NextIcon src={nextIcon} />
		<PrevIcon src={prevIcon} />
		<NextText src={nextText} />
		<PrevText src={prevText} />
	</>
);

ReactDOM.render(page, document.querySelector('#root'));
