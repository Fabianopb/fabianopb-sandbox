import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, colors } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQueryParam, StringParam } from 'use-query-params';
import { login } from '../../apis/root';
import { isAdminAtom } from '../atoms';
import { clearSession, isSessionValid, setSession } from '../utils';

const StyledDialogActions = styled(DialogActions)`
  padding: 8px 24px 24px;
`;

const StyledTitle = styled(DialogTitle)`
  color: ${colors.grey[600]};
`;

const StyledInput = styled(TextField)`
  margin-top: 16px;
`;

const LoginDialog = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [mode, setMode] = useQueryParam('mode', StringParam);

  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    setMode(undefined);
  }, [setMode]);

  const handleSuccess = useCallback(() => {
    setIsModalOpen(false);
    setIsAdmin(true);
  }, [setIsAdmin]);

  useEffect(() => {
    if (mode === 'adminLogin' && !isSessionValid()) {
      setIsModalOpen(true);
    }
    if (isSessionValid()) {
      setIsAdmin(true);
    }
  }, [mode, setIsAdmin]);

  const { mutate, isLoading } = useMutation(() => login({ username, password }), {
    onSuccess: ({ token }) => {
      setSession(token);
      handleSuccess();
    },
    onError: () => {
      clearSession();
      handleClose();
    },
  });

  return (
    <Dialog open={!isAdmin && isModalOpen} onClose={handleClose} disableEscapeKeyDown={isLoading}>
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
        <Button
          color="primary"
          variant="outlined"
          onClick={() => mutate()}
          disabled={isLoading || !username || !password}
        >
          Confirm
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
};

export default LoginDialog;
