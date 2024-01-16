import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PortfolioView from './portfolio';
import Layout from './portfolio/components/Layout';
import ProjectDetails from './portfolio/components/ProjectDetails';
import PlaystationView from './playstation';
import NotFound from './portfolio/components/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/portfolio" replace />} />
        <Route path="/portfolio" element={<Layout />}>
          <Route index element={<PortfolioView />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
        </Route>
        <Route path="/playstation" element={<PlaystationView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
