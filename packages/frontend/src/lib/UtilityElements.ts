import styled from "@emotion/styled";

export const Square = styled.div`
  width: 100%;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export const HFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexExpand = styled.div`
  flex-grow: 999999;
`;

export const SmallButton = styled.button`
  padding: ${props => props.theme.spacing(1)};
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.buttonHoverBg};
  }
`;