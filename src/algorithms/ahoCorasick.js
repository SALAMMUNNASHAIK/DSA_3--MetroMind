// Aho-Corasick Algorithm
// Time Complexity: O(n + m + z) where n is text length, m is total patterns length, z is number of matches
// Space Complexity: O(m * alphabet_size)

class AhoNode {
    constructor() {
        this.children = {};
        this.fail = null;
        this.output = [];
    }
}

export function buildAhoCorasick(patterns) {
    const root = new AhoNode();

    // 1. Build Trie
    for (let i = 0; i < patterns.length; i++) {
        let curr = root;
        for (let j = 0; j < patterns[i].length; j++) {
            const char = patterns[i][j];
            if (!curr.children[char]) {
                curr.children[char] = new AhoNode();
            }
            curr = curr.children[char];
        }
        curr.output.push(patterns[i]);
    }

    // 2. Build Failure Links
    const queue = [];
    for (const key in root.children) {
        root.children[key].fail = root;
        queue.push(root.children[key]);
    }

    while (queue.length > 0) {
        const curr = queue.shift();

        for (const char in curr.children) {
            const child = curr.children[char];
            let failNode = curr.fail;

            while (failNode !== null && !failNode.children[char]) {
                failNode = failNode.fail;
            }

            child.fail = failNode ? failNode.children[char] : root;
            child.output = [...child.output, ...child.fail.output];
            
            queue.push(child);
        }
    }

    return root;
}

export function ahoCorasickSearch(text, patterns) {
    const result = {
        matches: [],
        detectedKeywords: [],
        timeComplexity: "O(n + m + z)",
        spaceComplexity: "O(m * alphabet_size)"
    };

    if (!text || patterns.length === 0) return result;

    const root = buildAhoCorasick(patterns);
    let curr = root;
    const foundSet = new Set();

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        while (curr !== null && !curr.children[char]) {
            curr = curr.fail;
        }

        if (curr === null) {
            curr = root;
            continue;
        } else {
            curr = curr.children[char];
        }

        for (const match of curr.output) {
            result.matches.push({
                keyword: match,
                position: i - match.length + 1
            });
            foundSet.add(match);
        }
    }

    result.detectedKeywords = Array.from(foundSet);
    return result;
}
