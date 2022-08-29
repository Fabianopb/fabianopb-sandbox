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

const NavigationButton = styled(Button)`
  color: #53b5cc;
`;

const ProjectNavigation = ({ onClickPrevious, onClickNext }: Props) => (
  <Root>
    <NavigationButton variant="text" size="small" startIcon={<ChevronLeft />} onClick={onClickPrevious}>
      Previous project
    </NavigationButton>
    <NavigationButton variant="text" size="small" endIcon={<ChevronRight />} onClick={onClickNext}>
      Next project
    </NavigationButton>
  </Root>
);

export default ProjectNavigation;
