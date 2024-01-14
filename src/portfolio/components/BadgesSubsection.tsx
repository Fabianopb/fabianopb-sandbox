import { colors, Link } from '@mui/material';
import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { badges } from '../../data/badges';

const rotate = keyframes`
  0% { transform: rotateY(0deg) }
  100% { transform: rotateY(360deg); }
`;

const SkillsContainer = styled.div`
  width: 600px;
  margin: auto;
  @media (max-width: 768px) {
    width: initial;
    margin: 12px 8px;
  }
`;

const SubtitleContainer = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SkillSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: ${colors.grey[600]};
`;

const BadgesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 600px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 400px) {
    grid-template-columns: auto;
  }
`;

const BadgeCard = styled(Link)`
  height: 172px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BadgeName = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${colors.grey[600]};
`;

const ImageContainer = styled.div`
  position: relative;
  margin-top: 8px;
  width: 140px;
`;

const BadgeImage = styled.img<{ shouldAnimate: boolean }>`
  width: 100%;
  ${({ shouldAnimate }) =>
    shouldAnimate &&
    css`
      animation: ${rotate} 1000ms ease-in-out;
    `}
`;

const BadgesSubsection = () => {
  const [animatingBadges, setAnimatingBadges] = useState<number[]>([]);

  const handleBadgeMouseEnter = async (index: number) => {
    if (animatingBadges.includes(index)) {
      return;
    }
    setAnimatingBadges((prev) => [...new Set([...prev, index])].sort());
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAnimatingBadges((prev) => prev.filter((badgeIndex) => badgeIndex !== index));
  };

  return (
    <SkillsContainer>
      <SubtitleContainer>
        <SkillSubtitle>Code school badges</SkillSubtitle>
      </SubtitleContainer>
      <BadgesContainer>
        {badges.map((badge, index) => (
          <BadgeCard key={badge.name} href={badge.href} underline="none" target="_blank" rel="noopener noreferrer">
            <BadgeName>{badge.name}</BadgeName>
            <ImageContainer>
              <BadgeImage
                src={badge.imageSrc}
                shouldAnimate={animatingBadges.includes(index)}
                onMouseEnter={() => handleBadgeMouseEnter(index)}
              />
            </ImageContainer>
          </BadgeCard>
        ))}
      </BadgesContainer>
    </SkillsContainer>
  );
};

export default BadgesSubsection;
