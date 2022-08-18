import styled, { css } from 'styled-components';

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

const linkStyle = css`
  color: #fff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: #d9d0e3;
  }
`;

const ContactLink = styled.div`
  ${linkStyle}
  margin-right: 24px;
`;

const BlogLink = styled.a`
  ${linkStyle}
`;

const PortfolioView = () => (
  <MainWrapper>
    <Topbar>
      <Logo>Fabiano Brito</Logo>
      <Navigation>
        <ContactLink>Contact</ContactLink>
        <BlogLink href="https://medium.com/@fabianopb" target="_blank" rel="noopener noreferrer">
          Blog
        </BlogLink>
      </Navigation>
    </Topbar>
    <div>Banner</div>
    <div>About me</div>
    <div>Skills</div>
    <div>Selected Work</div>
    <div>Footer</div>
  </MainWrapper>
);

export default PortfolioView;
