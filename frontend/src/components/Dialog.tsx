import {ReactNode, useEffect, useRef} from "react";
import styled, {createGlobalStyle} from "styled-components";

export function Dialog(props: {
  open: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.open) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [props.open]);

  return <StyledDialog ref={ref} id="qwe">
    <div>
      {props.children}
    </div>
  </StyledDialog>;
}

const Title = styled.h5`
  margin-top: 0;
  margin-bottom: ${props => props.theme.spacing(2)};
`;

const Content = styled.div`

`;

const ActionFooter = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing(1)};
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing(2)};
`;

const StyledDialog = styled.dialog`
  padding: ${props => props.theme.spacing(2)};
`;


Dialog.Title = Title;
Dialog.Content = Content;
Dialog.ActionFooter = ActionFooter;

export default Dialog;
