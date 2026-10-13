// Optimal Binary Search Tree
// Time Complexity: O(n^3)
// Space Complexity: O(n^2)

export function optimalBST(keys, freq, n) {
    const cost = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    // cost[i][j] = Optimal cost of binary search tree that can be formed from keys[i] to keys[j]

    for (let i = 0; i < n; i++) {
        cost[i][i] = freq[i];
    }

    for (let L = 2; L <= n; L++) {
        for (let i = 0; i <= n - L + 1; i++) {
            let j = i + L - 1;
            cost[i][j] = Infinity;
            
            // sum of freq from i to j
            let sum = 0;
            for(let k=i; k<=j; k++) sum += freq[k];
            
            for (let r = i; r <= j; r++) {
                let c = ((r > i) ? cost[i][r - 1] : 0) +
                        ((r < j) ? cost[r + 1][j] : 0) +
                        sum;
                if (c < cost[i][j]) {
                    cost[i][j] = c;
                }
            }
        }
    }
    return {
        minCost: cost[0][n - 1],
        costTable: cost,
        timeComplexity: "O(n^3)",
        spaceComplexity: "O(n^2)"
    };
}
