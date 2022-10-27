import React, {FC} from 'react';
import {TileContainersT} from '../../types';
import TileSection, {AddTileSectionButton} from './TileSection';
import styled from 'styled-components';
import TextSection from './TextSection';
import {useIsEditor} from '../../data/slice/editorSlice';
import {FlexExpand, HFlexContainer} from '../UtilityElements';

const TileContainer: FC<{
  iconCollectionName: string,
  textOnly?: boolean,
  sections: string[],
  containerName: TileContainersT,
}> = React.memo(({iconCollectionName, sections, textOnly = false, containerName}) => {
  const isEditor = useIsEditor();

  const base = <ContainerRoot>

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
});


const ContainerRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const EditorRoot = styled.div`
  margin: ${props => props.theme.spacing(1)};
  padding: ${props => props.theme.spacing4(1, 1, 0, 1)};
  border: 2px dashed ${props => props.theme.color.border};
`;

const EditorTitle = styled.h3`
  display: block;
  margin: 0;
  padding: 0;
  font-size: 1.5em;
  font-weight: normal;
`;


export default TileContainer;
