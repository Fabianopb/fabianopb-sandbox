import { QuestionMark } from '@mui/icons-material';
import { Button, FormControlLabel, LinearProgress, Radio, RadioGroup, TextField, Tooltip } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getProjects } from '../../api';
import { isAdminAtom } from '../atoms';
import ProjectNavigation from './ProjectNavigation';

type FormValues = {
  _id: string;
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

const Root = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  padding: 0 24px;
  margin: auto;
`;

const Title = styled.h1`
  color: #8e8f98;
  font-size: 40px;
  font-weight: 600;
  margin-top: 48px;
`;

const Subtitle = styled.h2`
  color: #555;
  font-size: 26px;
  font-weight: 600;
`;

const ShortDescription = styled.h3`
  color: #555;
  font-weight: 300;
  font-size: 20px;
`;

const Dates = styled.div`
  color: #555;
  font-size: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 32px;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  max-width: 480px;
  &:not(:first-child) {
    margin-top: 24px;
  }
`;

const Text = styled.div`
  color: #555;
  font-size: 14px;
  margin-left: 24px;
  a,
  a:hover,
  a:visited {
    color: #53b5cc;
  }
`;

const TagCloud = styled.div`
  font-size: 32px;
  line-height: 1.2;
  margin-top: 48px;
  color: #afc42f;
  & + & {
    margin-left: 12px;
  }
`;

const VideoContainer = styled.div`
  margin-top: 48px;
  position: relative;
  overflow: hidden;
  max-width: 900px;
  padding-bottom: 56.25%;
  height: 0;
`;

const YouTubeFrame = styled.iframe`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const NotFound = styled.div`
  margin: 96px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 48px;
`;

const StyledInput = styled(TextField)`
  margin-top: 16px;
`;

const FormBodyContainer = styled.div`
  display: flex;
`;

const TagFieldContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoIcon = styled(QuestionMark)`
  margin: 16px 8px 0 0;
  font-size: 16px;
`;

const TooltipText = styled.span`
  font-size: 14px;
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

const ADD_PROJECT = 'add-new';

const emptyValues: Omit<FormValues, '_id'> = {
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

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdmin] = useAtom(isAdminAtom);

  const [isEditing, setIsEditing] = useState(id === ADD_PROJECT && isAdmin);
  console.log(id, isAdmin);

  const { data, isLoading, isFetched } = useQuery(['portfolio', 'all-projects'], () =>
    id !== ADD_PROJECT ? getProjects() : undefined
  );

  const project = useMemo(() => data?.find((p) => p._id === id), [id, data]);

  useEffect(() => {
    if (id === ADD_PROJECT && isAdmin) {
      setIsEditing(true);
    }
    window.scrollTo(0, 0);
  }, [id, isAdmin]);

  const handleClickNextProject = () => {
    if (!data) {
      return;
    }
    const currentProjectIndex = data.findIndex((project) => project._id === id);
    const nextProjectIndex = currentProjectIndex < data.length - 1 ? currentProjectIndex + 1 : 0;
    navigate(`/portfolio/projects/${data[nextProjectIndex]._id}`);
  };

  const handleClickPreviousProject = () => {
    if (!data) {
      return;
    }
    const currentProjectIndex = data.findIndex((project) => project._id === id);
    const nextProjectIndex = currentProjectIndex === 0 ? data.length - 1 : currentProjectIndex - 1;
    navigate(`/portfolio/projects/${data[nextProjectIndex]._id}`);
  };

  const { register, handleSubmit /*, reset */ } = useForm<FormValues>({ defaultValues: emptyValues });

  const { mutate, isLoading: isSubmitting } = useMutation(
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
        // onSubmitSuccess();
        setIsEditing(false);
      },
      onError: (error?: any) => {
        const message = error?.response?.data?.message || error?.message;
        toast(message || 'Unkown error!', { type: 'error' });
      },
    }
  );

  if (isFetched && !project && id !== ADD_PROJECT) {
    return (
      <NotFound>
        <div style={{ marginBottom: 48 }}>Oops! Nothing to see here...</div>
        <iframe
          src="https://giphy.com/embed/C87IXdLfJ44Zq"
          width="480"
          height="205"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
        <p>
          <a href="https://giphy.com/gifs/comment-downvoted-deleting-C87IXdLfJ44Zq" />
        </p>
        <Button onClick={() => navigate('/portfolio')}>Back to home</Button>
      </NotFound>
    );
  }

  return (
    <Root>
      {isLoading && <LinearProgress />}
      {project && !isLoading && !isEditing && (
        <>
          <ProjectNavigation onClickPrevious={handleClickPreviousProject} onClickNext={handleClickNextProject} />
          <Title>{project.title}</Title>
          <Subtitle>{project.subtitle}</Subtitle>
          <ShortDescription>{project.shortDescription}</ShortDescription>
          <Dates>{project.dateRange}</Dates>
          <ContentWrapper>
            <ImagesContainer>
              {project.images.map((src) => (
                <Image key={src} src={src} />
              ))}
            </ImagesContainer>
            <Text dangerouslySetInnerHTML={{ __html: project.longDescription }} />
          </ContentWrapper>
          <TagCloud>{project.tags.join('  •  ')}</TagCloud>
          {project.videoLink && (
            <VideoContainer>
              <YouTubeFrame
                title="YouTube video player"
                width="560"
                height="315"
                src={project.videoLink}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoContainer>
          )}
          <ProjectNavigation onClickPrevious={handleClickPreviousProject} onClickNext={handleClickNextProject} />
        </>
      )}
      {isEditing && (
        <form>
          <Title>Add new project</Title>
          <RadioGroup defaultValue={emptyValues.category} {...register('category')}>
            <FormControlLabel value="Business Design" control={<Radio />} label="Business Design" />
            <FormControlLabel value="Software Development" control={<Radio />} label="Software Development" />
          </RadioGroup>
          <StyledInput
            label="Thumbnail link"
            fullWidth
            variant="outlined"
            size="small"
            disabled={isSubmitting}
            defaultValue={emptyValues.thumbnailSrc}
            {...register('thumbnailSrc')}
          />
          <StyledInput
            label="Title"
            fullWidth
            variant="outlined"
            size="small"
            disabled={isSubmitting}
            defaultValue={emptyValues.title}
            {...register('title')}
          />
          <StyledInput
            label="Subtitle"
            fullWidth
            variant="outlined"
            size="small"
            disabled={isSubmitting}
            defaultValue={emptyValues.subtitle}
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
            defaultValue={emptyValues.shortDescription}
            {...register('shortDescription')}
          />
          <StyledInput
            label="Date range"
            variant="outlined"
            size="small"
            disabled={isSubmitting}
            defaultValue={emptyValues.dateRange}
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
                defaultValue={emptyValues.image1}
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
                defaultValue={emptyValues.image2}
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
                defaultValue={emptyValues.longDescription}
                {...register('longDescription')}
              />
            </DescriptionContainer>
          </FormBodyContainer>
          <TagFieldContainer>
            <Tooltip placement="top-start" title={<TooltipText>Separate tags using semicolons</TooltipText>}>
              <InfoIcon fontSize="small" />
            </Tooltip>
            <StyledInput
              label="Tags"
              fullWidth
              variant="outlined"
              size="small"
              disabled={isSubmitting}
              defaultValue={emptyValues.tags}
              {...register('tags')}
            />
          </TagFieldContainer>
          <StyledInput
            label="Video link"
            fullWidth
            variant="outlined"
            size="small"
            disabled={isSubmitting}
            defaultValue={emptyValues.videoLink}
            {...register('videoLink')}
          />
          <FormActions>
            <Button type="submit" variant="outlined" onClick={() => {}} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              style={{ marginLeft: 16 }}
              type="submit"
              variant="contained"
              onClick={handleSubmit((values) => mutate(values))}
              disabled={isLoading}
            >
              Save
            </Button>
          </FormActions>
        </form>
      )}
    </Root>
  );
};

export default ProjectDetails;
