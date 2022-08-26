import { Link, Rating } from '@mui/material';
import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';
import styled, { css, keyframes } from 'styled-components';
import { badgesData, skillsData, toolsetData } from '../data';

const rotate = keyframes`
  0% { transform: rotateY(0deg) }
  100% { transform: rotateY(360deg); }
`;

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

const Badge = styled(Link)`
  height: 172px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BadgeName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #555;
`;

const BadgeImage = styled.img<{ shouldAnimate: boolean }>`
  margin-top: 8px;
  width: 140px;
  ${({ shouldAnimate }) =>
    shouldAnimate &&
    css`
      animation: ${rotate} 1000ms ease-in-out;
    `}
`;

const SkillsSection = () => {
  const [hasHoveredSkills, setHasHoveredSkills] = useState(false);
  const [activePieIndex, setActivePieIndex] = useState(0);
  const [animatingBadges, setAnimatingBadges] = useState<number[]>([]);

  const handleBadgeMouseEnter = async (index: number) => {
    if (animatingBadges.includes(index)) {
      return;
    }
    setAnimatingBadges((prev) => [...new Set([...prev, index])].sort());
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAnimatingBadges((prev) => prev.filter((badgeIndex) => badgeIndex !== index));
  };

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
        {badgesData.map((badge, index) => (
          <Badge key={badge.name} href={badge.href} underline="none" target="_blank" rel="noopener noreferrer">
            <BadgeName>{badge.name}</BadgeName>
            <BadgeImage
              src={badge.imageSrc}
              shouldAnimate={animatingBadges.includes(index)}
              onMouseEnter={() => handleBadgeMouseEnter(index)}
            />
          </Badge>
        ))}
      </BadgesContainer>
    </SkillsContainer>
  );
};

export default SkillsSection;
