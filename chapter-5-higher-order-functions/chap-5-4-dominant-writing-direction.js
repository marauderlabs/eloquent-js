/*

    Dominant writing direction

    Write a function that computes the dominant writing direction in a
    string of text. Remember that each script object has a direction property
    that can be "ltr" (left to right), "rtl" (right to left), or
    "ttb" (top to bottom).

    The dominant direction is the direction of a majority of the characters
    that have a script associated with them. The characterScript and countBy
    functions defined earlier in the chapter are probably useful here.

*/

const SCRIPTS = require('./scripts')

function characterScript(codePoint) {
    for (const script of SCRIPTS) {
        if (script.ranges.some(([start, end]) => {
            return (codePoint >= start && codePoint <= end)
        })) {
            return script
        }
    }
    return null;
}
// console.log(characterScript(121).name);
// -> Latin

function countBy(items, groupName_getter) {
    let groups = [];
    for (const item of items) {
        group_name = groupName_getter(item);
        let idx = groups.findIndex((elt) => elt.name == group_name);
        if (idx == -1) {
            groups.push({ name: group_name, count: 1 });
        } else {
            groups[idx].count++;
        }
    }
    return groups
}
// console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

function countByScripts(string) {
    // Count the directions
    scripts = countBy(string, char => {
        s = characterScript(char.codePointAt(0));
        return s ? s.direction : null;
    });

    // filter the null one
    return scripts.filter((({ name }) => name != null));
}

// scripts = countByScripts("Hello!").filter(({ name }) => name != null);

function dominantDirection(text) {
    directions_in_text = countByScripts(text).filter(({ name }) => name != null);
    // console.log("Directions in text", directions_in_text);

    // Find the script with max count
    dominant = directions_in_text.reduce((prev, current) => {
        return prev.count > current.count ? prev : current;
    })

    // console.log("Dominant text", dominant);
    return dominant.name
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl