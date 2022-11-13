import styled from 'styled-components';

const Panel = styled.div`
  padding: ${props => props.theme.spacing()} ${props => props.theme.spacing(1.5)};
  border: 1px solid ${props => props.theme.color.border};
`;

export default Panel;
