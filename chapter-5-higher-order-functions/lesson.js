function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i + 1);
    }
}

let elts = [];
repeat(5, (i) => {
    elts.push(`Unit ${i}`);
});

console.log(elts);


function filter(array, test) {
    result = [];
    for (const elt of array) {
        if (test(elt)) {
            result.push(elt);
        }
    }
    return result;
}

const SCRIPTS = require('./scripts')

console.log(filter(SCRIPTS, (script) => script.living));