import { Logout } from '@mui/icons-material';
import { colors, Link } from '@mui/material';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { Outlet, Link as RRDLink } from 'react-router-dom';
import styled from 'styled-components';
import { isAdminAtom } from '../atoms';
import { clearSession } from '../../common/session';
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

const AdminWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Admin = styled.div`
  font-size: 0.75rem;
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
            <AdminWrapper>
              <Admin>Admin session</Admin>
              <LogoutIcon
                onClick={() => {
                  clearSession();
                  setIsAdmin(false);
                }}
              />
            </AdminWrapper>
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
