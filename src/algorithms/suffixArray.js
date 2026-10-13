// Suffix Array (Naive O(n^2 log n) for demonstration, practical enough for short strings)
// In a real production system, SA-IS O(n) would be used.
// Time Complexity: O(n^2 log n) 
// Space Complexity: O(n)

export function buildSuffixArray(text) {
    const n = text.length;
    const suffixes = [];
    
    for (let i = 0; i < n; i++) {
        suffixes.push({
            index: i,
            suffix: text.substring(i)
        });
    }
    
    // Sort suffixes alphabetically
    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
    
    const suffixArray = suffixes.map(s => s.index);
    
    return {
        originalText: text,
        sortedSuffixes: suffixes,
        suffixArray: suffixArray,
        timeComplexity: "O(n^2 log n)",
        spaceComplexity: "O(n)"
    };
}

export function searchInSuffixArray(text, pattern, suffixArray) {
    let l = 0, r = text.length - 1;
    let n = text.length;
    let m = pattern.length;
    let res = [];

    while (l <= r) {
        let mid = Math.floor(l + (r - l) / 2);
        let resCmp = text.substring(suffixArray[mid], suffixArray[mid] + m).localeCompare(pattern);
        
        if (resCmp === 0) {
            // Found a match, need to check left and right for multiple occurrences
            res.push(suffixArray[mid]);
            
            // Check left
            let temp = mid - 1;
            while(temp >= 0 && text.substring(suffixArray[temp], suffixArray[temp] + m) === pattern) {
                res.push(suffixArray[temp]);
                temp--;
            }
            
            // Check right
            temp = mid + 1;
            while(temp < n && text.substring(suffixArray[temp], suffixArray[temp] + m) === pattern) {
                res.push(suffixArray[temp]);
                temp++;
            }
            return res;
        }
        
        if (resCmp < 0) l = mid + 1;
        else r = mid - 1;
    }
    return res;
}
