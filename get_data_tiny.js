let lastPlayedTrack = null;
const myUrl1 = new URL(window.location.toLocaleString());
const myUrl2 = new URL(myUrl1);
const user = myUrl2.searchParams.get('u');
const url_recent = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;

function updateNowPlaying() {
    // the first, original fetch for raw last.fm data
    fetch(url_recent).then(response => response.json()).then(data => {
        console.log(data);
        const track = data.recenttracks.track[0];
        let artist = track.artist['#text'];
        const song = track.name;
        let album = track.album['#text'];
        const albumArtUrl = track.image[3]['#text'];
        const mbid = track.mbid;
        const album_mbid = track.album.mbid;
        const trackUrl = track.url
        const truncatedSong = song.split(' (')[0];
        const albumTrunc = album.split(' (')[0];
        const artistTrunc = artist.split(',')[0];
        //console.log('trackURLs info: ', trackUrl);
        let truncatedTrackName = truncatedSong.slice(0, 100);
        if (truncatedSong.length > 99) {
            truncatedTrackName += '...';
        }
        //console.log('getrecenttracks info: ', data);
        //console.log('trackURLs info: ', trackUrl);
        // Update artist information
        document.querySelector('#artist-info').textContent = `${artist}`;
        // Update track information
        document.querySelector('#track-info').textContent = `${truncatedTrackName}`;
        // insert page title
        document.querySelector('#page_title').textContent = `${truncatedTrackName} by ${artist}`;
        // Update album information
        document.querySelector('#album-info').textContent = `${album}`;
        document.querySelector('#lastcover_art').src = albumArtUrl;
    }); // these are the final brackets for the first fetch (get new playing onfo) requests
}
setInterval(updateNowPlaying, 2000);