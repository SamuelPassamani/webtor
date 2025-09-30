// --- Player Initialization ---
const playerControls = {};
for (const item of document.getElementsByClassName('ctrl')) {
  if (!playerControls[item.dataset.name]) {
    playerControls[item.dataset.name] = item;
  } else {
    playerControls[item.dataset.name] = [playerControls[item.dataset.name], item];
  }
}

const client = new WebTorrentPlayer.default({
  controls: playerControls,
  video: document.getElementById('video'),
  player: document.getElementById('player'),
  destroyStore: false, // CRITICAL FOR OFFLINE: Keep torrents after playback
  burnIn: true,
  seekTime: 2,
  immerseTime: 10,
  generateThumbnails: true,
  visibilityLossPause: true
});

// --- Event Listeners ---
client.on('prev', params => console.log('User wants to play previous video!', params));
client.on('next', params => console.log('User wants to play next video!', params));
client.on('playlist', params => console.log('User wants to open playlist!', params));
client.on('watched', params => console.log('User watched current video!', params));
client.on('download-done', params => console.log('Player finished downloading a file!', params));
client.on('video-files', params => console.log('Player found video files!', params));
client.on('offline-torrent', params => console.log('Player loaded an offline stored torrent!', params));
client.on('no-files', params => console.error('Player couldnt find any playable video files!', params));
client.on('no-peers', params => console.error('Player couldnt find any peers!', params));

// --- Global Functions for HTML buttons ---
// These need to be global so the onclick attributes in the HTML can find them.
function playTorrentByMagnet() {
  const magn = document.getElementById('magn');
  if (magn && magn.value) {
    client.playTorrent(magn.value);
  }
}

function offlineDownload(torrentId) {
  if (torrentId) {
    client.offlineDownload(torrentId);
  }
}

function playTorrentById(torrentId) {
  if (torrentId) {
    client.playTorrent(torrentId);
  }
}
