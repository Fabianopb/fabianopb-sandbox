import { Rating } from '@mui/material';
import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';
import styled from 'styled-components';

import codeSchool01 from '../../assets/codeSchool01.png';
import codeSchool02 from '../../assets/codeSchool02.png';
import codeSchool03 from '../../assets/codeSchool03.png';
import codeSchool04 from '../../assets/codeSchool04.png';
import codeSchool05 from '../../assets/codeSchool05.png';
import codeSchool06 from '../../assets/codeSchool06.png';
import codeSchool07 from '../../assets/codeSchool07.png';
import codeSchool08 from '../../assets/codeSchool08.png';
import codeSchool09 from '../../assets/codeSchool09.png';
import codeSchool10 from '../../assets/codeSchool10.png';
import codeSchool11 from '../../assets/codeSchool11.png';
import codeSchool12 from '../../assets/codeSchool12.png';
import codeSchool13 from '../../assets/codeSchool13.png';
import codeSchool14 from '../../assets/codeSchool14.png';
import codeSchool15 from '../../assets/codeSchool15.png';
import codeSchool16 from '../../assets/codeSchool16.png';
import codeSchool17 from '../../assets/codeSchool17.png';

const skillsData = [
  { name: 'Problem solving', value: 100 },
  { name: 'Programming', value: 95 },
  { name: 'Innovation management', value: 90 },
  { name: 'Project management', value: 85 },
  { name: 'Marketing', value: 80 },
  { name: 'Facilitation', value: 75 },
  { name: 'Business strategy', value: 65 },
  { name: 'UI/UX design', value: 60 },
  { name: 'Data analytics', value: 55 },
  { name: 'Adobe Ps, Ai & In', value: 40 },
];

const toolsetData = [
  { name: 'JavaScript', value: 100 },
  { name: 'ReactJS', value: 90 },
  { name: 'Git', value: 85 },
  { name: 'Ruby on Rails', value: 60 },
  { name: 'Angular JS', value: 55 },
  { name: 'PostgreSQL', value: 45 },
  { name: 'Java', value: 30 },
  { name: 'MongoDB', value: 30 },
  { name: 'Express JS', value: 25 },
  { name: 'Node JS', value: 15 },
];

const badgesData = [
  { name: 'JavaScript Road Trip #1', imageSrc: codeSchool01 },
  { name: 'JavaScript Road Trip #2', imageSrc: codeSchool02 },
  { name: 'JavaScript Road Trip #3', imageSrc: codeSchool03 },
  { name: 'JavaScript Best Practices', imageSrc: codeSchool04 },
  { name: 'Shaping up with Angular.js', imageSrc: codeSchool05 },
  { name: 'Staying Sharp with Angular.js', imageSrc: codeSchool06 },
  { name: 'Accelerating Through Angular 2', imageSrc: codeSchool07 },
  { name: 'Real-time Web with Node.js', imageSrc: codeSchool08 },
  { name: 'The Magical Marvels of MongoDB', imageSrc: codeSchool09 },
  { name: 'Powering Up with React', imageSrc: codeSchool10 },
  { name: 'ES2015: The Shape of JavaScript to Come', imageSrc: codeSchool11 },
  { name: 'Try jQuery', imageSrc: codeSchool12 },
  { name: 'jQuery: The Return Flight', imageSrc: codeSchool13 },
  { name: 'CSS Cross-Country', imageSrc: codeSchool14 },
  { name: 'Cracking the Case With Flexbox', imageSrc: codeSchool15 },
  { name: 'Building Blocks of Express.js', imageSrc: codeSchool16 },
  { name: 'Try Android', imageSrc: codeSchool17 },
];

const SkillsContainer = styled.div`
  width: 600px;
  margin: auto;
`;

const SkillsHeader = styled.div`
  display: flex;
  font-weight: bold;
`;

const SkillLevel = styled.div`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #555;
  &:not(:last-child) {
    border-right: 1px solid #555;
  }
`;

const SkillBar = styled.div<{ value: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 8px;
  width: 100%;
  background-color: #d1d0d7;
  height: 24px;
  border-radius: 4px;
  ::after {
    position: absolute;
    display: block;
    content: '';
    background-color: #17293a;
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
  color: #fff;
  z-index: 1;
`;

const SkillSubtitle = styled.h2`
  margin-top: 48px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #555;
`;

const ChartContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RatingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RatingLabel = styled.div`
  font-size: 12px;
  color: #555;
`;

const BadgesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const Badge = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BadgeName = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

const BadgeImage = styled.img`
  margin-top: 8px;
  width: 160px;
`;

const SkillsSection = () => {
  const [hasHoveredSkills, setHasHoveredSkills] = useState(false);
  const [activePieIndex, setActivePieIndex] = useState(0);

  return (
    <SkillsContainer onMouseOver={() => (!hasHoveredSkills ? setHasHoveredSkills(true) : undefined)}>
      <SkillsHeader>
        <SkillLevel>BEGINNER</SkillLevel>
        <SkillLevel>PROFICIENT</SkillLevel>
        <SkillLevel>EXPERT</SkillLevel>
      </SkillsHeader>
      {skillsData.map((skill) => (
        <SkillBar key={skill.name} value={hasHoveredSkills ? skill.value : 0}>
          <SkillBarValue>{skill.name}</SkillBarValue>
          <SkillBarValue>{skill.value}%</SkillBarValue>
        </SkillBar>
      ))}
      <SkillSubtitle>Toolset</SkillSubtitle>
      <ChartContainer>
        <RatingContainer>
          <RatingLabel>{toolsetData[activePieIndex].name}</RatingLabel>
          <Rating value={toolsetData[activePieIndex].value / 20} precision={0.5} size="small" />
        </RatingContainer>
        <ResponsiveContainer height={400}>
          <PieChart>
            <Pie
              activeIndex={activePieIndex}
              activeShape={(props: any) => {
                const { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = props;
                return (
                  <>
                    <Sector
                      cx={cx}
                      cy={cy}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      fill="#00998a"
                    />
                  </>
                );
              }}
              data={toolsetData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              label={(props: any) => {
                const RADIAN = Math.PI / 180;
                const { cx, cy, midAngle, outerRadius, fill, name } = props;
                const sin = Math.sin(-RADIAN * midAngle);
                const cos = Math.cos(-RADIAN * midAngle);
                const sx = cx + (outerRadius + 10) * cos;
                const sy = cy + (outerRadius + 10) * sin;
                const mx = cx + (outerRadius + 30) * cos;
                const my = cy + (outerRadius + 30) * sin;
                const ex = mx + (cos >= 0 ? 1 : -1) * 22;
                const ey = my;
                const textAnchor = cos >= 0 ? 'start' : 'end';
                return (
                  <g>
                    <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                    <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#555">
                      {name}
                    </text>
                  </g>
                );
              }}
              fill="#00d6c1"
              onMouseEnter={(_, index) => setActivePieIndex(index)}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <SkillSubtitle>Code school badges</SkillSubtitle>
      <BadgesContainer>
        {badgesData.map((badge) => (
          <Badge key={badge.name}>
            <BadgeName>{badge.name}</BadgeName>
            <BadgeImage src={badge.imageSrc} />
          </Badge>
        ))}
      </BadgesContainer>
    </SkillsContainer>
  );
};

export default SkillsSection;
