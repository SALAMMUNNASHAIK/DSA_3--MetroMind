// Kasai's Algorithm for Longest Common Prefix (LCP) Array
// Time Complexity: O(n)
// Space Complexity: O(n)

export function buildLCPArray(text, suffixArray) {
    const n = suffixArray.length;
    const lcp = new Array(n).fill(0);
    const invSuff = new Array(n).fill(0);
    
    // Inverse suffix array
    for (let i = 0; i < n; i++) {
        invSuff[suffixArray[i]] = i;
    }
    
    let k = 0;
    
    for (let i = 0; i < n; i++) {
        if (invSuff[i] === n - 1) {
            k = 0;
            continue;
        }
        
        let j = suffixArray[invSuff[i] + 1];
        
        while (i + k < n && j + k < n && text[i + k] === text[j + k]) {
            k++;
        }
        
        lcp[invSuff[i]] = k;
        
        if (k > 0) {
            k--;
        }
    }
    
    return {
        lcpArray: lcp,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
    };
}
