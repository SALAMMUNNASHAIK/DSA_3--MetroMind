import { useState } from 'react';
import { routes } from '../data/dataset';
import { calculateZArray, zSearch } from '../algorithms/zAlgorithm';
import { SuffixAutomaton } from '../algorithms/suffixAutomaton';

export default function RouteExplorer() {
  const [routeInput, setRouteInput] = useState("Vijayawada");
  const [zResult, setZResult] = useState(null);
  const [saResult, setSaResult] = useState(null);
  
  const handleAnalyze = () => {
    if(!routeInput) return;
    
    // Concat all routes for analysis
    const allRoutesStr = routes.map(r => r.description).join(" | ");
    
    // 1. Z-Algorithm - Pattern Match
    const zRes = zSearch(allRoutesStr, routeInput);
    
    // 2. Suffix Automaton - Fast Substring
    const sa = new SuffixAutomaton(allRoutesStr);
    const hasSubstring = sa.containsSubstring(routeInput);
    
    setZResult({
      matches: zRes.matches.length,
      stats: zRes
    });
    
    setSaResult({
      exists: hasSubstring
    });
  };

  return (
    <div>
      <h2 className="page-title">Route Explorer (Z-Algorithm & Suffix Automaton)</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="form-group">
          <label>Find Sub-route or Pattern in System</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              value={routeInput} 
              onChange={e => setRouteInput(e.target.value)} 
              placeholder="e.g. Tenali -> Vijayawada"
            />
            <button className="btn" onClick={handleAnalyze}>Analyze Routes</button>
          </div>
        </div>
      </div>

      {(zResult || saResult) && (
        <div className="grid-2">
          <div className="card">
            <h3 style={{ color: 'var(--primary-light)', marginBottom: '1rem' }}>Z-Algorithm Matcher</h3>
            <p>Found <strong>{zResult.matches}</strong> occurrences of "{routeInput}" in the route network.</p>
            <div className="code-block" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
              Complexity: {zResult.stats.timeComplexity}
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ color: 'var(--primary-light)', marginBottom: '1rem' }}>Suffix Automaton (DAWG)</h3>
            <p>Fast Substring Check: </p>
            <h4 style={{ color: saResult.exists ? 'var(--success)' : 'var(--danger)', fontSize: '1.5rem' }}>
              {saResult.exists ? "Path Exists" : "Path Does Not Exist"}
            </h4>
            <div className="code-block" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
              Construction: O(n), Search: O(m)
            </div>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>All Routes Directory</h3>
      <div className="card">
        <ul style={{ listStyle: 'none' }}>
          {routes.map(r => (
            <li key={r.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>{r.id}</span> &nbsp; {r.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
