import { Button, Link } from '@mui/material';
import styled from 'styled-components';
import bannerImageSrc from '../assets/banner.jpeg';

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

    <div>About me</div>
    <div>Skills</div>
    <div>Selected Work</div>
    <div>Footer</div>
  </MainWrapper>
);

export default PortfolioView;
