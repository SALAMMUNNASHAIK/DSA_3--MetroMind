// Levenshtein Distance (Edit Distance)
// Time Complexity: O(n * m)
// Space Complexity: O(n * m)

export function levenshteinDistance(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],    // deletion
                    dp[i][j - 1],    // insertion
                    dp[i - 1][j - 1] // substitution
                );
            }
        }
    }

    return {
        distance: dp[m][n],
        dpTable: dp,
        timeComplexity: "O(n * m)",
        spaceComplexity: "O(n * m)"
    };
}

export function findClosestStation(input, stations) {
    if (!input) return null;
    let minDistance = Infinity;
    let closest = null;
    let stats = null;

    for (const station of stations) {
        const result = levenshteinDistance(input.toLowerCase(), station.toLowerCase());
        if (result.distance < minDistance) {
            minDistance = result.distance;
            closest = station;
            stats = result;
        }
    }

    return { closest, distance: minDistance, stats };
}
