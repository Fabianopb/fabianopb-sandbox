import { Logout } from '@mui/icons-material';
import { colors, Link } from '@mui/material';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { Outlet, Link as RRDLink } from 'react-router-dom';
import styled from 'styled-components';
import { isAdminAtom } from '../atoms';
import { clearSession } from '../utils';
import Footer from './Footer';
import LoginDialog from './LoginDialog';

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
  align-items: center; ;
`;

const Logo = styled(RRDLink)`
  font-size: 24px;
  font-weight: 400;
  color: white;
  text-decoration: none;
`;

const Admin = styled.div`
  margin-left: 24px;
  font-size: 12px;
  font-style: italic;
  color: ${colors.cyan[500]};
`;

const LogoutIcon = styled(Logout)`
  margin-left: 12px;
  width: 18px;
  fill: ${colors.cyan[500]};
  cursor: pointer;
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
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  return (
    <>
      <Topbar>
        <LeftContent>
          <Logo to="/portfolio">Fabiano Brito</Logo>
          {isAdmin && (
            <>
              <Admin>Admin session</Admin>
              <LogoutIcon
                onClick={() => {
                  clearSession();
                  setIsAdmin(false);
                }}
              />
            </>
          )}
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

      <LoginDialog />
    </>
  );
};

export default Layout;
