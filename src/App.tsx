import { Link } from '@mui/material';
import { useRef } from 'react';
import { BrowserRouter, Routes, Route, Link as RRDLink, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import PortfolioView from './portfolio';
import Footer from './portfolio/components/Footer';
import ProjectDetails from './portfolio/components/ProjectDetails';

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

const App = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  return (
    <BrowserRouter>
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

      <Routes>
        <Route path="/" element={<Navigate to="/portfolio" replace />} />
        <Route path="/portfolio" element={<PortfolioView />} />
        <Route path="/portfolio/projects/:id" element={<ProjectDetails />} />
      </Routes>

      <FooterContainer ref={footerRef}>
        <Footer />
      </FooterContainer>
    </BrowserRouter>
  );
};

export default App;
