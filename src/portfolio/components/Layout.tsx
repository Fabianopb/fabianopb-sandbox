import { Link } from '@mui/material';
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
  background-color: #17293a;
  color: #fff;
`;

const Logo = styled(RRDLink)`
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  text-decoration: none;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
`;

const ContactLink = styled.div`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BlogLink = styled(Link)`
  color: #fff;
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
        <Logo to="/portfolio">Fabiano Brito</Logo>
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
