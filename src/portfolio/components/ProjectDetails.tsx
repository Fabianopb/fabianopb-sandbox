import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { projectData } from '../data';
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

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectData.find((project) => project.readableId === id);

  if (!project) {
    return <div>redirect to 404</div>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleClickNextProject = () => {
    const currentProjectIndex = projectData.findIndex((project) => project.readableId === id);
    const nextProjectIndex = currentProjectIndex < projectData.length - 1 ? currentProjectIndex + 1 : 0;
    navigate(`/portfolio/projects/${projectData[nextProjectIndex].readableId}`);
  };

  const handleClickPreviousProject = () => {
    const currentProjectIndex = projectData.findIndex((project) => project.readableId === id);
    const nextProjectIndex = currentProjectIndex === 0 ? projectData.length - 1 : currentProjectIndex - 1;
    navigate(`/portfolio/projects/${projectData[nextProjectIndex].readableId}`);
  };

  return (
    <Root>
      <ProjectNavigation onClickPrevious={handleClickPreviousProject} onClickNext={handleClickNextProject} />
      <Title>{project.title}</Title>
      <Subtitle>{project.subtitle}</Subtitle>
      <ShortDescription>{project.shortDescription}</ShortDescription>
      <Dates>{project.dates}</Dates>
      <ContentWrapper>
        <ImagesContainer>
          {project.images.map((src) => (
            <Image key={src} src={src} />
          ))}
        </ImagesContainer>
        <Text dangerouslySetInnerHTML={{ __html: project.innerHtml }} />
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
    </Root>
  );
};

export default ProjectDetails;
