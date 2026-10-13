// Rabin-Karp Algorithm
// Time Complexity: O(n+m) average, O(nm) worst case
// Space Complexity: O(1)

export function rabinKarpSearch(text, pattern, prime = 101) {
    const result = {
        matches: [],
        patternHash: 0,
        textHashes: [],
        timeComplexity: "O(n+m) average",
        spaceComplexity: "O(1)"
    };

    if (!text || !pattern || pattern.length > text.length) return result;

    const d = 256; // number of characters in alphabet
    const m = pattern.length;
    const n = text.length;
    let i, j;
    let p = 0; // hash value for pattern
    let t = 0; // hash value for txt
    let h = 1;

    for (i = 0; i < m - 1; i++) {
        h = (h * d) % prime;
    }

    for (i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % prime;
        t = (d * t + text.charCodeAt(i)) % prime;
    }

    result.patternHash = p;

    for (i = 0; i <= n - m; i++) {
        result.textHashes.push({ index: i, hash: t });

        if (p === t) {
            for (j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) break;
            }
            if (j === m) {
                result.matches.push(i);
            }
        }

        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
            if (t < 0) t = t + prime;
        }
    }

    return result;
}
