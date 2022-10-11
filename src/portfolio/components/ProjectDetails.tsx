import { Edit } from '@mui/icons-material';
import { Button, LinearProgress } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { addProject, editProject, getProjects } from '../../api';
import { isAdminAtom } from '../atoms';
import { Project } from '../types';
import ProjectDetailsForm, { FormValues } from './ProjectDetailsForm';
import ProjectNavigation from './ProjectNavigation';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  padding: 0 24px;
  margin: auto;
`;

const TitleContainer = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  color: #8e8f98;
  font-size: 40px;
  font-weight: 600;
`;

const EditIcon = styled(Edit)`
  margin-left: 16px;
  width: 20px;
  fill: #17293a;
  cursor: pointer;
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

export const ADD_PROJECT_ID = 'add-new';

const transformValuesToPayload = (values: FormValues): Omit<Project, '_id'> => ({
  title: values.title,
  subtitle: values.subtitle,
  shortDescription: values.shortDescription,
  dateRange: values.dateRange,
  images: [values.image1, values.image2],
  longDescription: values.longDescription,
  tags: values.tags.split(';').map((tag) => tag.trim()),
  category: values.category,
  thumbnailSrc: values.thumbnailSrc,
  videoLink: values.videoLink,
});

const transformProjectToForm = (project: Project): FormValues => ({
  title: project.title,
  subtitle: project.subtitle,
  shortDescription: project.shortDescription,
  dateRange: project.dateRange,
  image1: project.images[0],
  image2: project.images[1],
  longDescription: project.longDescription,
  tags: project.tags.join('; '),
  category: project.category,
  thumbnailSrc: project.thumbnailSrc,
  videoLink: project.videoLink,
});

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdmin] = useAtom(isAdminAtom);
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(id === ADD_PROJECT_ID && isAdmin);

  const { data, isLoading, isFetched, refetch } = useQuery(['portfolio', 'all-projects'], () =>
    id !== ADD_PROJECT_ID ? getProjects() : undefined
  );

  const project = useMemo(() => data?.find((p) => p._id === id), [id, data]);

  useEffect(() => {
    if (id === ADD_PROJECT_ID && isAdmin) {
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

  const initialValues = useMemo(() => (project ? transformProjectToForm(project) : undefined), [project]);

  const { mutate, isLoading: isSubmitting } = useMutation(
    async (values: FormValues) => {
      if (!id) {
        throw new Error('Project id not defined in the path, this should not happen!');
      }
      const payload = transformValuesToPayload(values);
      if (id === ADD_PROJECT_ID) {
        const newProjectId = await addProject(payload);
        await queryClient.invalidateQueries(['portfolio', 'all-projects']);
        navigate(`/portfolio/projects/${newProjectId}`);
        setIsEditing(false);
      } else {
        await editProject(id, payload);
        await refetch();
        setIsEditing(false);
      }
    },
    {
      onError: (error?: any) => {
        const message = error?.response?.data?.message || error?.message;
        toast(message || 'Unkown error!', { type: 'error' });
      },
    }
  );

  if ((isFetched && !project && id !== ADD_PROJECT_ID) || (id === ADD_PROJECT_ID && !isAdmin)) {
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
          <TitleContainer>
            <Title>{project.title}</Title>
            {isAdmin && <EditIcon onClick={() => setIsEditing(true)} />}
          </TitleContainer>
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
        <ProjectDetailsForm
          initialValues={initialValues}
          isSubmitting={isSubmitting}
          onCancel={() => setIsEditing(false)}
          onSubmit={mutate}
        />
      )}
    </Root>
  );
};

export default ProjectDetails;
