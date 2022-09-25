import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginDialog = ({ isOpen, onClose }: Props) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>Login</DialogTitle>
    <DialogContent>
      <TextField label="Username" fullWidth variant="outlined" size="small" />
      <TextField label="Password" type="password" fullWidth variant="outlined" size="small" />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onClose}>Confirm</Button>
    </DialogActions>
  </Dialog>
);

export default LoginDialog;
