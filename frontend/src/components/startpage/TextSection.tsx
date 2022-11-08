import React, {FC} from 'react';
import styled from 'styled-components';
import {useNormalizedTileSection} from '../../data/slice/normalizedIconCollections';
import TextWidget, {AddTextWidgetButton} from './TextWidget';
import {setEditorSelectedObjAction, useIsSelected} from '../../data/slice/editor';
import {useIsEditor} from '../editor/EditorContext';
import {useAppDispatch} from '../../data/hooks';
import clsx from 'clsx';

const TextSection: FC<{
  sectionId: string,
}> = ({sectionId}) => {
  const section = useNormalizedTileSection(sectionId);
  const isEditor = useIsEditor();
  const isSelected = useIsSelected('section', sectionId);
  const dispatch = useAppDispatch();

  if (!section) {
    return null;
  }

  const tileIds = section.tiles ?? [];

  const Root = isEditor ? EditRoot : ViewRoot;

  return <Root
    className={clsx(isSelected && 'selected')}
  >
    {isEditor && <Title onClick={handleTitleClick}>{section.title}</Title>}
    <IconRoot>
      {tileIds.map(tileId => {
        return <TextWidget key={tileId} tileId={tileId}/>;
      })}

      {isEditor && <AddTextWidgetButton sectionId={sectionId}/>}
    </IconRoot>
  </Root>;

  function handleTitleClick(e: React.MouseEvent) {
    if (isEditor) {
      e.preventDefault();
      dispatch(setEditorSelectedObjAction({sectionId}));
    }
  }
};

export default React.memo(TextSection);

const ViewRoot = styled.div`
  margin: ${props => props.theme.spacing()};
`;

const EditRoot = styled.div`
  margin: ${props => props.theme.spacing()};
  padding: ${props => props.theme.spacing()};
  border: 1px dashed ${props => props.theme.color.border};

  &.selected {
    outline: 2px solid rgb(0 102 255 / 55%);
  }
`;

const IconRoot = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Title = styled.div`
  opacity: 0.5;
  text-transform: uppercase;
  user-select: none;
`;

