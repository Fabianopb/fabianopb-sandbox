import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import { Menu, MenuList, MenuItem, ListItemIcon, ListItemText, IconButton, colors } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { deleteProject } from '../../api';
import { isAdminAtom } from '../atoms';
import { Project } from '../types';
import DeleteDialog from './DeleteDialog';

type Props = {
  className?: string;
  projects: Project[];
  onSubmitSuccess: () => void;
};

const WorkContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const WorkCell = styled(Link)`
  position: relative;
  width: 250px;
  height: 250px;
  margin-bottom: 16px;
`;

const WorkImage = styled.img``;

const ImageText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background-color: ${colors.grey[600]};
  opacity: 0;
  transition: opacity 500ms ease-in-out;
  :hover {
    opacity: 0.9;
  }
`;

const WorkTag = styled.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
  background-color: ${colors.orange[100]};
  color: ${colors.grey[600]};
  padding: 0 8px 0 18px;
  font-size: 14px;
  border-radius: 12px;
  :after {
    content: '';
    display: block;
    position: absolute;
    left: 8px;
    top: 9px;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: ${colors.orange.A700};
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 0;
`;

const DeleteIcon = styled(Delete)`
  fill: ${colors.red[900]};
`;

const DeleteListItemText = styled(ListItemText)`
  color: ${colors.red[900]};
`;

const WorkSection = ({ className, projects, onSubmitSuccess }: Props) => {
  const [isAdmin] = useAtom(isAdminAtom);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project>();

  const handleEditClick = useCallback(() => {
    setAnchorEl(null);
    navigate(`/portfolio/projects/${activeProject?._id}?edit=true`);
  }, [activeProject?._id, navigate]);

  const handleDeleteClick = useCallback(() => {
    setAnchorEl(null);
    setDeleteModalOpen(true);
  }, []);

  const { mutate, isLoading: isDeleting } = useMutation(
    async () => {
      if (!activeProject) {
        throw new Error('Trying to delete without an active project');
      }
      await deleteProject(activeProject._id);
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
    <WorkContainer className={className}>
      {projects.map((work) => (
        <WorkCell key={work._id} to={`/portfolio/projects/${work._id}`}>
          <WorkImage src={work.thumbnailSrc} />
          <ImageText>{work.title}</ImageText>
          <WorkTag>{work.category}</WorkTag>
          {isAdmin && (
            <StyledIconButton
              size="small"
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                setAnchorEl(e.currentTarget);
                setActiveProject(work);
              }}
            >
              <MoreHoriz />
            </StyledIconButton>
          )}
        </WorkCell>
      ))}
      {isAdmin && (
        <>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
            <MenuList dense>
              <MenuItem onClick={handleEditClick}>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeleteClick}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <DeleteListItemText>Delete</DeleteListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
          <DeleteDialog
            title={`Delete "${activeProject?.title}"?`}
            isOpen={deleteModalOpen}
            isLoading={isDeleting}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={mutate}
          />
        </>
      )}
    </WorkContainer>
  );
};

export default WorkSection;
