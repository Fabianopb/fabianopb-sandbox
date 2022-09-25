import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import styled from 'styled-components';

type Props = {
  isOpen: boolean;
  onClose: () => void;
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

const LoginDialog = ({ isOpen, onClose }: Props) => (
  <Dialog open={isOpen} onClose={onClose}>
    <StyledTitle>Login</StyledTitle>
    <DialogContent>
      <StyledInput label="Username" fullWidth variant="outlined" size="small" />
      <StyledInput label="Password" type="password" fullWidth variant="outlined" size="small" />
    </DialogContent>
    <StyledDialogActions>
      <Button variant="outlined" onClick={onClose}>
        Confirm
      </Button>
    </StyledDialogActions>
  </Dialog>
);

export default LoginDialog;
