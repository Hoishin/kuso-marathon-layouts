import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import {boxBackground} from '../../styles';
import {FunctionComponentWithClassName} from '../../../types/react';

const ImgWithBg = styled.img.attrs({src: logo})`
	${boxBackground}
`;

const LogoArea: FunctionComponentWithClassName = (props) => {
	return <ImgWithBg className={props.className} />;
};

export default LogoArea;
