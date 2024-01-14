import { colors, Link } from '@mui/material';
import { useRef } from 'react';
import { Outlet, Link as RRDLink } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 32px;
  background-color: ${colors.blueGrey[900]};
  color: white;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled(RRDLink)`
  font-size: 1.5rem;
  font-weight: 400;
  margin-right: 24px;
  color: white;
  text-decoration: none;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
`;

const ContactLink = styled.div`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BlogLink = styled(Link)`
  color: white;
  margin-left: 24px;
`;

const FooterContainer = styled.div`
  margin-top: 48px;
`;

const Layout = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Topbar>
        <LeftContent>
          <Logo to="/portfolio">Fabiano Brito</Logo>
        </LeftContent>
        <Navigation>
          <ContactLink onClick={() => footerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
            Contact
          </ContactLink>
          <BlogLink href="https://medium.com/@fabianopb" target="_blank" rel="noopener noreferrer" underline="hover">
            Blog
          </BlogLink>
        </Navigation>
      </Topbar>

      <Outlet />

      <FooterContainer ref={footerRef}>
        <Footer />
      </FooterContainer>
    </>
  );
};

export default Layout;
