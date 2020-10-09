const m3u = require('m3u8-reader')
const fs = require('fs')
const https = require('https')
 
let filename = process.argv[2]
if(!filename) {
    console.log('Downloader: Please provide correct folder name to fecth mp3 files')
    process.exit();
}
console.log(`Started processing ${filename}`)

const dir = './' + filename.split('.')[0]
if (fs.existsSync(dir)){
    fs.rmdirSync(dir, { recursive: true });
}
fs.mkdirSync(dir)

const mp3Urls = m3u(fs.readFileSync(filename, 'utf8'))
    .filter(element => typeof element == "string" )

console.log(`Total ${mp3Urls.length} urls found from m3u file`)
const mp3Promises = mp3Urls
    .map((element, idx) => {
        const file = fs.createWriteStream(dir + "/" + idx);
        return https.get(element, function(response) {
            response.pipe(file)
        })
    })

console.log(`Total ${mp3Promises.length} promices created`)
Promise.all(mp3Promises)
    .then(() => {
        console.log(`Downloaded all files from playlist at ${dir} path`)
    })



