import React, {FC} from "react";
import {IconContainersT} from "../../types";
import IconSection from "./IconSection";
import styled from "styled-components";
import TextSection from "./TextSection";
import {useIsEditor} from "../../data/slice/editorSlice";
import {AddSectionButton} from "../editor/AddButton";
import {FlexExpand, HFlexContainer} from "../UtilityElements";

const IconContainer: FC<{
    textOnly?: boolean;
    sections: number[];
    containerName: IconContainersT;
}> = React.memo(({sections, textOnly = false, containerName}) => {
    const isEditor = useIsEditor();


    const base = <ContainerRoot>

        {sections.map(sectionId => {
            if (textOnly) {
                return <TextSection key={sectionId} sectionId={sectionId}/>
            } else {
                return <IconSection key={sectionId} sectionId={sectionId}/>
            }
        })}

    </ContainerRoot>;

    if (isEditor) {
        return <EditorRoot>
            <HFlexContainer>
                <EditorTitle>{containerName}</EditorTitle>
                <FlexExpand style={{minWidth: 120}}/>
                <AddSectionButton containerName={containerName}/>
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
`
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


export default IconContainer;