import WebTorrentPlayer from 'https://cdn.jsdelivr.net/npm/webtorrent-player@1.1.0/dist/WebTorrentPlayer.min.js'

const player = new WebTorrentPlayer({
  torrent: 'https://webtorrent.io/torrents/sintel.torrent',
  video: document.querySelector('#player'),
})
