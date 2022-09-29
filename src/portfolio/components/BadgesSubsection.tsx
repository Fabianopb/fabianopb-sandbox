import { Link } from '@mui/material';
import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Badge } from '../types';

type Props = {
  badges: Badge[];
  onSubmitSuccess: () => void;
};

const rotate = keyframes`
  0% { transform: rotateY(0deg) }
  100% { transform: rotateY(360deg); }
`;

const SkillsContainer = styled.div`
  width: 600px;
  margin: auto;
`;

const SkillSubtitle = styled.h2`
  margin-top: 48px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #555;
`;

const BadgesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const BadgeCard = styled(Link)`
  height: 172px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BadgeName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #555;
`;

const BadgeImage = styled.img<{ shouldAnimate: boolean }>`
  margin-top: 8px;
  width: 140px;
  ${({ shouldAnimate }) =>
    shouldAnimate &&
    css`
      animation: ${rotate} 1000ms ease-in-out;
    `}
`;

const BadgesSubsection = ({ badges, onSubmitSuccess }: Props) => {
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
      <SkillSubtitle>Code school badges</SkillSubtitle>
      <BadgesContainer>
        {badges.map((badge, index) => (
          <BadgeCard key={badge.name} href={badge.href} underline="none" target="_blank" rel="noopener noreferrer">
            <BadgeName>{badge.name}</BadgeName>
            <BadgeImage
              src={badge.imageSrc}
              shouldAnimate={animatingBadges.includes(index)}
              onMouseEnter={() => handleBadgeMouseEnter(index)}
            />
          </BadgeCard>
        ))}
      </BadgesContainer>
    </SkillsContainer>
  );
};

export default BadgesSubsection;
