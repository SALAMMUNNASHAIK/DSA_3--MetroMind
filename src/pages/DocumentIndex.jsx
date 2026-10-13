import { useState, useMemo } from 'react';
import { documents } from '../data/dataset';
import { buildSuffixArray, searchInSuffixArray } from '../algorithms/suffixArray';
import { buildLCPArray } from '../algorithms/lcpKasai';

export default function DocumentIndex() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  // Build SA and LCP once for the combined document corpus
  const { corpus, saData, lcpData } = useMemo(() => {
    const text = documents.map(d => d.content).join(" # ");
    const sa = buildSuffixArray(text);
    const lcp = buildLCPArray(text, sa.suffixArray);
    return { corpus: text, saData: sa, lcpData: lcp };
  }, []);

  const handleSearch = () => {
    if (!query) return;
    const matches = searchInSuffixArray(corpus, query, saData.suffixArray);
    setSearchResults(matches);
  };

  return (
    <div>
      <h2 className="page-title">Transport Document Index (Suffix Array & LCP)</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Total corpus length: {corpus.length} chars. Suffix Array and LCP Array constructed.
        </p>
        <div className="form-group">
          <label>Search in Documents (O(m log n) via Suffix Array)</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="e.g. delay, platform, ticket"
            />
            <button className="btn" onClick={handleSearch}>Index Search</button>
          </div>
        </div>
      </div>

      {searchResults && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Search Results</h3>
          <p>Found <strong>{searchResults.length}</strong> occurrences.</p>
          <div className="code-block">
            {searchResults.map((idx, i) => (
              <div key={i}>Match at index {idx}: "...{corpus.substring(Math.max(0, idx - 10), Math.min(corpus.length, idx + query.length + 10))}..."</div>
            ))}
          </div>
        </div>
      )}

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Available Documents</h3>
          <ul style={{ listStyle: 'none' }}>
            {documents.map(d => (
              <li key={d.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <h4 style={{ color: 'var(--primary-light)' }}>{d.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{d.content}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>LCP / Kasai Analysis</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            The Longest Common Prefix array identifies repeated substrings in the document corpus, useful for finding common phrase patterns.
          </p>
          <div className="code-block" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            LCP Array (First 50):<br/>
            {lcpData.lcpArray.slice(0, 50).join(", ")}...
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Kasai Time Complexity: {lcpData.timeComplexity}
          </div>
        </div>
      </div>
    </div>
  );
}
