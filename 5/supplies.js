const fs = require('fs');

const input = fs.readFileSync(`./input.txt`, 'utf8');
const splitInput = input.split('\r\n\r\n');

const initStacks = splitInput[0];
const instructions = splitInput[1].split('\r\n');

const getStacks = (initStacks) => {
    const stackLines = initStacks.split('\r\n');
    stackLines.pop();
    
    const chunks = stackLines.map(l => l.match(/.{1,4}/g).map(c => c.trimEnd().replace(/\[|\]/g, ''))).reverse();
    const stacks = new Array(chunks[0].length).fill().map(() => new Array());

    chunks.forEach((chunk) => {
        for (let i = 0; i < chunk.length; i++) {
            const supply = chunk[i];

            if (supply !== '') {
                stacks[i].push(chunk[i]);
            }
        }
    });

    return stacks;
};

const getTops = (stacks) => {
    return stacks.map((stack) => stack[stack.length - 1]).join('');
};

let stacks = getStacks(initStacks);

instructions.forEach((instruction) => {
    const splitInstruction = instruction.split(' ');
    const quantity = parseInt(splitInstruction[1]);
    const sourceStack = parseInt(splitInstruction[3]) - 1;
    const destinationStack = parseInt(splitInstruction[5]) - 1;

    for (let i = 0; i < quantity; i++) {
        const supply = stacks[sourceStack].pop();
        stacks[destinationStack].push(supply);
    }
});

let tops = getTops(stacks);

console.log('--- Part 1 ---');
console.log(`After the rearrangements, the top crates are in the order ${tops}`);
console.log();

stacks = getStacks(initStacks);

instructions.forEach((instruction) => {
    const splitInstruction = instruction.split(' ');
    const quantity = parseInt(splitInstruction[1]);
    const sourceStack = parseInt(splitInstruction[3]) - 1;
    const destinationStack = parseInt(splitInstruction[5]) - 1;

    const supplies = [];
    for (let i = 0; i < quantity; i++) {
        const supply = stacks[sourceStack].pop();
        supplies.push(supply);
    }
    for (let i = 0; i < quantity; i++) {
        const supply = supplies.pop();
        stacks[destinationStack].push(supply);
    }
});

tops = getTops(stacks);

console.log('--- Part 2 ---');
console.log(`After the rearrangements, the top crates are in the order ${tops}`);
