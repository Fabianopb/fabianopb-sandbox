import { Link } from '@mui/material';
import { BrowserRouter, Routes, Route, Link as RRDLink } from 'react-router-dom';
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

const StyledLink = styled(Link)`
  color: #fff;
  & + & {
    margin-left: 24px;
  }
`;

const StyledFooter = styled(Footer)`
  margin-top: 48px;
`;

const App = () => (
  <BrowserRouter>
    <Topbar>
      <Logo to="/">Fabiano Brito</Logo>
      <Navigation>
        <StyledLink href="#" underline="hover">
          Contact
        </StyledLink>
        <StyledLink href="https://medium.com/@fabianopb" target="_blank" rel="noopener noreferrer" underline="hover">
          Blog
        </StyledLink>
      </Navigation>
    </Topbar>

    <Routes>
      <Route path="/" element={<PortfolioView />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
    </Routes>

    <StyledFooter />
  </BrowserRouter>
);

export default App;
