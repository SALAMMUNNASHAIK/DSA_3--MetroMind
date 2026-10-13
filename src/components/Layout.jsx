import { Outlet, NavLink } from 'react-router-dom';
import { Home, Search, Map, FileText, Activity, TerminalSquare } from 'lucide-react';

export default function Layout() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>METROMIND</h1>
          <p>Intelligent Transport Platform</p>
        </div>
        
        <nav className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/search" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Search size={20} />
            <span>Station Search</span>
          </NavLink>

          <NavLink to="/routes" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Map size={20} />
            <span>Route Explorer</span>
          </NavLink>

          <NavLink to="/documents" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <FileText size={20} />
            <span>Document Index</span>
          </NavLink>

          <NavLink to="/lab" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <TerminalSquare size={20} />
            <span>DSA Algorithm Lab</span>
          </NavLink>
        </nav>
      </aside>
      
      <main className="main-content">
        <header className="topbar">
          <div style={{ color: 'var(--text-muted)' }}>DSA-3 Project • Route Intelligence System</div>
          <button className="btn btn-secondary" onClick={() => alert("Demo mode executing...")}>▶ Demo Mode</button>
        </header>
        
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
