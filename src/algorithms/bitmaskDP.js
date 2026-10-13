// Bitmask DP for Destination Selection (Traveling Salesperson variant or Knapsack)
// Time Complexity: O(n^2 * 2^n)
// Space Complexity: O(n * 2^n)

// Assuming finding maximum destinations within a cost/time limit
export function bitmaskDP(destinations, maxBudget) {
    const n = destinations.length;
    const limit = 1 << n;
    const dp = new Array(limit).fill(0);
    const cost = new Array(limit).fill(0);
    
    // Evaluate all subsets
    for (let mask = 0; mask < limit; mask++) {
        let currentCost = 0;
        let currentCount = 0;
        
        for (let i = 0; i < n; i++) {
            if ((mask & (1 << i)) !== 0) {
                currentCost += destinations[i].cost;
                currentCount++;
            }
        }
        
        if (currentCost <= maxBudget) {
            dp[mask] = currentCount;
            cost[mask] = currentCost;
        }
    }
    
    let bestMask = 0;
    let maxDest = 0;
    
    for (let mask = 0; mask < limit; mask++) {
        if (dp[mask] > maxDest) {
            maxDest = dp[mask];
            bestMask = mask;
        } else if (dp[mask] === maxDest && cost[mask] < cost[bestMask]) {
            bestMask = mask; // Prefer cheaper option for same number of destinations
        }
    }
    
    const selected = [];
    for (let i = 0; i < n; i++) {
        if ((bestMask & (1 << i)) !== 0) {
            selected.push(destinations[i]);
        }
    }
    
    return {
        selected,
        totalCost: cost[bestMask],
        timeComplexity: "O(n * 2^n) subset evaluation",
        spaceComplexity: "O(2^n)"
    };
}
