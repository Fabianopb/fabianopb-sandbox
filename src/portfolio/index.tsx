import { Button, Divider, Link, Rating } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import bannerImageSrc from '../assets/banner.jpeg';
import profileImageSrc from '../assets/fabiano.jpeg';

const data02 = [
  {
    name: 'JavaScript',
    value: 100,
  },
  {
    name: 'ReactJS',
    value: 90,
  },
  {
    name: 'Git',
    value: 85,
  },
  {
    name: 'Ruby on Rails',
    value: 60,
  },
  {
    name: 'Angular JS',
    value: 55,
  },
  {
    name: 'PostgreSQL',
    value: 45,
  },
  {
    name: 'Java',
    value: 30,
  },
  {
    name: 'MongoDB',
    value: 30,
  },
  {
    name: 'Express JS',
    value: 25,
  },
  {
    name: 'Node JS',
    value: 15,
  },
];

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 32px;
  background-color: #17293a;
  color: #fff;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 400;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #fff;
  & + & {
    margin-left: 24px;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  position: relative;
  height: 560px;
  background-color: #17293a;
`;

const ImageOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.35;
`;

const BannerImage = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const BannerText = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #fff;
  text-align: center;
  z-index: 1;
`;

const BannerTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const BannerBody = styled.div`
  font-size: 24px;
  line-height: 1.4;
  margin-bottom: 32px;
`;

const BannerButton = styled(Button)`
  color: #fff;
  border-color: #fff;
  &:hover {
    border-color: #fff;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 24px auto;
`;

const StyledDivider = styled(Divider)`
  width: 800px;
  margin: 24px auto;
`;

const SectionTitle = styled.h1`
  font-size: 40px;
  color: #8e8f98;
  font-weight: 800;
  margin-bottom: 48px;
`;

const AboutMeHeader = styled.div`
  display: flex;
  margin: 0 40px;
`;

const ProfilePicture = styled.img`
  width: 240px;
  margin-right: 40px;
`;

const ProfileMotto = styled.div`
  margin-top: 16px;
  font-size: 18px;
  color: #555;
`;

const ProfileQuote = styled.div`
  position: relative;
  margin-top: 24px;
  font-size: 18px;
  font-style: italic;
  text-align: right;
  color: #555;
  ::before {
    content: '“';
    font-size: 36px;
  }
  ::after {
    content: '”';
  }
`;

const ProfileParagraph = styled.p`
  margin: 24px 40px 0 40px;
  color: #555;
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

const skills = [
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

const PortfolioView = () => {
  const [hasHoveredSkills, setHasHoveredSkills] = useState(false);
  const [activePieIndex, setActivePieIndex] = useState(0);

  return (
    <MainWrapper>
      <Topbar>
        <Logo>Fabiano Brito</Logo>
        <Navigation>
          <StyledLink href="#" underline="hover">
            Contact
          </StyledLink>
          <StyledLink href="https://medium.com/@fabianopb" target="_blank" rel="noopener noreferrer" underline="hover">
            Blog
          </StyledLink>
        </Navigation>
      </Topbar>
      <BannerContainer>
        <ImageOverlay>
          <BannerImage src={bannerImageSrc} />
        </ImageOverlay>

        <BannerText>
          <BannerTitle>Hey, I&apos;m Fabiano!</BannerTitle>
          <BannerBody>
            Software Engineer and Business Designer based in Helsinki. I develop real-time and responsive web-based
            apps. Some of my preferred tools at the moment are React, TypeScript, D3, Sass, Node, Express, Mongo, Gulp,
            Webpack.
            <br />
            <br />I have also side projects in RoR and native Android.
          </BannerBody>
          <BannerButton variant="outlined" size="large">
            Show me
          </BannerButton>
        </BannerText>
      </BannerContainer>

      <Section>
        <SectionTitle>About me</SectionTitle>
        <AboutMeHeader>
          <ProfilePicture src={profileImageSrc} />
          <div>
            <ProfileMotto>
              In order to have exciting experiences, to see different places, and to meet amazing people, you have to
              try and fail a lot.
            </ProfileMotto>
            <ProfileQuote>The journey is the destination.</ProfileQuote>
          </div>
        </AboutMeHeader>
        <ProfileParagraph>
          After graduating in Engineering in 2011, I started working with industrial facilities design, and after a
          couple of years, seeking for new challenges, I got involved with design-based approaches for innovation,
          start-ups and entrepreneurship. That&apos;s how I&apos;ve decided to get out of my comfort zone and ended up
          in Finland, in a Master Program of Business Design.
        </ProfileParagraph>
        <ProfileParagraph>
          During these past few years I got involved in mind-blowing experiences such as a business design case for
          water purification in Tanzania, a start-up that teaches kids computational thinking, ended up in a Hackathon
          in Tokyo, and spent a few months in Spain to start building a software team during a business expansion.
        </ProfileParagraph>
      </Section>

      <StyledDivider variant="middle" />

      <Section>
        <SectionTitle>Skills</SectionTitle>
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
          <SkillSubtitle>Toolset</SkillSubtitle>
          <ChartContainer>
            <RatingContainer>
              <RatingLabel>{data02[activePieIndex].name}</RatingLabel>
              <Rating value={data02[activePieIndex].value / 20} precision={0.5} size="small" />
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
                  data={data02}
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
        </SkillsContainer>
      </Section>

      <div>Selected Work</div>
      <div>Footer</div>
    </MainWrapper>
  );
};

export default PortfolioView;
