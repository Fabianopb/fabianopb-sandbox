import { DialogActions, DialogTitle, TextField, Dialog, DialogContent, Button } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

type FormValues = { name: string; imageSrc: string; href: string };

type Props = {
  defaultValues?: FormValues;
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

const BadgeFormDialog = ({ defaultValues, isOpen, onClose }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({ defaultValues });

  useEffect(() => {
    reset(defaultValues || { name: '', imageSrc: '', href: '' });
  }, [defaultValues, reset]);

  const onSubmit = (values: FormValues) => console.log(values);

  const isLoading = false;

  return (
    <Dialog open={isOpen} onClose={onClose} disableEscapeKeyDown={isLoading}>
      <StyledTitle>{defaultValues ? 'Edit badge' : 'Add badge'}</StyledTitle>
      <DialogContent>
        <form>
          <StyledInput
            label="Name"
            fullWidth
            variant="outlined"
            size="small"
            disabled={isLoading}
            defaultValue={defaultValues?.name}
            {...register('name')}
          />
          <StyledInput
            label="Image link"
            fullWidth
            variant="outlined"
            size="small"
            disabled={isLoading}
            defaultValue={defaultValues?.imageSrc}
            {...register('imageSrc')}
          />
          <StyledInput
            label="External link"
            fullWidth
            variant="outlined"
            size="small"
            disabled={isLoading}
            defaultValue={defaultValues?.href}
            {...register('href')}
          />
        </form>
      </DialogContent>
      <StyledDialogActions>
        <Button type="submit" variant="outlined" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          Save
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
};

export default BadgeFormDialog;
