// Suffix Automaton (Directed Acyclic Word Graph - DAWG)
// Time Complexity: O(n) for construction
// Space Complexity: O(n * alphabet)

class State {
    constructor(length, link) {
        this.length = length;
        this.link = link;
        this.next = {};
    }
}

export class SuffixAutomaton {
    constructor(str) {
        this.states = [new State(0, -1)];
        this.last = 0;
        
        for (let i = 0; i < str.length; i++) {
            this.extend(str[i]);
        }
    }
    
    extend(c) {
        let cur = this.states.length;
        this.states.push(new State(this.states[this.last].length + 1, 0));
        
        let p = this.last;
        while (p !== -1 && !this.states[p].next[c]) {
            this.states[p].next[c] = cur;
            p = this.states[p].link;
        }
        
        if (p === -1) {
            this.states[cur].link = 0;
        } else {
            let q = this.states[p].next[c];
            if (this.states[p].length + 1 === this.states[q].length) {
                this.states[cur].link = q;
            } else {
                let clone = this.states.length;
                let cloneState = new State(this.states[p].length + 1, this.states[q].link);
                cloneState.next = {...this.states[q].next};
                this.states.push(cloneState);
                
                while (p !== -1 && this.states[p].next[c] === q) {
                    this.states[p].next[c] = clone;
                    p = this.states[p].link;
                }
                
                this.states[q].link = clone;
                this.states[cur].link = clone;
            }
        }
        this.last = cur;
    }
    
    containsSubstring(sub) {
        let curr = 0;
        for(let i=0; i<sub.length; i++) {
            if(!this.states[curr].next[sub[i]]) return false;
            curr = this.states[curr].next[sub[i]];
        }
        return true;
    }
}
