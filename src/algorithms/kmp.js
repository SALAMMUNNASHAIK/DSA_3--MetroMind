// KMP Algorithm
// Time Complexity: O(n + m) where n is text length and m is pattern length
// Space Complexity: O(m) for the LPS array

export function computeLPSArray(pattern) {
    const m = pattern.length;
    let lps = new Array(m).fill(0);
    let len = 0;
    let i = 1;

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

export function kmpSearch(text, pattern) {
    const result = {
        matches: [],
        comparisons: 0,
        lps: [],
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(m)"
    };

    if (!text || !pattern || pattern.length === 0) return result;

    const n = text.length;
    const m = pattern.length;
    const lps = computeLPSArray(pattern);
    result.lps = lps;

    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < n) {
        result.comparisons++;
        if (pattern[j] === text[i]) {
            j++;
            i++;
        }

        if (j === m) {
            result.matches.push(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return result;
}
