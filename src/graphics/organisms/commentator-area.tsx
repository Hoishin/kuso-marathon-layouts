import styled from 'styled-components';
import HorizontalParticipant from '../molecules/horizontal-participant';
import {boxBackground} from '../styles';

const CommentatorArea = styled(HorizontalParticipant).attrs({
	type: 'commentator',
})`
	padding: 0 5px;
	${boxBackground}
`;

export default CommentatorArea;
