import React, {FC} from "react";
import IconWidget, {AddIconWidgetButton} from "./IconWidget";
import styled, {useTheme} from "styled-components";
import {isNumber} from "../../lib/util";
import {useSettings} from "../../data/slice/settingsSlice";
import {isMobile} from "react-device-detect";
import {useIconSection} from "../../data/slice/iconCollectionSlice";
import {editorSlice, useIsEditor, useIsSelected} from "../../data/slice/editorSlice";
import {HFlexContainer} from "../UtilityElements";
import {IconContainersT} from "../../types";
import {useAppDispatch} from "../../data/hooks";
import actions from "../../data/actions";
import genId from "../../data/genId";
import clsx from "clsx";

const IconSection: FC<{
    sectionId: string;
}> = ({sectionId}) => {
    const theme = useTheme();
    const displayTitles = useSettings.displayTitles();
    const section = useIconSection(sectionId);
    const isEditor = useIsEditor();
    const isSelected = useIsSelected("section", sectionId);
    const dispatch = useAppDispatch();

    if (!section) {
        return null;
    }

    const title = (
        <Title
            style={{
                display: displayTitles ? undefined : "none"
            }}
        >
            {section.title ? section.title : '\u00A0'}
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
            <SectionRoot
                className={clsx({
                    "selected": isSelected,
                })}
            >
                <Header onClick={handleHeaderClick}>
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

    function handleHeaderClick(e: React.MouseEvent) {
        if (isEditor) {
            e.preventDefault();
            dispatch(editorSlice.actions.setSelectedObj({sectionId}));
        }
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

    &.selected {
        outline: 2px solid rgb(0 102 255 / 55%);
    }
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
    user-select: none;
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
