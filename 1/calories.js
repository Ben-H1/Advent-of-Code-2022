const fs = require('fs');

const input = fs.readFileSync(`./input.txt`, 'utf8');
const splitInput = input.split('\r\n');

let currentTotal = 0;
const elves = [];

for (let i = 0; i < splitInput.length; i++) {
    const line = splitInput[i];

    if (line == '') {
        elves.push(currentTotal);
        currentTotal = 0;
    } else {
        currentTotal += parseInt(line); 
        if (i >= splitInput.length - 1) {
            elves.push(currentTotal);
        }
    }
}

const topMax = Math.max(...elves);
const topElf = elves.indexOf(topMax);

console.log('--- Part 1 ---');
console.log(`Elf ${topElf + 1} has the most calories: ${topMax}`);
console.log();

const elvesCopy = [...elves];

const maxCount = 3;
const maxElves = [];

for (let i = 0; i < maxCount; i++) {
    const max = Math.max(...elvesCopy);
    const elf = elvesCopy.indexOf(max);
    maxElves.push({ index: elf, calories: max });
    elvesCopy[elf] = 0;
}

const total = maxElves.reduce((p, c) => p + c.calories, 0);

console.log('--- Part 2 ---');
console.log(`The top ${maxCount} elves are:`);
maxElves.forEach(e => console.log(`   Elf ${e.index + 1} with ${e.calories} calories`));
console.log(`In total, these elves are carrying ${total} calories`);
