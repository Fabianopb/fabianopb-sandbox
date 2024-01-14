import { colors } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProjectNavigation from './ProjectNavigation';
import { projects } from '../../data/projects';

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
  color: ${colors.grey[800]};
  font-size: 2.5rem;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  color: ${colors.grey[600]};
  font-size: 1.5rem;
  font-weight: 600;
`;

const ShortDescription = styled.h3`
  color: ${colors.grey[600]};
  font-weight: 300;
  font-size: 1.25rem;
`;

const Dates = styled.div`
  color: ${colors.grey[600]};
  font-size: 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
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
  @media (max-width: 768px) {
    max-width: initial;
  }
`;

const Text = styled.div`
  color: ${colors.grey[600]};
  font-size: 0.875rem;
  margin-left: 24px;
  a,
  a:hover,
  a:visited {
    color: ${colors.cyan[600]};
  }
  @media (max-width: 768px) {
    margin-top: 16px;
    margin-left: 0;
  }
`;

const TagCloud = styled.div`
  font-size: 2rem;
  line-height: 1.2;
  margin-top: 48px;
  color: ${colors.lightGreen[400]};
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

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleClickNextProject = () => {
    const currentProjectIndex = projects.findIndex((project) => project.id === id);
    const nextProjectIndex = currentProjectIndex < projects.length - 1 ? currentProjectIndex + 1 : 0;
    navigate(`/portfolio/projects/${projects[nextProjectIndex].id}`);
  };

  const handleClickPreviousProject = () => {
    const currentProjectIndex = projects.findIndex((project) => project.id === id);
    const nextProjectIndex = currentProjectIndex === 0 ? projects.length - 1 : currentProjectIndex - 1;
    navigate(`/portfolio/projects/${projects[nextProjectIndex].id}`);
  };

  return (
    <Root>
      {project && (
        <>
          <ProjectNavigation onClickPrevious={handleClickPreviousProject} onClickNext={handleClickNextProject} />
          <TitleContainer>
            <Title>{project.title}</Title>
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
    </Root>
  );
};

export default ProjectDetails;
