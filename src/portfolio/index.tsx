import { Button, Link } from '@mui/material';
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
  margin-right: 32px;
`;

const ProfileMotto = styled.div`
  font-size: 18px;
`;

const ProfileQuote = styled.div`
  margin-top: 24px;
  font-size: 18px;
  font-style: italic;
  text-align: right;
`;

const PortfolioView = () => (
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
          Software Engineer and Business Designer based in Helsinki. I develop real-time and responsive web-based apps.
          Some of my preferred tools at the moment are React, TypeScript, D3, Sass, Node, Express, Mongo, Gulp, Webpack.
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
            In order to have exciting experiences, to see different places, and to meet amazing people, you have to try
            and fail a lot.
          </ProfileMotto>
          <ProfileQuote>The journey is the destination.</ProfileQuote>
        </div>
      </AboutMeHeader>
    </Section>
    <div>Skills</div>
    <div>Selected Work</div>
    <div>Footer</div>
  </MainWrapper>
);

export default PortfolioView;
