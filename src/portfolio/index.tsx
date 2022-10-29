import { Button, colors, Divider, IconButton, LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { getBadges, getProjects, getSkills } from './api';
import bannerImageSrc from '../assets/banner.jpeg';
import AboutSection from './components/AboutSection';
import BadgesSubsection from './components/BadgesSubsection';
import WorkSection from './components/WorkSection';
import SkillsSubsection from './components/SkillsSubsection';
import ToolsetSubsection from './components/ToolsetSubsection';
import { useAtom } from 'jotai';
import { isAdminAtom } from './atoms';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ADD_PROJECT_ID } from './components/ProjectDetails';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BannerContainer = styled.div`
  display: flex;
  position: relative;
  height: 560px;
  background-color: ${colors.teal[900]};
  @media (max-width: 768px) {
    height: 420px;
  }
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
  color: white;
  text-align: center;
  z-index: 1;
`;

const BannerTitle = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 32px;
`;

const BannerBody = styled.div`
  font-size: 1.5rem;
  line-height: 1.4;
  margin-bottom: 32px;
`;

const BannerButton = styled(Button)`
  color: white;
  border-color: white;
  &:hover {
    border-color: white;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 24px auto;
  @media (max-width: 848px) {
    width: initial;
    margin: 12px 8px;
  }
`;

const StyledDivider = styled(Divider)`
  width: 800px;
  margin: 24px auto;
  @media (max-width: 848px) {
    width: inherit;
    margin: 12px 8px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SectionTitle = styled.h1`
  font-size: 2.5rem;
  color: ${colors.grey[600]};
  font-weight: 800;
`;

const StyledWorkSection = styled(WorkSection)`
  margin-top: 48px;
`;

const AddIconButton = styled(IconButton)`
  margin-left: 8px;
  color: ${colors.blue[900]};
`;

const PortfolioView = () => {
  const workSectionRef = useRef<HTMLDivElement>(null);
  const [isAdmin] = useAtom(isAdminAtom);
  const navigate = useNavigate();

  const {
    data: skillsData,
    isLoading: loadingSkills,
    refetch: refetchSkills,
  } = useQuery(['portfolio', 'skills'], getSkills);

  const {
    data: badgesData,
    isLoading: loadingBadges,
    refetch: refetchBadges,
  } = useQuery(['portfolio', 'badges'], getBadges);

  const {
    data: projectsData,
    isLoading: loadingProjects,
    refetch: refetchProjects,
  } = useQuery(['portfolio', 'all-projects'], getProjects);

  const skillTypeData = useMemo(() => skillsData?.filter((skill) => skill.type === 'skill'), [skillsData]);
  const toolTypeData = useMemo(() => skillsData?.filter((skill) => skill.type === 'tool'), [skillsData]);

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
        <SectionTitle>Skills</SectionTitle>
        {loadingSkills && <LinearProgress />}
        {skillTypeData && !loadingSkills && (
          <SkillsSubsection skills={skillTypeData.sort((a, b) => b.value - a.value)} onSubmitSuccess={refetchSkills} />
        )}
        {loadingSkills && <LinearProgress />}
        {toolTypeData && !loadingSkills && (
          <ToolsetSubsection toolset={toolTypeData.sort((a, b) => b.value - a.value)} onSubmitSuccess={refetchSkills} />
        )}
        {loadingBadges && <LinearProgress />}
        {badgesData && !loadingBadges && <BadgesSubsection badges={badgesData} onSubmitSuccess={refetchBadges} />}
      </Section>

      <StyledDivider variant="middle" />

      <Section ref={workSectionRef}>
        <TitleContainer>
          <SectionTitle>Selected Work</SectionTitle>
          {isAdmin && (
            <AddIconButton size="small" onClick={() => navigate(`/portfolio/projects/${ADD_PROJECT_ID}`)}>
              <Add />
            </AddIconButton>
          )}
        </TitleContainer>
        {loadingProjects && <LinearProgress />}
        {projectsData && !loadingProjects && (
          <StyledWorkSection projects={projectsData} onSubmitSuccess={refetchProjects} />
        )}
      </Section>
    </MainWrapper>
  );
};

export default PortfolioView;
