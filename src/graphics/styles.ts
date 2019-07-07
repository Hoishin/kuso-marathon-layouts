import {css, createGlobalStyle} from 'styled-components';
import yasashisaGothic from './assets/07YasashisaGothic/07YasashisaGothic.woff2';

const YASASHISA_GOTHIC = '07YasashisaGothic';

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
	font-family: ${YASASHISA_GOTHIC}, sans-serif;
	color: white;
`;

export const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: ${YASASHISA_GOTHIC};
		src: url(${yasashisaGothic});
	}
`;
