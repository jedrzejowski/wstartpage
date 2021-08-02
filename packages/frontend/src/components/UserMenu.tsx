import React, {FC, useState} from "react";
import {SmallButton} from "../lib/UtilityElements";
import Emoji from "../lib/Emoji";
import styled from "@emotion/styled";
import Modal from "react-modal";
import {useCurrentDashboardNames, useSetCurrentDashboardNames} from "../data/currentDashboards";

const UserMenu: FC<{}> = React.memo(props => {
    const [isOpen, setIsOpen] = useState(false);
    const currentNames = useCurrentDashboardNames();
    const setCurrentNames = useSetCurrentDashboardNames();

    return <div>
        <SmallButton onClick={handleOpenModal}>{Emoji.GEAR}</SmallButton>

        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                }
            }}
        >
            <h4>Dashboardy</h4>

            <InputText
                type="text"
                style={{width: "500px"}}
                value={currentNames.join(";")}
                onChange={handleNamesChange}
            />
        </Modal>
    </div>;

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }

    function handleNamesChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentNames(event.target.value);
    }
});

const InputText = styled.input`
  padding: ${props => props.theme.spacing(0.5)};
  outline: none;
`;

export default UserMenu;