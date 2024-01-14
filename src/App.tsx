import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import PortfolioView from './portfolio';
import Layout from './portfolio/components/Layout';
import ProjectDetails from './portfolio/components/ProjectDetails';
import PlaystationView from './playstation';
import { useQuery } from '@tanstack/react-query';
import { getSession } from './apis/root';
import { clearSession, getToken, setSession } from './common/session';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const NotFound = styled.div`
  margin: 96px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

const App = () => {
  useQuery(['session'], getSession, {
    enabled: !!getToken(),
    onSuccess: ({ token }) => {
      setSession(token);
    },
    onError: () => {
      clearSession();
    },
  });
  return (
    <HashRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path="/" element={<Navigate to="/portfolio" replace />} />
          <Route path="/portfolio" element={<Layout />}>
            <Route index element={<PortfolioView />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
          </Route>
          <Route path="/playstation" element={<PlaystationView />} />
          <Route
            path="*"
            element={
              <NotFound>
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
                <Button onClick={() => <Navigate to="/portfolio" replace />}>Back to home</Button>
              </NotFound>
            }
          />
        </Routes>
      </QueryParamProvider>
    </HashRouter>
  );
};

export default App;
