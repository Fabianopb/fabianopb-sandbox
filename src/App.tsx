import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PortfolioView from './portfolio';
import Layout from './portfolio/components/Layout';
import ProjectDetails from './portfolio/components/ProjectDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/portfolio" replace />} />
        <Route path="/" element={<Layout />}>
          <Route path="portfolio" element={<PortfolioView />} />
          <Route path="portfolio/projects/:id" element={<ProjectDetails />} />
          <Route path="*" element={<h2>Nothing to see here... :/</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
