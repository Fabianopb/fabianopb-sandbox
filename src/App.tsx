import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PortfolioView from './portfolio';
import Layout from './portfolio/components/Layout';
import ProjectDetails from './portfolio/components/ProjectDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/portfolio" replace />} />
        <Route path="/portfolio" element={<Layout />}>
          <Route index element={<PortfolioView />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
        </Route>
        <Route path="*" element={<h2>Nothing to see here... :/</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
