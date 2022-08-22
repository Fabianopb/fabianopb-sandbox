import { Button, Divider, Link } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import bannerImageSrc from '../assets/banner.jpeg';
import profileImageSrc from '../assets/fabiano.jpeg';

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
        </SkillsContainer>
      </Section>

      <div>Selected Work</div>
      <div>Footer</div>
    </MainWrapper>
  );
};

export default PortfolioView;
