import React, {ReactNode} from 'react';
import {List, ListItem} from '../ui/List';

interface EditableListChangeBaseAction<T> {
  index: number;
  up?: T;
  down?: T;
  del?: T;
}

export type EditableListChangeAction<T> = EditableListChangeBaseAction<T> & (
  | { up: T }
  | { down: T }
  | { del: T }
  )

interface CommonProps<T> {
  itemRender?: (item: T) => ({ main: ReactNode });
  itemKey?: (item: T, index: number) => string;
  onChange: (action: EditableListChangeAction<T>) => void;
}

const defaultRenderer = (something: any) => ({main: something + ''});
const defaultKey = (something: any, index: number) => index + '';

function EditableList<T>(props: {
  list: T[];
} & CommonProps<T>) {

  const {list, onChange, itemRender, itemKey = defaultKey} = props;

  return <List>
    {list.map((item, i) => (<Item
      key={itemKey(item, i)}
      item={item}
      itemRender={itemRender}
      itemKey={itemKey}
      onChange={onChange}
      index={i}
      isFirst={i === 0}
      isLast={i === list.length - 1}
    />))}
  </List>;
}

export default EditableList;

function Item<T>(props: {
  isFirst: boolean;
  isLast: boolean;
  index: number;
  item: T;
} & CommonProps<T>) {
  const {item, index, isFirst, isLast, itemRender = defaultRenderer, onChange} = props;
  const itemComponents = itemRender(item);

  return <ListItem
    primary={itemComponents.main}
    actions={[
      {icon: 'arrow-up', onClick: handleClickUp, disabled: isFirst},
      {icon: 'arrow-down', onClick: handleClickDown, disabled: isLast},
      {icon: 'delete', onClick: handleClickDelete, color: 'red'},
    ]}
  />;

  function handleClickUp() {
    onChange({up: item, index});
  }

  function handleClickDown() {
    onChange({down: item, index});
  }

  function handleClickDelete() {
    onChange({del: item, index});
  }
}
