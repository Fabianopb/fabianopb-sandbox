import { TextField, RadioGroup, FormControlLabel, Radio, FormHelperText, Button } from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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
  color: #8e8f98;
  font-size: 40px;
  font-weight: 600;
`;

const StyledInput = styled(TextField)`
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

  const { register, handleSubmit } = useForm<FormValues>({ defaultValues });

  return (
    <form>
      <Title>{initialValues ? 'Edit project' : 'Add new project'}</Title>
      <RadioGroup defaultValue={defaultValues.category} {...register('category')}>
        <FormControlLabel value="Business Design" control={<Radio />} label="Business Design" />
        <FormControlLabel value="Software Development" control={<Radio />} label="Software Development" />
      </RadioGroup>
      <StyledInput
        label="Thumbnail link"
        fullWidth
        variant="outlined"
        size="small"
        disabled={isSubmitting}
        defaultValue={defaultValues.thumbnailSrc}
        {...register('thumbnailSrc')}
      />
      <StyledInput
        label="Title"
        fullWidth
        variant="outlined"
        size="small"
        disabled={isSubmitting}
        defaultValue={defaultValues.title}
        {...register('title')}
      />
      <StyledInput
        label="Subtitle"
        fullWidth
        variant="outlined"
        size="small"
        disabled={isSubmitting}
        defaultValue={defaultValues.subtitle}
        {...register('subtitle')}
      />
      <StyledInput
        label="Short description"
        fullWidth
        variant="outlined"
        size="small"
        multiline
        rows={2}
        disabled={isSubmitting}
        defaultValue={defaultValues.shortDescription}
        {...register('shortDescription')}
      />
      <StyledInput
        label="Date range"
        variant="outlined"
        size="small"
        disabled={isSubmitting}
        defaultValue={defaultValues.dateRange}
        {...register('dateRange')}
      />
      <FormBodyContainer>
        <ImageFieldsContainer>
          <StyledInput
            label="Image link 1"
            fullWidth
            variant="outlined"
            size="small"
            multiline
            rows={2}
            disabled={isSubmitting}
            defaultValue={defaultValues.image1}
            {...register('image1')}
          />
          <StyledInput
            label="Image link 2"
            fullWidth
            variant="outlined"
            size="small"
            multiline
            rows={2}
            disabled={isSubmitting}
            defaultValue={defaultValues.image2}
            {...register('image2')}
          />
        </ImageFieldsContainer>
        <DescriptionContainer>
          <StyledInput
            label="Long description"
            fullWidth
            variant="outlined"
            size="small"
            multiline
            rows={8}
            disabled={isSubmitting}
            defaultValue={defaultValues.longDescription}
            {...register('longDescription')}
          />
        </DescriptionContainer>
      </FormBodyContainer>
      <StyledInput
        label="Tags"
        fullWidth
        variant="outlined"
        size="small"
        disabled={isSubmitting}
        defaultValue={defaultValues.tags}
        {...register('tags')}
      />
      <FormHelperText>Tags will be split by using semicolons</FormHelperText>
      <StyledInput
        label="Video link"
        fullWidth
        variant="outlined"
        size="small"
        disabled={isSubmitting}
        defaultValue={defaultValues.videoLink}
        {...register('videoLink')}
      />
      <FormActions>
        <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          style={{ marginLeft: 16 }}
          variant="contained"
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
