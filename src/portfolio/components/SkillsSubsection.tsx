import { colors } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { Skill } from '../types';

type Props = {
  skills: Skill[];
};

const SkillsContainer = styled.div`
  width: 600px;
  margin: auto;
  @media (max-width: 768px) {
    width: initial;
    margin: 12px 8px;
  }
`;

const SkillsHeader = styled.div`
  display: flex;
  font-weight: bold;
`;

const SkillLevel = styled.div`
  flex: 1;
  text-align: center;
  font-size: 0.75rem;
  color: ${colors.grey[600]};
`;

const SkillBar = styled.div<{ value: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 8px;
  width: 100%;
  background-color: ${colors.blueGrey[100]};
  height: 24px;
  border-radius: 4px;
  ::after {
    position: absolute;
    display: block;
    content: '';
    background-color: ${colors.teal[900]};
    height: 100%;
    width: ${({ value }) => `${value}%`};
    left: 0;
    top: 0;
    border-radius: 4px;
    transition: width 1000ms ease-in-out;
  }
`;

const SkillBarValue = styled.div`
  position: relative;
  color: white;
  z-index: 1;
`;

const SkillsSubsection = ({ skills }: Props) => {
  const [hasHoveredSkills, setHasHoveredSkills] = useState(false);

  return (
    <SkillsContainer onMouseOver={() => (!hasHoveredSkills ? setHasHoveredSkills(true) : undefined)}>
      <SkillsHeader>
        <SkillLevel>BEGINNER</SkillLevel>
        <SkillLevel>PROFICIENT</SkillLevel>
        <SkillLevel>EXPERT</SkillLevel>
      </SkillsHeader>
      {skills.map((skill) => (
        <SkillBar key={skill.name} value={hasHoveredSkills ? skill.value : 0}>
          <SkillBarValue>{skill.name}</SkillBarValue>
          <SkillBarValue>{skill.value}%</SkillBarValue>
        </SkillBar>
      ))}
    </SkillsContainer>
  );
};

export default SkillsSubsection;
