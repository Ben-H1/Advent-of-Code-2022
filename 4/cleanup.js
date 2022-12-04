const fs = require('fs');

const input = fs.readFileSync(`./input.txt`, 'utf8');
const splitInput = input.split('\r\n');

const getAssignment = (pair) => {
    const splitPair = pair.split(',');
    return splitPair.map((range) => {
        const splitRange = range.split('-');
        return {
            start: parseInt(splitRange[0]),
            end: parseInt(splitRange[1])
        };
    });
};

const assignments = splitInput.map(pair => getAssignment(pair));

let total = 0;

assignments.forEach((assignment) => {    
    if (
        ((assignment[1].start >= assignment[0].start) && (assignment[1].end <= assignment[0].end)) ||
        ((assignment[0].start >= assignment[1].start) && (assignment[0].end <= assignment[1].end))
    ) {
        total++;
    }
});

console.log('--- Part 1 ---');
console.log(`One range fully contains the other in ${total} assignment pairs`);
console.log();

total = 0;

assignments.forEach((assignment) => {
    if (
        (
            ((assignment[1].start >= assignment[0].start) && (assignment[1].start <= assignment[0].end)) ||
            ((assignment[1].end >= assignment[0].start) && (assignment[1].end <= assignment[0].end))
        ) || (
            ((assignment[0].start >= assignment[1].start) && (assignment[0].start <= assignment[1].end)) ||
            ((assignment[0].end >= assignment[1].start) && (assignment[0].end <= assignment[1].end))
        )
    ) {
        total++;
    }
});

console.log('--- Part 2 ---');
console.log(`The ranges overlap in ${total} assignment pairs`);
