import { colors } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { projects } from '../../data/projects';

type Props = {
  className?: string;
};

const WorkContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 800px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 600px) {
    grid-template-columns: auto;
  }
`;

const WorkCell = styled(Link)`
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0 auto 16px auto;
`;

const WorkImage = styled.img``;

const ImageText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background-color: ${colors.grey[600]};
  opacity: 0;
  transition: opacity 500ms ease-in-out;
  :hover {
    opacity: 0.9;
  }
`;

const WorkTag = styled.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
  background-color: ${colors.orange[100]};
  color: ${colors.grey[600]};
  padding: 0 8px 0 18px;
  font-size: 0.875rem;
  border-radius: 12px;
  :after {
    content: '';
    display: block;
    position: absolute;
    left: 8px;
    top: 9px;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: ${colors.orange.A700};
  }
`;

const WorkSection = ({ className }: Props) => {
  return (
    <WorkContainer className={className}>
      {projects.map((work) => (
        <WorkCell key={work.id} to={`/portfolio/projects/${work.id}`}>
          <WorkImage src={work.thumbnailSrc} />
          <ImageText>{work.title}</ImageText>
          <WorkTag>{work.category}</WorkTag>
        </WorkCell>
      ))}
    </WorkContainer>
  );
};

export default WorkSection;
