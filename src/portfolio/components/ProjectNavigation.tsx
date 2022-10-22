import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button } from '@mui/material';
import styled from 'styled-components';

type Props = {
  onClickPrevious: () => void;
  onClickNext: () => void;
};

const Root = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
`;

const ProjectNavigation = ({ onClickPrevious, onClickNext }: Props) => (
  <Root>
    <Button color="secondary" variant="text" size="small" startIcon={<ChevronLeft />} onClick={onClickPrevious}>
      Previous project
    </Button>
    <Button color="secondary" variant="text" size="small" endIcon={<ChevronRight />} onClick={onClickNext}>
      Next project
    </Button>
  </Root>
);

export default ProjectNavigation;
