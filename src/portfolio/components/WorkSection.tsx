import styled from 'styled-components';
import { workData } from '../data';

const WorkContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const WorkCell = styled.div`
  width: 250px;
  height: 250px;
  margin-bottom: 16px;
`;

const WorkImage = styled.img``;

const WorkSection = () => (
  <WorkContainer>
    {workData.map((work) => (
      <WorkCell key={work.title}>
        <WorkImage src={work.src} />
      </WorkCell>
    ))}
  </WorkContainer>
);

export default WorkSection;
