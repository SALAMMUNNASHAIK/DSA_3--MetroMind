// Z-Algorithm
// Time Complexity: O(n) where n is text length
// Space Complexity: O(n) for the Z array

export function calculateZArray(str) {
    const n = str.length;
    const Z = new Array(n).fill(0);
    let L = 0, R = 0, K = 0;

    for (let i = 1; i < n; ++i) {
        if (i > R) {
            L = R = i;
            while (R < n && str[R - L] === str[R]) {
                R++;
            }
            Z[i] = R - L;
            R--;
        } else {
            K = i - L;
            if (Z[K] < R - i + 1) {
                Z[i] = Z[K];
            } else {
                L = i;
                while (R < n && str[R - L] === str[R]) {
                    R++;
                }
                Z[i] = R - L;
                R--;
            }
        }
    }
    return Z;
}

export function zSearch(text, pattern) {
    const result = {
        matches: [],
        zArray: [],
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(n + m)"
    };

    if (!text || !pattern) return result;

    const concat = pattern + "$" + text;
    const l = concat.length;
    const Z = calculateZArray(concat);
    result.zArray = Z;

    for (let i = 0; i < l; ++i) {
        if (Z[i] === pattern.length) {
            result.matches.push(i - pattern.length - 1);
        }
    }

    return result;
}
