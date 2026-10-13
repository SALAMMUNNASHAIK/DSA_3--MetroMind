import { dbStats } from '../data/dataset';
import { Database, Navigation, Users, FileText, AlertTriangle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const nav = useNavigate();

  return (
    <div>
      <h2 className="page-title">Platform Overview</h2>
      
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="card stat-card">
          <Database className="stat-icon" size={48} />
          <div className="stat-info">
            <h3>{dbStats.totalStations}</h3>
            <p>Total Stations</p>
          </div>
        </div>
        <div className="card stat-card">
          <Navigation className="stat-icon" size={48} />
          <div className="stat-info">
            <h3>{dbStats.totalRoutes}</h3>
            <p>Active Routes</p>
          </div>
        </div>
        <div className="card stat-card">
          <Activity className="stat-icon" size={48} />
          <div className="stat-info">
            <h3>{dbStats.totalServices}</h3>
            <p>Daily Services</p>
          </div>
        </div>
        <div className="card stat-card">
          <FileText className="stat-icon" size={48} />
          <div className="stat-info">
            <h3>{dbStats.totalDocs}</h3>
            <p>Indexed Documents</p>
          </div>
        </div>
        <div className="card stat-card">
          <Users className="stat-icon" size={48} />
          <div className="stat-info">
            <h3>{dbStats.totalPassengers.toLocaleString()}</h3>
            <p>Daily Passengers</p>
          </div>
        </div>
        <div className="card stat-card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <AlertTriangle className="stat-icon" size={48} style={{ color: 'var(--danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }} />
          <div className="stat-info">
            <h3>{dbStats.alertsCount}</h3>
            <p>Active Alerts</p>
          </div>
        </div>
      </div>

      <h2 className="page-title">Quick Actions</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button className="btn" onClick={() => nav('/search')}>Search Station</button>
        <button className="btn" onClick={() => nav('/routes')}>Find Route</button>
        <button className="btn" onClick={() => nav('/documents')}>Search Documents</button>
        <button className="btn" onClick={() => nav('/lab')}>Open DSA Lab</button>
      </div>

      <h2 className="page-title">DSA Processing Engine</h2>
      <div className="grid-3">
        <div className="card">
          <h3 style={{ color: 'var(--primary-light)', marginBottom: '1rem' }}>CO1 - String Algorithms</h3>
          <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <li>• KMP (Search)</li>
            <li>• Z-Algorithm (Pattern Match)</li>
            <li>• Rabin-Karp (Hash Search)</li>
            <li>• Aho-Corasick (Multi-pattern)</li>
          </ul>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--primary-light)', marginBottom: '1rem' }}>CO2 - Suffix Structures</h3>
          <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <li>• Suffix Array (Indexing)</li>
            <li>• LCP / Kasai (Common prefix)</li>
            <li>• Suffix Automaton (Fast match)</li>
          </ul>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--primary-light)', marginBottom: '1rem' }}>CO3 - Dynamic Programming</h3>
          <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <li>• Levenshtein (Correction)</li>
            <li>• Bitmask DP (Selection)</li>
            <li>• Matrix Chain (Optimization)</li>
            <li>• Optimal BST (Fast fetch)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
