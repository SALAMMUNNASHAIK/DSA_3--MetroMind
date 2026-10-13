import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import RouteExplorer from './pages/RouteExplorer';
import DocumentIndex from './pages/DocumentIndex';
import DsaLab from './pages/DsaLab';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="search" element={<Search />} />
        <Route path="routes" element={<RouteExplorer />} />
        <Route path="documents" element={<DocumentIndex />} />
        <Route path="lab" element={<DsaLab />} />
      </Route>
    </Routes>
  );
}

export default App;
