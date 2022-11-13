import React, {FC, useState} from 'react';
import TextInput from '../input/TextInput';
import styled from 'styled-components';
import Button from '../input/Button';
import Toolbar from '../Toolbar';
import {useLoginMutation} from '../../data/api/apiBackend';

const EditorLoginPage: FC = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [login, loginResult] = useLoginMutation();

  return <Root>
    <Container>

      <TextInput label="Użytkownik" value={username} onChange={setUsername}/>
      <TextInput label="Hasło" value={password} onChange={setPassword} password/>

      <Toolbar
        left={<>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </>}
        right={<Button onClick={submit}>Login</Button>}
      />

    </Container>
  </Root>;

  function submit() {
    login({username, password});
  }
};

export default EditorLoginPage;

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Container = styled.div`
  width: 360px;

  > * + * {
    margin-top: ${props => props.theme.spacing(.5)};
  }
`;

const ErrorMessage = styled.div`
  color: red;
`;
