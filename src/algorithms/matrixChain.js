// Matrix Chain Multiplication
// Time Complexity: O(n^3)
// Space Complexity: O(n^2)

export function matrixChainOrder(p) {
    const n = p.length - 1;
    const m = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
    const s = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (let l = 2; l <= n; l++) {
        for (let i = 1; i <= n - l + 1; i++) {
            let j = i + l - 1;
            m[i][j] = Infinity;
            for (let k = i; k <= j - 1; k++) {
                let q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (q < m[i][j]) {
                    m[i][j] = q;
                    s[i][j] = k;
                }
            }
        }
    }

    return {
        minCost: m[1][n],
        mTable: m,
        sTable: s,
        timeComplexity: "O(n^3)",
        spaceComplexity: "O(n^2)"
    };
}

export function constructOptimalParenthesis(s, i, j) {
    if (i === j) {
        return "A" + i;
    } else {
        return "(" + constructOptimalParenthesis(s, i, s[i][j]) + 
               constructOptimalParenthesis(s, s[i][j] + 1, j) + ")";
    }
}
