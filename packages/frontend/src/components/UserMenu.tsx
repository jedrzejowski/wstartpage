import React, {FC, useState} from "react";
import {SmallButton} from "../lib/UtilityElements";
import Emoji from "../lib/Emoji";
import styled from "styled-components";
import Modal from "react-modal";
import settingsSlice, {useSettings} from "../data/slice/settingsSlice";
import {useAppDispatch} from "../data/hooks";

const UserMenu: FC<{}> = React.memo(props => {
    const [isOpen, setIsOpen] = useState(false);
    const currentNames = useSettings.iconSetNames();
    const dispatch = useAppDispatch();

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
        dispatch(settingsSlice.actions.setIconSetName(event.target.value.split(";")));
    }
});

const InputText = styled.input`
  padding: ${props => props.theme.spacing(0.5)};
  outline: none;
`;

export default UserMenu;