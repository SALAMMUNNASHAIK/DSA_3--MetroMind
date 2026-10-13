import { useState } from 'react';
import { stations, routes, serviceAlerts } from '../data/dataset';
import { findClosestStation } from '../algorithms/levenshtein';
import { kmpSearch } from '../algorithms/kmp';
import { ahoCorasickSearch } from '../algorithms/ahoCorasick';

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  
  const handleSearch = () => {
    if(!query) return;
    
    // 1. Levenshtein - Station Correction
    const correction = findClosestStation(query, stations);
    
    // 2. KMP - Find Routes
    let matchedRoutes = [];
    if(correction.closest) {
      for(let r of routes) {
        const kmpRes = kmpSearch(r.description, correction.closest);
        if(kmpRes.matches.length > 0) {
          matchedRoutes.push(r);
        }
      }
    }
    
    // 3. Aho-Corasick - Check Alerts for station name
    const acRes = ahoCorasickSearch(serviceAlerts.join(" | "), [correction.closest]);

    setSearchResult({
      originalQuery: query,
      corrected: correction,
      routes: matchedRoutes,
      alerts: acRes.matches.length > 0
    });
  };

  return (
    <div>
      <h2 className="page-title">Station Search & Analysis</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="form-group">
          <label>Enter Station Name (try typing with a typo, e.g. "Vijayawda")</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Search station..."
            />
            <button className="btn" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      {searchResult && (
        <div className="card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Search Results</h3>
          
          <div className="result-panel">
            <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>Spell Correction (Levenshtein Distance)</h4>
            <p>You typed: <strong>{searchResult.originalQuery}</strong></p>
            {searchResult.corrected.distance > 0 ? (
              <p>Did you mean: <strong style={{ color: 'var(--success)' }}>{searchResult.corrected.closest}</strong> (Edit Distance: {searchResult.corrected.distance})</p>
            ) : (
              <p>Exact match found: <strong style={{ color: 'var(--success)' }}>{searchResult.corrected.closest}</strong></p>
            )}
            
            <details style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
              <summary>View Algorithm Stats</summary>
              <div className="code-block">
                Time Complexity: {searchResult.corrected.stats.timeComplexity}<br/>
                Space Complexity: {searchResult.corrected.stats.spaceComplexity}
              </div>
            </details>
          </div>

          <div className="result-panel">
            <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>Connected Routes (KMP Search)</h4>
            {searchResult.routes.length > 0 ? (
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                {searchResult.routes.map(r => (
                  <li key={r.id}>{r.id}: {r.description}</li>
                ))}
              </ul>
            ) : (
              <p>No routes found passing through this station.</p>
            )}
          </div>

          <div className="result-panel">
            <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>Service Alerts (Aho-Corasick)</h4>
            {searchResult.alerts ? (
              <p style={{ color: 'var(--danger)' }}>Alerts found concerning {searchResult.corrected.closest}. Please check Dashboard.</p>
            ) : (
              <p style={{ color: 'var(--success)' }}>No active alerts for this station.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
