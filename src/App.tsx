import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PortfolioView from './portfolio';
import Layout from './portfolio/components/Layout';
import ProjectDetails from './portfolio/components/ProjectDetails';
import PlaystationView from './playstation';
import { useQuery } from '@tanstack/react-query';
import { getSession } from './apis/root';
import { clearSession, getToken, setSession } from './common/session';

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
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path="/" element={<Navigate to="/portfolio" replace />} />
          <Route path="/portfolio" element={<Layout />}>
            <Route index element={<PortfolioView />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
          </Route>
          <Route path="/playstation" element={<PlaystationView />} />
          <Route path="*" element={<h2>Nothing to see here... :/</h2>} />
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default App;
