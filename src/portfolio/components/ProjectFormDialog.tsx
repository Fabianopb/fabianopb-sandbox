import { DialogActions, DialogTitle, Dialog, DialogContent, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';

type FormValues = {
  _id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  dateRange: string;
  images: string[];
  longDescription: string;
  tags: string[];
  category: string;
  thumbnailSrc: string;
  videoLink?: string;
};

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
  color: #8e8f98;
`;

// const StyledInput = styled(TextField)`
//   margin-top: 16px;
// `;

const emptyValues: Omit<FormValues, '_id'> = {
  title: '',
  subtitle: '',
  shortDescription: '',
  dateRange: '',
  images: [],
  longDescription: '',
  tags: [],
  category: '',
  thumbnailSrc: '',
  videoLink: '',
};

const ProjectFormDialog = ({ defaultValues, isOpen, onClose, onSubmitSuccess }: Props) => {
  const { handleSubmit, reset } = useForm<FormValues>({ defaultValues });

  useEffect(() => {
    reset(defaultValues || emptyValues);
  }, [defaultValues, reset]);

  const { mutate, isLoading } = useMutation(
    async (values: FormValues) => {
      console.log(values);
      // const { _id: badgeId, ...payload } = values;
      // if (defaultValues) {
      //   await editBadge(badgeId, payload);
      // } else {
      //   await addBadge(payload);
      // }
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
      <StyledTitle>{defaultValues ? 'Edit project' : 'Add project'}</StyledTitle>
      <DialogContent>
        <form>
          {/* <StyledInput
            label="Name"
            fullWidth
            variant="outlined"
            size="small"
            disabled={isLoading}
            defaultValue={defaultValues?.name}
            {...register('name')}
          /> */}
        </form>
      </DialogContent>
      <StyledDialogActions>
        <Button type="submit" variant="outlined" onClick={onClose} disabled={isLoading}>
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

export default ProjectFormDialog;
