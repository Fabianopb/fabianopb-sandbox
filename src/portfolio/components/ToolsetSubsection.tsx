import { colors, Rating } from '@mui/material';
import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';
import styled from 'styled-components';
import { Skill } from '../types';

type Props = {
  toolset: Skill[];
};

const ToolsetContainer = styled.div`
  width: 600px;
  margin: auto;
  @media (max-width: 768px) {
    width: initial;
    margin: 12px 8px;
  }
`;

const Header = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: ${colors.grey[600]};
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
  font-size: 0.75rem;
  color: ${colors.grey[600]};
`;

const ToolsetSubsection = ({ toolset }: Props) => {
  const [activePieIndex, setActivePieIndex] = useState(0);

  return (
    <ToolsetContainer>
      <Header>
        <Subtitle>Toolset</Subtitle>
      </Header>
      {toolset.length > 0 && (
        <ChartContainer>
          <RatingContainer>
            <RatingLabel>{toolset[activePieIndex].name}</RatingLabel>
            <Rating value={toolset[activePieIndex].value / 20} precision={0.5} size="small" />
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
                        fill={colors.teal.A200}
                      />
                    </>
                  );
                }}
                data={toolset}
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
                fill={colors.teal.A700}
                onMouseEnter={(_, index) => setActivePieIndex(index)}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </ToolsetContainer>
  );
};

export default ToolsetSubsection;
