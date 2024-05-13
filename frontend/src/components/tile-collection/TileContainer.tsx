import React, {FC} from 'react';
import {TileContainersT} from '../../data/tileCollection';
import TileSection, {AddTileSectionButton} from './TileSection';
import styled from 'styled-components';
import TextSection from './TextSection';
import {useIsEditor} from '../tile-collection-editor/EditorContext';
import {FlexExpand, HFlexContainer} from '../UtilityElements';

const TileContainer: FC<{
  iconCollectionName: string;
  textOnly?: boolean;
  direction?: 'column' | 'row'
  sections: string[];
  containerName: TileContainersT;
}> = props => {
  const {
    iconCollectionName,
    sections,
    textOnly = false,
    containerName,
    direction = 'row',
  } = props;
  const isEditor = useIsEditor();

  const base = <ContainerRoot direction={direction}>

    {sections.map(sectionId => {
      if (textOnly) {
        return <TextSection key={sectionId} sectionId={sectionId}/>;
      } else {
        return <TileSection key={sectionId} sectionId={sectionId}/>;
      }
    })}

    {isEditor ? <AddTileSectionButton iconCollectionName={iconCollectionName} containerName={containerName}/> : null}

  </ContainerRoot>;

  if (isEditor) {
    return <EditorRoot>
      <HFlexContainer>
        <EditorTitle>{containerName}</EditorTitle>
        <FlexExpand style={{minWidth: 120}}/>
      </HFlexContainer>
      {base}
    </EditorRoot>;
  } else {
    return base;
  }
};


const ContainerRoot = styled.div<{ direction: 'column' | 'row' }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => props.direction};
`;

const EditorRoot = styled.div`
  margin: ${props => props.theme.spacing(1)};
  padding: ${props => props.theme.spacing(1, 1, 0, 1)};
  border: 2px dashed ${props => props.theme.color.border};
`;

const EditorTitle = styled.h3`
  display: block;
  margin: 0;
  padding: 0;
  font-size: 1.5em;
  font-weight: normal;
`;


export default React.memo(TileContainer);
