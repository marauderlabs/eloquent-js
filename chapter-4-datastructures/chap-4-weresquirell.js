const JOURNAL = require('./journal')

// console.log(JOURNAL);

function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
            (table[0] + table[1]) *
            (table[1] + table[3]) *
            (table[0] + table[2]));
}

// console.log(phi([76, 9, 4, 1]));

function tableFor(event, journal) {
    let table = [0, 0, 0, 0];
    for (let i = 0; i < journal.length; i++) {
        let entry = journal[i];
        let index = 0;
        if (entry.events.includes(event)) {
            index++;
        }
        if (entry.squirrel) {
            index += 2;
        }
        table[index]++;
    }
    return table
}

function getEventsFromJournal(journal) {
    let uniq_events = [];
    for (const entry of journal) {
        for (const event of entry.events) {
            if (!uniq_events.includes(event)) {
                uniq_events.push(event);
            }
        }
    }
    return uniq_events
}

// console.log(tableFor("pizza", JOURNAL));
console.log(getEventsFromJournal(JOURNAL));

for (let event of getEventsFromJournal(JOURNAL)) {
    let correlation = phi(tableFor(event, JOURNAL));
    if (correlation > 0.1 || correlation < -0.1) {
        console.log(event + ":", correlation);
    }
}

for (let entry of JOURNAL) {
    if (entry.events.includes("peanuts") &&
        !entry.events.includes("brushed teeth")) {
        entry.events.push("peanut teeth");
    }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));