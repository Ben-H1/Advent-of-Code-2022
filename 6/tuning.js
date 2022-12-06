const fs = require('fs');

const input = fs.readFileSync(`./input.txt`, 'utf8');

const getUniqueIndex = (input, bufferSize) => {
    const buffer = [];

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        buffer.push(char);
    
        if (buffer.length > bufferSize) {
            buffer.shift();
        }
    
        const uniqueBuffer = new Set(buffer);
    
        if (buffer.length == bufferSize && uniqueBuffer.size == buffer.length) {
            return i + 1;
        }
    }
};

const packetMarkerIndex = getUniqueIndex(input, 4);

console.log('--- Part 1 ---');
console.log(`${packetMarkerIndex} characters need to be processed before the start-of-packet marker is detected`);
console.log();

const messageMarkerIndex = getUniqueIndex(input, 14);

console.log('--- Part 2 ---');
console.log(`${messageMarkerIndex} characters need to be processed before the start-of-message marker is detected`);
