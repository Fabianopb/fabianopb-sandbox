import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { login } from '../../api';
import { clearSession, setSession } from '../utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onError: () => void;
};

const StyledDialogActions = styled(DialogActions)`
  padding: 8px 24px 24px;
`;

const StyledTitle = styled(DialogTitle)`
  color: #8e8f98;
`;

const StyledInput = styled(TextField)`
  margin-top: 16px;
`;

const LoginDialog = ({ isOpen, onClose, onError }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isLoading } = useMutation(() => login({ username, password }), {
    onSuccess: ({ token }) => {
      setSession(token);
      onClose();
    },
    onError: () => {
      clearSession();
      onError();
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} disableEscapeKeyDown={isLoading}>
      <StyledTitle>Login</StyledTitle>
      <DialogContent>
        <StyledInput
          label="Username"
          fullWidth
          variant="outlined"
          size="small"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          disabled={isLoading}
        />
        <StyledInput
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          disabled={isLoading}
        />
      </DialogContent>
      <StyledDialogActions>
        <Button variant="outlined" onClick={() => mutate()} disabled={isLoading || !username || !password}>
          Confirm
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
};

export default LoginDialog;
