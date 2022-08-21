import { Link } from '@mui/material';
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

const BannerOverlay = styled.div`
  position: relative;
  height: 560px;
  background-color: #17293a;
`;

const Banner = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.35;
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
    <BannerOverlay>
      <Banner src={bannerImageSrc} />
    </BannerOverlay>

    <div>About me</div>
    <div>Skills</div>
    <div>Selected Work</div>
    <div>Footer</div>
  </MainWrapper>
);

export default PortfolioView;
