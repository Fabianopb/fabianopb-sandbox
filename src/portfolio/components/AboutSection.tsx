import { colors } from '@mui/material';
import styled from 'styled-components';
import profileImageSrc from '../../assets/fabiano.jpeg';

const AboutMeHeader = styled.div`
  display: flex;
  margin: 0 40px;
`;

const ProfilePicture = styled.img`
  width: 240px;
  margin-right: 40px;
`;

const ProfileMotto = styled.div`
  margin-top: 16px;
  font-size: 1.2rem;
  color: ${colors.grey[600]};
`;

const ProfileQuote = styled.div`
  position: relative;
  margin-top: 24px;
  font-size: 1.2rem;
  font-style: italic;
  text-align: right;
  color: ${colors.grey[600]};
  ::before {
    content: '“';
    font-size: 2.25rem;
  }
  ::after {
    content: '”';
  }
`;

const ProfileParagraph = styled.p`
  margin: 24px 40px 0 40px;
  color: ${colors.grey[600]};
`;

const AboutSection = () => (
  <>
    <AboutMeHeader>
      <ProfilePicture src={profileImageSrc} />
      <div>
        <ProfileMotto>
          In order to have exciting experiences, to see different places, and to meet amazing people, you have to try
          and fail a lot.
        </ProfileMotto>
        <ProfileQuote>The journey is the destination.</ProfileQuote>
      </div>
    </AboutMeHeader>
    <ProfileParagraph>
      After graduating in Engineering in 2011, I started working with industrial facilities design, and after a couple
      of years, seeking for new challenges, I got involved with design-based approaches for innovation, start-ups and
      entrepreneurship. That&apos;s how I&apos;ve decided to get out of my comfort zone and ended up in Finland, in a
      Master Program of Business Design.
    </ProfileParagraph>
    <ProfileParagraph>
      During these past few years I got involved in mind-blowing experiences such as a business design case for water
      purification in Tanzania, a start-up that teaches kids computational thinking, ended up in a Hackathon in Tokyo,
      and spent a few months in Spain to start building a software team during a business expansion.
    </ProfileParagraph>
  </>
);

export default AboutSection;
