const fs = require('fs');

const input = fs.readFileSync(`./input.txt`, 'utf8');
const splitInput = input.split('\r\n');

const findCommonItem = (group) => {
    const indices = new Array(group.length - 1).fill(-1);
    const firstMember = group[0];

    for (let i = 0; i < firstMember.length; i++) {
        for (let j = 1; j < group.length; j++) {
            indices[j - 1] = group[j].indexOf(firstMember[i]);
        }
        if (indices.every(i => i > -1)) {
            return firstMember[i];
        }
    }
};

const getItemPriority = (item) => {
    const code = item.charCodeAt(0);
    
    if (code >= 97 && code <= 122) {
        return code - 96;
    } else {
        return code - 38;
    }
};

let total = 0;

splitInput.forEach((rucksack, i) => {
    const compartment1 = rucksack.substring(0, rucksack.length / 2);
    const compartment2 = rucksack.substring(rucksack.length / 2, rucksack.length);

    const common = findCommonItem([compartment1, compartment2]);
    const priority = getItemPriority(common);

    total += priority;
});

console.log('--- Part 1 ---');
console.log(`The sum of the priorities of the common item types is ${total}`);
console.log();

const groups = [];
const groupSize = 3;

for (let i = 0; i < splitInput.length; i += groupSize) {
    const group = [];
    for (let j = 0; j < groupSize; j++) {
        group.push(splitInput[i + j]);
    }
    groups.push(group);
}

total = 0;

groups.forEach((group) => {
    const badge = findCommonItem(group);
    const priority = getItemPriority(badge);
    total += priority;
});

console.log('--- Part 2 ---');
console.log(`The sum of the priorities of the badges is ${total}`);
