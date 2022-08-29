import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { workData } from '../data';

const WorkContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const WorkCell = styled(Link)`
  position: relative;
  width: 250px;
  height: 250px;
  margin-bottom: 16px;
`;

const WorkImage = styled.img``;

const ImageText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  background-color: #555;
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
  background-color: #fcfbe3;
  color: #555;
  padding: 0 8px 0 18px;
  font-size: 14px;
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
    background-color: #cfcd7d;
  }
`;

const WorkSection = () => (
  <WorkContainer>
    {workData.map((work) => (
      <WorkCell key={work.title} to={`/portfolio/projects/${work.readableId}`}>
        <WorkImage src={work.src} />
        <ImageText>{work.title}</ImageText>
        <WorkTag>{work.tag}</WorkTag>
      </WorkCell>
    ))}
  </WorkContainer>
);

export default WorkSection;
