import {FC, MouseEventHandler, ReactNode, useEffect, useRef, useState} from "react";
import styled from "styled-components";

export function Dialog(props: {
  open: boolean;
  onBackdropClick?: () => void;
  children: ReactNode;
}) {
  const [wasOpen, setWasOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.open) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [props.open]);

  const onClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    const rect = ref.current!.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );

    if (!isInDialog) {
      props.onBackdropClick?.()
    }
  }

  if (!wasOpen && !props.open) return null;

  return <MyDialog ref={ref} onClick={onClick}>
    <div>
      {props.children}
    </div>
  </MyDialog>;
}

const MyDialog = styled.dialog`
  padding: ${props => props.theme.spacing(2)};
  margin: ${props => props.theme.spacing(2)} auto;
  max-height: calc(100% - ${props => props.theme.spacing(20)});
  min-width: 640px;
`;

export const DialogTitle = styled.h4`
  margin-top: 0;
  margin-bottom: ${props => props.theme.spacing(2)};
`;

export const DialogContent = styled.div`

`;

export const DialogActionFooter = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing(1)};
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing(2)};
`;

export default Dialog;

export function makeDialogLatch<P extends { open: boolean; }>(Component: FC<P>): FC<P> {
  // @ts-ignore
  return (props) => {
    const wasOpenRef = useRef(false);
    if (!props.open && !wasOpenRef.current) return null;
    wasOpenRef.current = true;
    // @ts-ignore
    return <Component {...props} />
  }
}
