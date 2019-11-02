import styled from 'styled-components';

import HorizontalParticipant from '../molecules/horizontal-participant';
import {boxBackground} from '../styles';

const RunnerArea = styled(HorizontalParticipant).attrs({type: 'runner'})`
	padding: 0 5px;
	${boxBackground}
`;

export default RunnerArea;
