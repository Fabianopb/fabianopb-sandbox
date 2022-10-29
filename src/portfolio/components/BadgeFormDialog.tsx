import { DialogActions, DialogTitle, TextField, Dialog, DialogContent, Button, colors } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { addBadge, editBadge } from '../api';

type FormValues = { _id: string; name: string; imageSrc: string; href: string };

type Props = {
  defaultValues?: FormValues;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
};

const StyledDialogActions = styled(DialogActions)`
  padding: 8px 24px 24px;
`;

const StyledTitle = styled(DialogTitle)`
  color: ${colors.grey[800]};
`;

const StyledInput = styled(TextField).attrs({ fullWidth: true, variant: 'outlined', size: 'small' })`
  margin-top: 16px;
`;

const BadgeFormDialog = ({ defaultValues, isOpen, onClose, onSubmitSuccess }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({ defaultValues });

  useEffect(() => {
    reset(defaultValues || { name: '', imageSrc: '', href: '' });
  }, [defaultValues, reset]);

  const { mutate, isLoading } = useMutation(
    async (values: FormValues) => {
      const { _id: badgeId, ...payload } = values;
      if (defaultValues) {
        await editBadge(badgeId, payload);
      } else {
        await addBadge(payload);
      }
    },
    {
      onSuccess: () => {
        onSubmitSuccess();
        onClose();
      },
      onError: (error?: any) => {
        const message = error?.response?.data?.message || error?.message;
        toast(message || 'Unkown error!', { type: 'error' });
      },
    }
  );

  return (
    <Dialog open={isOpen} onClose={onClose} disableEscapeKeyDown={isLoading}>
      <StyledTitle>{defaultValues ? 'Edit badge' : 'Add badge'}</StyledTitle>
      <DialogContent>
        <form>
          <StyledInput label="Name" disabled={isLoading} defaultValue={defaultValues?.name} {...register('name')} />
          <StyledInput
            label="Image link"
            disabled={isLoading}
            defaultValue={defaultValues?.imageSrc}
            {...register('imageSrc')}
          />
          <StyledInput
            label="External link"
            disabled={isLoading}
            defaultValue={defaultValues?.href}
            {...register('href')}
          />
        </form>
      </DialogContent>
      <StyledDialogActions>
        <Button color="secondary" type="submit" variant="outlined" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit((values) => mutate(values))}
          disabled={isLoading}
        >
          Save
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
};

export default BadgeFormDialog;
