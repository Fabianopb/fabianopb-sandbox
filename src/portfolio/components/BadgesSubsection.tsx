import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import { IconButton, Link, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { useAtom } from 'jotai';
import { useState, MouseEvent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { isAdminAtom } from '../atoms';
import { Badge } from '../types';
import DeleteDialog from './DeleteDialog';
import EditBadgeDialog from './EditBadgeDialog';

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

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: -36px;
  top: 0;
  color: #17293a;
`;

const DeleteIcon = styled(Delete)`
  fill: #9b0000;
`;

const DeleteListItemText = styled(ListItemText)`
  color: #9b0000;
`;

const BadgesSubsection = ({ badges, onSubmitSuccess }: Props) => {
  const [isAdmin] = useAtom(isAdminAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeBadge, setActiveBadge] = useState<Badge>();

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>, badge: Badge) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    setActiveBadge(badge);
  };

  const handleEditBadge = () => {
    setAnchorEl(null);
    setBadgeModalOpen(true);
  };

  const handleDeleteBadge = () => {
    setAnchorEl(null);
    setDeleteModalOpen(true);
  };

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
            <ImageContainer>
              <BadgeImage
                src={badge.imageSrc}
                shouldAnimate={animatingBadges.includes(index)}
                onMouseEnter={() => handleBadgeMouseEnter(index)}
              />
              {isAdmin && (
                <StyledIconButton size="small" onClick={(e) => handleOpenMenu(e, badge)}>
                  <MoreHoriz />
                </StyledIconButton>
              )}
            </ImageContainer>
          </BadgeCard>
        ))}
      </BadgesContainer>
      {isAdmin && (
        <>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
            <MenuList dense>
              <MenuItem onClick={handleEditBadge}>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeleteBadge}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <DeleteListItemText>Delete</DeleteListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
          <EditBadgeDialog
            defaultValues={activeBadge}
            isOpen={badgeModalOpen}
            onClose={() => setBadgeModalOpen(false)}
          />
          <DeleteDialog
            title={`Delete "${activeBadge?.name}"?`}
            isOpen={deleteModalOpen}
            isLoading={false}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={() => {}}
          />
        </>
      )}
    </SkillsContainer>
  );
};

export default BadgesSubsection;
