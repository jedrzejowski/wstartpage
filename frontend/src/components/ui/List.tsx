import React, {FC, ReactNode, MouseEvent} from 'react';
import MdiIcon, {MdiIconKey} from '../MdiIcon';
import styled from 'styled-components';

interface ItemActionProps {
  icon: MdiIconKey;
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  color?: string;
}

export const List = styled.div`

`;

export const ListItemRoot = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  ${props => props.onClick ? 'cursor: pointer;' : ''}
  ${props => props.selected ? `background: ${props.theme.color.selected};` : ''}
  padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(1.5)};

  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }
`;

export const ListItemText = styled.div`
  flex-grow: 1;
`;

export const ListItemActions = styled.div`
  display: flex;
  margin-right: ${props => props.theme.spacing(-1)};
`;

export const ListItemActionRoot = styled.div<{ disabled?: boolean }>`
  display: flex;

  cursor: pointer;
  padding: ${props => props.theme.spacing(1)};
  margin: ${props => props.theme.spacing(-1, 0)};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  opacity: ${props => props.disabled ? '0' : '1'};

  &:hover {
    background: ${props => props.theme.color.hover};
  }
`;

export const ListItem: FC<{
  main: ReactNode;
  actions?: (ItemActionProps | null)[];
  onClick?: (e: MouseEvent) => void;
  selected?: boolean;
}> = props => {

  return <ListItemRoot onClick={props.onClick} selected={props.selected}>
    <ListItemText>
      {props.main}
    </ListItemText>

    {props.actions && (
      <ListItemActions>
        {props.actions.map((props, i) => (props && <ListItemAction key={i} {...props}/>))}
      </ListItemActions>
    )}
  </ListItemRoot>;
};



export const ListItemAction: FC<ItemActionProps> = props => {
  return <ListItemActionRoot disabled={props.disabled} onClick={props.onClick}>
    <MdiIcon icon={props.icon} color={props.color}/>
  </ListItemActionRoot>;
};


