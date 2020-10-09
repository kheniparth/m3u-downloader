const fs = require('fs')

let clips = []
let stream
let currentfile

const filename = process.argv[2]
if(!filename) {
    console.log('Concater: Please provide correct folder name to fecth mp3 files')
    process.exit()
}

const outputFileName = filename.split('.')[0]
const dir = './' + outputFileName
const files = fs.readdirSync(dir)
let outputFile = fs.createWriteStream(`./${outputFileName}.mp3`);

console.log(`Total ${files.length} files found at ${dir}`)
files.forEach(function (file) {
    clips.push(file.substring(0, 6));  
});

clips.sort(function (a, b) {
    return a - b;
});

function main() {
    if (!clips.length) {
        outputFile.end("Done", function() {
            console.log(`Concated all ${files.length} files into ./${outputFileName}.mp3`);
        });
        return;
    }
    currentfile = dir + '/' + clips.shift();
    stream = fs.createReadStream(currentfile);
    stream.pipe(outputFile, {end: false});
    stream.on("end", function() {
        main();        
    });
}
main();