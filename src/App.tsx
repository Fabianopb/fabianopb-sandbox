import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioView from './portfolio';
import ProjectDetails from './portfolio/components/ProjectDetails';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PortfolioView />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
    </Routes>
  </BrowserRouter>
);

export default App;
