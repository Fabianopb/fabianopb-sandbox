import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioView from './portfolio';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PortfolioView />} />
    </Routes>
  </BrowserRouter>
);

export default App;
