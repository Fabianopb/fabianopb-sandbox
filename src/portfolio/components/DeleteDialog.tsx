import { DialogActions, DialogTitle, Dialog, Button } from '@mui/material';
import styled from 'styled-components';

type Props = {
  title: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const StyledDialogActions = styled(DialogActions)`
  padding: 8px 24px 24px;
`;

const StyledTitle = styled(DialogTitle)`
  color: #8e8f98;
`;

const DeleteDialog = ({ title, isOpen, isLoading, onClose, onDelete }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} disableEscapeKeyDown={isLoading}>
      <StyledTitle>{title}</StyledTitle>
      <StyledDialogActions>
        <Button type="submit" variant="outlined" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="error" onClick={onDelete} disabled={isLoading}>
          Confirm
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
