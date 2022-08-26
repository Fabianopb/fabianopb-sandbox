import styled from 'styled-components';

import twitterIcon from '../../assets/twitter.svg';
import linkedinIcon from '../../assets/linkedin.svg';
import githubIcon from '../../assets/github.svg';

const Root = styled.div`
  background-color: #284865;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const Email = styled.div`
  margin-top: 32px;
  font-size: 14px;
`;

const Social = styled.div`
  width: 280px;
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialIcon = styled.img`
  width: 48px;
  height: 48px;
`;

const Copyright = styled.div`
  margin-top: 32px;
  font-size: 12px;
`;

const Footer = () => (
  <Root>
    <Title>Get in touch!</Title>
    <Email>fabianopbrito@gmail.com</Email>
    <Social>
      <SocialIcon src={twitterIcon} />
      <SocialIcon src={linkedinIcon} />
      <SocialIcon src={githubIcon} />
    </Social>
    <Copyright>© 2016 Fabiano Brito. Developed using Ruby on Rails.</Copyright>
  </Root>
);

export default Footer;
