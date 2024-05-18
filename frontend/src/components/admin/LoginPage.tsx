import React, {FC, useEffect, useState} from 'react';
import TextInput from '../input/TextInput.tsx';
import styled from 'styled-components';
import Button from '../input/Button.tsx';
import Toolbar from '../Toolbar.tsx';
import {useLoginMutation} from '../../data/slice/apiSlice.ts';
import {useNavigate} from "react-router-dom";

const LoginPage: FC = props => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [login, loginResult] = useLoginMutation();

  useEffect(() => {
    if (!loginResult.isSuccess) return;
    navigate('/tile-collection-editor');
  }, [loginResult.isSuccess]);

  return <Root>
    <Container>

      <TextInput label="Użytkownik" value={username} onValueChange={setUsername}/>
      <TextInput label="Hasło" value={password} onValueChange={setPassword}/>

      <Toolbar>
        <Toolbar.Left>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Toolbar.Left>
        <Toolbar.Right>
          <Button onClick={submit}>Login</Button>
        </Toolbar.Right>
      </Toolbar>

    </Container>
  </Root>;

  function submit() {
    login({username, password});
  }
};

export default LoginPage;

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
