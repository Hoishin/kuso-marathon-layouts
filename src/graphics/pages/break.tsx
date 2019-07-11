import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import BasePage from '../base-page';
import frameImg from '../assets/frames/break.png';
import {GlobalStyle} from '../styles';
import BreakRunInfo from '../organisms/break-run-info';
import loadingImage from '../assets/loading.png';
import nextIcon from '../assets/next-icon.png';
import prevIcon from '../assets/prev-icon.png';
import nextText from '../assets/next-text.png';
import prevText from '../assets/prev-text.png';
import BreakNextRun from '../organisms/break-next-run';
import {Run} from '../../extension/types/nodecg';
import InfoArea from '../organisms/info-area';
import LogoArea from '../organisms/logo-area';

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

const Logo = styled(LogoArea)`
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
`;

const Info = styled(InfoArea)`
	position: absolute;
	left: 5px;
	bottom: 5px;
	width: 1270px;
	height: 30px;
`;

const Page = () => {
	return (
		<>
			<GlobalStyle />
			<BasePage frameImg={frameImg}>
				<NextRun />
				<RunInfo1 indexFn={(n) => n - 2} />
				<RunInfo2 indexFn={(n) => n - 1} />
				<RunInfo3 indexFn={(n) => n + 1} />
				<RunInfo4 indexFn={(n) => n + 2} />
				<Logo>
				</Logo>
				<Loading src={loadingImage} />
				<NextIcon src={nextIcon} />
				<PrevIcon src={prevIcon} />
				<NextText src={nextText} />
				<PrevText src={prevText} />
				<Info />
			</BasePage>
		</>
	);
};

ReactDOM.render(<Page />, document.querySelector('#root'));

const imageUrls = new Set<string>();
nodecg.Replicant('schedule').on('change', (newVal: Run[]) => {
	for (const run of newVal) {
		if (!run.imageUrl || imageUrls.has(run.imageUrl)) {
			continue;
		}
		const linkEl = document.createElement('link');
		linkEl.rel = 'prefetch';
		linkEl.href = run.imageUrl;
		document.head.append(linkEl);
		imageUrls.add(run.imageUrl);
	}
});
