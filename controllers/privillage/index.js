const { downloadAlbum, downloadSong } = require("./download");
const { downloadCheck } = require("./downloadCheck");



const download = {
    downloadAlbum,
    downloadCheck,
    downloadSong
}

module.exports = download;