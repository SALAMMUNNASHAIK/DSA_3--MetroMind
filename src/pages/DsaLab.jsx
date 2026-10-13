import { useState } from 'react';
import { destinationsCost, matrixDimensions, stationSearchFreq } from '../data/dataset';
import { bitmaskDP } from '../algorithms/bitmaskDP';
import { matrixChainOrder } from '../algorithms/matrixChain';
import { optimalBST } from '../algorithms/optimalBST';
import { rabinKarpSearch } from '../algorithms/rabinKarp';

export default function DsaLab() {
  const [activeTab, setActiveTab] = useState('CO3');

  // Bitmask DP Result
  const bitmaskRes = bitmaskDP(destinationsCost, 100);
  
  // Matrix Chain Result
  const mcmRes = matrixChainOrder(matrixDimensions);
  
  // Optimal BST Result
  const keys = stationSearchFreq.map(s => s.station);
  const freqs = stationSearchFreq.map(s => s.freq);
  const bstRes = optimalBST(keys, freqs, keys.length);
  
  // Rabin-Karp Result
  const rkRes = rabinKarpSearch("SERVICE_CODE_123_ACTIVE", "123");

  return (
    <div>
      <h2 className="page-title">DSA Algorithm Lab</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Interactive testbed for the core data structures and algorithms powering MetroMind.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className={`btn ${activeTab === 'CO1' ? '' : 'btn-secondary'}`} onClick={() => setActiveTab('CO1')}>CO1: String Algos</button>
        <button className={`btn ${activeTab === 'CO2' ? '' : 'btn-secondary'}`} onClick={() => setActiveTab('CO2')}>CO2: Suffix Structures</button>
        <button className={`btn ${activeTab === 'CO3' ? '' : 'btn-secondary'}`} onClick={() => setActiveTab('CO3')}>CO3: Dynamic Programming</button>
      </div>

      {activeTab === 'CO1' && (
        <div className="grid-2">
          <div className="card">
            <h3 style={{ color: 'var(--secondary)' }}>Rabin-Karp Algorithm</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '1rem 0' }}>Used for Ticket Code / Service ID matching.</p>
            <div className="code-block">
              Text: "SERVICE_CODE_123_ACTIVE"<br/>
              Pattern: "123"<br/>
              Pattern Hash: {rkRes.patternHash}<br/>
              Match found at index: {rkRes.matches[0]}<br/>
              Time: {rkRes.timeComplexity}
            </div>
          </div>
          <div className="card">
            <h3 style={{ color: 'var(--secondary)' }}>KMP & Aho-Corasick</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '1rem 0' }}>Demonstrated in the <strong>Search</strong> page.</p>
          </div>
        </div>
      )}

      {activeTab === 'CO2' && (
        <div className="grid-2">
          <div className="card">
            <h3 style={{ color: 'var(--secondary)' }}>Suffix Array & LCP</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '1rem 0' }}>Demonstrated in the <strong>Document Index</strong> page.</p>
          </div>
          <div className="card">
            <h3 style={{ color: 'var(--secondary)' }}>Suffix Automaton (DAWG)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '1rem 0' }}>Demonstrated in the <strong>Route Explorer</strong> page.</p>
          </div>
        </div>
      )}

      {activeTab === 'CO3' && (
        <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ color: 'var(--secondary)' }}>Bitmask DP (Destination Selection)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
              Find max destinations to visit under a budget of 100 units.
            </p>
            <div className="code-block">
              Available: {destinationsCost.map(d => `${d.name}(${d.cost})`).join(", ")}<br/>
              Selected: {bitmaskRes.selected.map(d => d.name).join(", ")}<br/>
              Total Cost: {bitmaskRes.totalCost}<br/>
              Complexity: {bitmaskRes.timeComplexity}
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ color: 'var(--secondary)' }}>Matrix Chain Multiplication</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
              Optimal multiplication of transport data matrices.
            </p>
            <div className="code-block">
              Dimensions: {matrixDimensions.join(" x ")}<br/>
              Min Cost: {mcmRes.minCost}<br/>
              Complexity: {mcmRes.timeComplexity}
            </div>
          </div>

          <div className="card">
            <h3 style={{ color: 'var(--secondary)' }}>Optimal BST</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
              Optimizing search tree for frequently accessed stations.
            </p>
            <div className="code-block">
              Stations: {keys.join(", ")}<br/>
              Frequencies: {freqs.join(", ")}<br/>
              Min Search Cost: {bstRes.minCost}<br/>
              Complexity: {bstRes.timeComplexity}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
