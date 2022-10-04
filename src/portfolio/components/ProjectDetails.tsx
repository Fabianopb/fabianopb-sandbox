import { Button, LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProjects } from '../../api';
import ProjectNavigation from './ProjectNavigation';

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

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetched } = useQuery(['portfolio', 'all-projects'], getProjects);

  const project = useMemo(() => data?.find((p) => p._id === id), [id, data]);

  console.log(project, isFetched);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  if (isFetched && !project) {
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
      {project && !isLoading && (
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
    </Root>
  );
};

export default ProjectDetails;
