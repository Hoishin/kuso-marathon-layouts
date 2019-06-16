import {css, createGlobalStyle} from 'styled-components';
import yasashisaGothic from './assets/07YasashisaGothic.woff2';

export const boxBackground = css`
	background: linear-gradient(
		to right,
		rgba(35, 33, 69, 1) 0%,
		rgba(14, 19, 37, 1) 100%
	);
`;

export const absoluteCenterContent = css`
	display: grid;
	justify-content: center;
	align-content: center;
`;

export const textStyle = css`
	font-family: '07YasashisaGothic', sans-serif;
	color: white;
`;

export const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: '07YasashisaGothic';
		src: url(${yasashisaGothic});
	}
`;
