import { Button, Divider, LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StringParam, useQueryParam } from 'use-query-params';
import { useAtom } from 'jotai';
import { getSkills } from '../api';
import bannerImageSrc from '../assets/banner.jpeg';
import AboutSection from './components/AboutSection';
import LoginDialog from './components/LoginDialog';
import SkillsSection from './components/SkillsSection';
import WorkSection from './components/WorkSection';
import { isSessionValid } from './utils';
import { isAdminAtom } from './atoms';
import { Edit } from '@mui/icons-material';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BannerContainer = styled.div`
  display: flex;
  position: relative;
  height: 560px;
  background-color: #17293a;
`;

const ImageOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.35;
`;

const BannerImage = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const BannerText = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #fff;
  text-align: center;
  z-index: 1;
`;

const BannerTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const BannerBody = styled.div`
  font-size: 24px;
  line-height: 1.4;
  margin-bottom: 32px;
`;

const BannerButton = styled(Button)`
  color: #fff;
  border-color: #fff;
  &:hover {
    border-color: #fff;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 24px auto;
`;

const StyledDivider = styled(Divider)`
  width: 800px;
  margin: 24px auto;
`;

const SectionTitle = styled.h1`
  font-size: 40px;
  color: #8e8f98;
  font-weight: 800;
  margin-bottom: 48px;
`;

const EditIcon = styled(Edit)`
  margin-left: 16px;
  width: 20px;
  fill: #17293a;
  cursor: pointer;
`;

const PortfolioView = () => {
  const workSectionRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useQueryParam('mode', StringParam);

  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(true);

  const {
    data: skillsData,
    isLoading: loadingSkills,
    refetch: refetchSkills,
  } = useQuery(['portfolio', 'skills'], getSkills);

  useEffect(() => {
    if (mode === 'admin' && !isSessionValid()) {
      setIsModalOpen(true);
    }
    if (mode === 'admin' && isSessionValid()) {
      setIsAdmin(true);
    }
    if (!mode) {
      setIsEditingSkills(false);
    }
  }, [mode]);

  return (
    <MainWrapper>
      <BannerContainer>
        <ImageOverlay>
          <BannerImage src={bannerImageSrc} />
        </ImageOverlay>

        <BannerText>
          <BannerTitle>Hey, I&apos;m Fabiano!</BannerTitle>
          <BannerBody>
            Software Engineer and Business Designer based in Helsinki. I develop real-time and responsive web-based
            apps. Some of my preferred tools at the moment are React, TypeScript, D3, Sass, Node, Express, Mongo, Gulp,
            Webpack.
            <br />
            <br />I have also side projects in RoR and native Android.
          </BannerBody>
          <BannerButton
            variant="outlined"
            size="large"
            onClick={() => workSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Show me
          </BannerButton>
        </BannerText>
      </BannerContainer>

      <Section>
        <SectionTitle>About me</SectionTitle>
        <AboutSection />
      </Section>

      <StyledDivider variant="middle" />

      <Section>
        <SectionTitle>Skills{isAdmin && <EditIcon onClick={() => setIsEditingSkills((prev) => !prev)} />}</SectionTitle>
        {loadingSkills && <LinearProgress />}
        {skillsData && !loadingSkills && (
          <SkillsSection
            isEditing={isEditingSkills}
            skills={skillsData}
            onCancelEditing={() => setIsEditingSkills(false)}
            onChangeSuccess={() => {
              setIsEditingSkills(false);
              refetchSkills();
            }}
          />
        )}
      </Section>

      <StyledDivider variant="middle" />

      <Section ref={workSectionRef}>
        <SectionTitle>Selected Work</SectionTitle>
        <WorkSection />
      </Section>

      <LoginDialog
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setMode(undefined);
        }}
        onSuccess={() => {
          setIsModalOpen(false);
          setIsAdmin(true);
        }}
      />
    </MainWrapper>
  );
};

export default PortfolioView;
