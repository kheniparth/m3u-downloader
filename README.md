SoundCloud Or M3U files downloader and single file composer
=============

To download m3u files
- put the playlist file in same folder and run:
```
    node download PLAYLIST_FILENAME.m3u
```
- It will download all mp3 files into `PLAYLIST_FILENAME` folder
- To concate all chunks into single mp3 file run:
```
    node concat PLAYLIST_FILENAME.m3u
```
- It will fetch file from `PLAYLIST_FILENAME` folder and create a single mp3 file named as `PLAYLIST_FILENAME.mp3`