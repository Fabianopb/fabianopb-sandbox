import { TextField, RadioGroup, FormControlLabel, Radio, FormHelperText, Button, colors } from '@mui/material';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

import 'react-quill/dist/quill.snow.css';

export type FormValues = {
  title: string;
  subtitle: string;
  shortDescription: string;
  dateRange: string;
  image1: string;
  image2: string;
  longDescription: string;
  tags: string;
  category: string;
  thumbnailSrc: string;
  videoLink?: string;
};

type Props = {
  initialValues?: FormValues;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValues) => void;
};

const Title = styled.h1`
  color: ${colors.grey[600]};
  font-size: 2.5rem;
  font-weight: 600;
`;

const StyledInput = styled(TextField).attrs({ variant: 'outlined', size: 'small' })`
  margin-top: 16px;
`;

const FormBodyContainer = styled.div`
  display: flex;
`;

const ImageFieldsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DescriptionContainer = styled.div`
  flex: 1;
  margin-left: 16px;
`;

const StyledQuill = styled(ReactQuill)`
  margin-top: 16px;
  .ql-toolbar.ql-snow {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .ql-container.ql-snow {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    min-height: 100px;
    max-height: 280px;
    overflow: auto;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`;

const emptyValues: FormValues = {
  title: '',
  subtitle: '',
  shortDescription: '',
  dateRange: '',
  image1: '',
  image2: '',
  longDescription: '',
  tags: '',
  category: 'Business Design',
  thumbnailSrc: '',
  videoLink: '',
};

const ProjectDetailsForm = ({ initialValues, isSubmitting, onCancel, onSubmit }: Props) => {
  const defaultValues = useMemo(() => initialValues || emptyValues, [initialValues]);

  const { register, handleSubmit, control, setValue } = useForm<FormValues>({ defaultValues });

  return (
    <form>
      <Title>{initialValues ? 'Edit project' : 'Add new project'}</Title>
      <Controller
        name="category"
        control={control}
        defaultValue={defaultValues.category}
        render={({ field }) => (
          <RadioGroup {...field}>
            <FormControlLabel value="Business Design" control={<Radio />} label="Business Design" />
            <FormControlLabel value="Software Development" control={<Radio />} label="Software Development" />
          </RadioGroup>
        )}
      />
      <StyledInput
        label="Thumbnail link"
        fullWidth
        disabled={isSubmitting}
        defaultValue={defaultValues.thumbnailSrc}
        {...register('thumbnailSrc')}
      />
      <StyledInput
        label="Title"
        fullWidth
        disabled={isSubmitting}
        defaultValue={defaultValues.title}
        {...register('title')}
      />
      <StyledInput
        label="Subtitle"
        fullWidth
        disabled={isSubmitting}
        defaultValue={defaultValues.subtitle}
        {...register('subtitle')}
      />
      <StyledInput
        label="Short description"
        fullWidth
        multiline
        rows={2}
        disabled={isSubmitting}
        defaultValue={defaultValues.shortDescription}
        {...register('shortDescription')}
      />
      <StyledInput
        label="Date range"
        disabled={isSubmitting}
        defaultValue={defaultValues.dateRange}
        {...register('dateRange')}
      />
      <FormBodyContainer>
        <ImageFieldsContainer>
          <StyledInput
            label="Image link 1"
            fullWidth
            multiline
            rows={2}
            disabled={isSubmitting}
            defaultValue={defaultValues.image1}
            {...register('image1')}
          />
          <StyledInput
            label="Image link 2"
            fullWidth
            multiline
            rows={2}
            disabled={isSubmitting}
            defaultValue={defaultValues.image2}
            {...register('image2')}
          />
        </ImageFieldsContainer>
        <DescriptionContainer>
          <StyledQuill
            theme="snow"
            defaultValue={defaultValues.longDescription}
            onChange={(value) => setValue('longDescription', value)}
          />
        </DescriptionContainer>
      </FormBodyContainer>
      <StyledInput
        label="Tags"
        fullWidth
        disabled={isSubmitting}
        defaultValue={defaultValues.tags}
        {...register('tags')}
      />
      <FormHelperText>Tags will be split by using semicolons</FormHelperText>
      <StyledInput
        label="Video link"
        fullWidth
        disabled={isSubmitting}
        defaultValue={defaultValues.videoLink}
        {...register('videoLink')}
      />
      <FormActions>
        <Button color="secondary" variant="outlined" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          style={{ marginLeft: 16 }}
          variant="contained"
          color="primary"
          onClick={handleSubmit((values) => onSubmit(values))}
          disabled={isSubmitting}
        >
          Save
        </Button>
      </FormActions>
    </form>
  );
};

export default ProjectDetailsForm;
