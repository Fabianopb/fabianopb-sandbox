import { Add, Delete, Edit, MoreHoriz } from '@mui/icons-material';
import { colors, IconButton, Link, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { useAtom } from 'jotai';
import { useState, MouseEvent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { isAdminAtom } from '../atoms';
import { Badge } from '../types';
import DeleteDialog from './DeleteDialog';
import BadgeFormDialog from './BadgeFormDialog';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteBadge } from '../../api';

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

const AddIconButton = styled(IconButton)`
  margin-left: 8px;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: -36px;
  top: 0;
`;

const DeleteIcon = styled(Delete)`
  fill: ${colors.red[900]};
`;

const DeleteListItemText = styled(ListItemText)`
  color: ${colors.red[900]};
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

  const handleAddBadge = () => {
    setActiveBadge(undefined);
    setBadgeModalOpen(true);
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

  const { mutate, isLoading: isDeleting } = useMutation(
    async () => {
      if (!activeBadge) {
        throw new Error('Trying to delete without an active badge');
      }
      await deleteBadge(activeBadge._id);
    },
    {
      onSuccess: () => {
        onSubmitSuccess();
        setDeleteModalOpen(false);
      },
      onError: (error?: any) => {
        const message = error?.response?.data?.message || error?.message;
        toast(message || 'Unkown error!', { type: 'error' });
      },
    }
  );

  return (
    <SkillsContainer>
      <SubtitleContainer>
        <SkillSubtitle>Code school badges</SkillSubtitle>
        {isAdmin && (
          <AddIconButton color="primary" size="small" onClick={handleAddBadge}>
            <Add />
          </AddIconButton>
        )}
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
              {isAdmin && (
                <StyledIconButton color="secondary" size="small" onClick={(e) => handleOpenMenu(e, badge)}>
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
          <BadgeFormDialog
            defaultValues={activeBadge}
            isOpen={badgeModalOpen}
            onClose={() => setBadgeModalOpen(false)}
            onSubmitSuccess={onSubmitSuccess}
          />
          <DeleteDialog
            title={`Delete "${activeBadge?.name}"?`}
            isOpen={deleteModalOpen}
            isLoading={isDeleting}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={mutate}
          />
        </>
      )}
    </SkillsContainer>
  );
};

export default BadgesSubsection;
