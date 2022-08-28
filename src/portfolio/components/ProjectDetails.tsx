import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { projectData } from '../data';

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

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projectData.find((project) => project.readableId === id);
  if (!project) {
    return <div>redirect to 404</div>;
  }
  return (
    <Root>
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
        <Text>{project.innerHtml}</Text>
      </ContentWrapper>
      <TagCloud>{project.tags.join('  •  ')}</TagCloud>
    </Root>
  );
};

export default ProjectDetails;
