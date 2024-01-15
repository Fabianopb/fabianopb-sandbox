import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Root = styled.div`
  margin: 96px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Root>
      <div style={{ marginBottom: 48 }}>Oops! Nothing to see here...</div>
      <iframe
        src="https://giphy.com/embed/C87IXdLfJ44Zq"
        width="480"
        height="205"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      />
      <p>
        <a href="https://giphy.com/gifs/comment-downvoted-deleting-C87IXdLfJ44Zq" />
      </p>
      <Button onClick={() => navigate('/portfolio')}>Back to home</Button>
    </Root>
  );
};

export default NotFound;
