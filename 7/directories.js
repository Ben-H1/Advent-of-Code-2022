const fs = require('fs');
const get = require('lodash.get');

const input = fs.readFileSync(`./input.txt`, 'utf8');
const splitInput = input.split('\r\n');

let currentDir = ['/'];
const dirs = { '/': {} };

splitInput.forEach((line) => {
    const splitLine = line.split(' ');

    if (splitLine[0] === '$') {
        if (splitLine[1] === 'cd') {
            switch (splitLine[2]) {
                case '/': currentDir = ['/']; break;
                case '..': currentDir.pop(); break;
                default: currentDir.push(splitLine[2]); break;
            }
        } else {}
    } else {
        if (splitLine[0] === 'dir') {
            const folderName = splitLine[1];
            if (!get(dirs, currentDir)[folderName]) {
                get(dirs, currentDir)[folderName] = {};
            }
        } else {
            const fileSize = parseInt(splitLine[0]);
            const fileName = splitLine[1];
            if (!get(dirs, currentDir)[fileName]) {
                get(dirs, currentDir)[fileName] = fileSize;
            }
        }
    }
});

const getDirSizes = (obj, parents = [], dirSizes = {}) => {
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
            // console.log(`DIR: ${key} | PARENTS: [${parents.join(', ')}]`);
            if (dirSizes[key] == null) {
                dirSizes[key] = 0;
            }
            getDirSizes(obj[key], [...parents, key], dirSizes);
        } else {
            // console.log(`FILE: ${key} | ${obj[key]} | PARENTS: [${parents.join(', ')}]`);
            parents.forEach(parent => dirSizes[parent] += obj[key]);
        }
    });

    return dirSizes;
};

console.log(dirs);

const dirSizes = getDirSizes(dirs);
console.log(dirSizes);
const sum = Object.keys(dirSizes).map(d => dirSizes[d]).filter(s => s <= 100000).reduce((p, c) => p + c, 0);

console.log('--- Part 1 ---');
console.log(`The sum of the total sizes of all directories with a size of at most 100,000 is ${sum}`);
console.log();
