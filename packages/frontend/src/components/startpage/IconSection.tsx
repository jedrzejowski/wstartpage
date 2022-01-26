import React, {FC} from "react";
import IconWidget, {AddIconWidgetButton} from "./IconWidget";
import styled, {useTheme} from "styled-components";
import {isNumber} from "../../lib/util";
import {useSettings} from "../../data/slice/settingsSlice";
import {isMobile} from "react-device-detect";
import {useIconSection} from "../../data/slice/iconCollectionSlice";
import {useIsEditor} from "../../data/slice/editorSlice";
import {HFlexContainer} from "../UtilityElements";
import {IconContainersT} from "../../types";
import {useAppDispatch} from "../../data/hooks";
import actions from "../../data/actions";
import genId from "../../data/genId";

const IconSection: FC<{
    sectionId: string;
}> = ({sectionId}) => {
    const theme = useTheme();
    const displayTitles = useSettings.displayTitles();
    const section = useIconSection(sectionId);
    const isEditor = useIsEditor();

    if (!section) {
        return null;
    }

    const title = (
        <Title style={{
            display: displayTitles ? undefined : "none"
        }}>
            {section.title}
        </Title>
    );

    const widgets = section.widgets.map(widgetId => {
        return <IconWidget key={widgetId} widgetId={widgetId}/>
    });

    if (isMobile) {
        return <>
            {title}
            {widgets}
        </>
    } else {
        return (
            <SectionRoot>
                <Header>
                    {title}
                </Header>

                <WidgetsContainer style={{
                    width: isNumber(section.width) ? section.width * (theme.spacingNum(3) + theme.iconSize) : undefined
                }}>
                    {widgets}
                    {isEditor ? <AddIconWidgetButton sectionId={sectionId}/> : null}
                </WidgetsContainer>
            </SectionRoot>
        );
    }
};


export const AddIconSectionButton: FC<{
    iconCollectionName: string;
    containerName: IconContainersT;
}> = React.memo(({iconCollectionName, containerName}) => {
    const dispatch = useAppDispatch();

    return <AddButtonRoot onClick={handleClick}>
        <div>Dodaj sekcję</div>
    </AddButtonRoot>

    function handleClick() {
        dispatch(actions.addIconSection({
            iconCollectionName,
            containerName,
            sectionId: genId()
        }));
    }
});

const SectionRoot = styled.div`
    width: ${isMobile ? "inherit" : "max-content"};
    display: flex;
    flex-direction: column;
    background-color: white;

        //margin: ${props => props.theme.spacing()} ${props => ((props.theme.iconSize - props.theme.spacingNum() - 2) / 2)}px;
    margin: ${props => props.theme.spacing()};
    padding: ${props => props.theme.spacing()} ${props => props.theme.spacing(2)};
    border: 1px solid ${props => props.theme.color.border};
`;

const Header = styled(HFlexContainer)`
    margin: ${props => props.theme.spacing(-0.5)} 0 0 ${props => props.theme.spacing(-1.3)};
`;

const Title = isMobile ? styled.div`
    text-align: center;
    opacity: 0.5;
    text-transform: uppercase;
    margin: 0 ${props => props.theme.spacing(2)};

    writing-mode: tb-rl;
    transform: rotate(-170deg);
` : styled.div`
    opacity: 0.5;
    text-transform: uppercase;
`;

const WidgetsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const AddButtonRoot = styled(SectionRoot)`
    display: block;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    cursor: pointer;
    font-size: 0.8em;

    > div {
        opacity: 0.5;
        text-align: center;
    }
`

export default IconSection;
