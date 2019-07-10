import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: grid;
	grid-template-rows: 12px auto;
	gap: 4px;
`;

const Label = styled.div`
	font-size: 12px;
	color: #333;
	white-space: nowrap;
	overflow: hidden;
`;
const Content = styled.div``;

const InfoBlock: React.FunctionComponent<{
	label: string;
	content: string;
}> = (props) => {
	return (
		<Container>
			<Label>{props.label}</Label>
			<Content>{props.content}</Content>
		</Container>
	);
};

export default InfoBlock;
