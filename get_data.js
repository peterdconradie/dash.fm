//const apiKey = 'c657e60596c700834193677b83977182';
const myUrl1 = new URL(window.location.toLocaleString());
const myUrl2 = new URL(myUrl1);
const user = myUrl2.searchParams.get('u');
const url_recent = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;

function updateNowPlaying() {
    // the first, original fetch for raw last.fm data
    fetch(url_recent)
        .then(response => response.json())
        .then(data => {
            const track = data.recenttracks.track[0];
            let artist = track.artist['#text'];
            const song = track.name;
            let album = track.album['#text'];
            const albumArtUrl = track.image[3]['#text'];
            const mbid = track.mbid;
            const album_mbid = track.album.mbid;
            const trackUrl = track.url

            // let truncatedArtist = artist.split(',')[0];
            const truncatedSong = song.split(' (')[0];

            const albumTrunc = album.split(' (')[0];
            const artistTrunc = artist.split(',')[0];


            console.log('trackURLs info: ', trackUrl);

            let truncatedTrackName = truncatedSong.slice(0, 49);
            if (truncatedSong.length > 49) {
                truncatedTrackName += '...';
            }

            console.log('getrecenttracks info: ', data);
            console.log('trackURLs info: ', trackUrl);

            document.querySelector('#song-link').innerHTML = `<a href="${trackUrl}" target="_blank">Last.fm: Track</a>`;
            // Update artist information
            document.querySelector('#artist-info').textContent = `${artist}`;
            // Update track information
            document.querySelector('#track-info').textContent = `${truncatedTrackName}`;

            document.querySelector('#page_title').textContent = `${truncatedTrackName} by ${artist}`;

            // Update album information
            document.querySelector('#album-info').textContent = `${album}`;

            document.querySelector('#album-art').src = albumArtUrl;

            // document.getElementById('mbid').textContent = `MBID: ${mbid}`;
            // document.getElementById('album_mbid').textContent = `MBID: ${album_mbid}`;

            const page_title = `https://www.albumoftheyear.org/search/?q=${encodeURIComponent(artist)}`;

            // search for last.fm artist
            const lastArtistUrl = `https://www.last.fm/music/${encodeURIComponent(artistTrunc)}`;
            document.querySelector('#last_artist_link').href = lastArtistUrl;
            // search for last.fm album
            const lastAlbumUrl = `https://www.last.fm/search/albums?q=${encodeURIComponent(albumTrunc)}`;
            document.querySelector('#last_album_link').href = lastAlbumUrl;

            // Update the AlbumOfTheYear.org artist link
            const aotyArtistUrl = `https://www.albumoftheyear.org/search/artists/?q=${encodeURIComponent(artistTrunc)}`;
            document.querySelector('#aoty-link').href = aotyArtistUrl;

            // Update the AlbumOfTheYear.org album link
            const aotyAlbumUrl = `https://www.albumoftheyear.org/search/albums/?q=${encodeURIComponent(albumTrunc)}`;
            document.querySelector('#aoty-album-link').href = aotyAlbumUrl;

            /// lyrics todo lyrics genius
            let genuisTrack = truncatedSong;
            genuisTrack = genuisTrack.replace(/ /g, "-");
            genuisTrack = genuisTrack.replace(/[.,\/#!$%\^&\*;:{}=’\_`~()]/g, "");

            if (genuisTrack.endsWith("!") || genuisTrack.endsWith("?")) {
                genuisTrack = genuisTrack.slice(0, -1);
            }
            genuisTrack = genuisTrack.toLowerCase();
            console.log(genuisTrack); // "This-is-my-string"

            let genuisArtist = artistTrunc;
            genuisArtist = genuisArtist.replace(/ /g, "-");
            //myString = myString.replace(/,/g, "");

            if (genuisArtist.endsWith("!") || genuisArtist.endsWith("?")) {
                genuisArtist = genuisArtist.slice(0, -1);
            }
            genuisArtist = genuisArtist.toLowerCase();
            console.log(genuisArtist); // "This-is-my-string"


            const geniusLyricsUrl = `https://genius.com/${encodeURIComponent(genuisArtist)}-${encodeURIComponent(genuisTrack)}-lyrics`;
            console.log(geniusLyricsUrl); // "This-is-my-string"
            document.querySelector('#genius-lyrics-link').href = geniusLyricsUrl;


            const googleLyricsSearch = `https://www.google.com/search?q=${encodeURIComponent(truncatedSong)}+by+${encodeURIComponent(artistTrunc)}+lyrics`;
            console.log(googleLyricsSearch); // "This-is-my-string"

            document.querySelector('#google-lyrics-search').href = googleLyricsSearch;

            return fetch(url_recent);
        })

        .then(response => response.json())
        .then(data => {
            const track = data.recenttracks.track[0];
            const artist = track.artist['#text'];
            const album = track.album['#text'];
            const songName = track.name;

            // Truncate artist name after ","
            const truncatedArtist = artist.split(',')[0];

            // Truncate album name after " ("
            const truncatedAlbum = album.split(' (')[0];

            console.log(`Fixed Artist: ${truncatedArtist}`);
            console.log(`Fixed Album: ${truncatedAlbum}`);

            const encodedArtist = encodeURIComponent(truncatedArtist);


            // Fetch release group
            const mb_rg_url = `https://musicbrainz.org/ws/2/release-group/?query=artist:${encodedArtist} AND release:${truncatedAlbum}&fmt=json`;

            //const mb_rg_url = `https://musicbrainz.org/ws/2/release/?query=artist:${encodedArtist} AND release:${truncatedAlbum}&fmt=json`;


            console.log(mb_rg_url);

            fetch(mb_rg_url)
                .then(response => response.json())
                .then(data => {
                    console.log('rg data from mb', data);
                    const releaseGroupId = data['release-groups'][0].id;
                    const releaseDate = data["release-groups"][0]["first-release-date"]
                    const releaseType = data["release-groups"][0]["primary-type"]
                    document.querySelector('#release-date').textContent = `${releaseDate}`;
                    //                    document.querySelector('#release-type').textContent = `${releaseType}`;

                    console.log('rg data from mb', data);

                    // Fetch cover art
                    const ca_ar_url = `https://coverartarchive.org/release-group/${releaseGroupId}`;
                    console.log(ca_ar_url);
                    fetch(ca_ar_url)
                        .then(response => response.json())
                        .then(data => {
                            //const coverArtUrl = data.images[0].thumbnails.large;
                            
                            const coverArtUrl = data.images[0].image
                          
                            const coverArtUrls = data.images[0].thumbnails.small;
                            //const coverArtUrls ="transparent.png";
                            console.log('cover art: ', data);
                            console.log(`Cover art: ${coverArtUrl}`);
                            document.querySelector('#mb-album-art').src = coverArtUrls;
                            document.querySelector('#mb-album-art').src = coverArtUrl;
                            //    document.body.style.backgroundImage = `url(${coverArtUrl})`;

                            // Set the background image of the background element
                            ///document.querySelector('#background').style.backgroundImage = `url(${coverArtUrl})`;

                            // Apply a blur filter to the background element
                            //document.querySelector('#background').style.filter = 'blur(10px) grayscale(100%)';


                        });
                });

            // Fetch artist bio
            fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodedArtist}&api_key=${apiKey}&format=json`)
                .then(response => response.json())
                .then(data => {
                    let artistBio = data.artist.bio.summary;
                    const artistBioFull = data.artist.bio.content;
                    const artistBioName= data.artist.name;
                    const formattedBio = artistBioFull.replace(/\n/g, '<br>');
                    
                    artistBio = artistBio.replace(/<a[^>]*>([^<]+)<\/a>/gi, '...');
                    


                    console.log('Artist info: ', data);
                    console.log(`Artist bio summary: ${artistBio}`);
                    console.log('Artist info full: ${artistBioFull}', );
                    document.querySelector('#artist-bio').innerHTML = artistBio;
                    document.querySelector('#artist-bio-full').innerHTML = formattedBio;
                    document.querySelector('#artist-bio-name').innerHTML = artistBioName;





                    const tags = data.artist.tags.tag;
                    let tagLinks = '';
                    console.log('tags ', tags);
                    tags.forEach(tag => {

                        tagLinks += `<a href="${tag.url}" target="_blank">${tag.name}</a> `;
                    });
                    document.getElementById('artist-tags').innerHTML = tagLinks;

                    const similarArtists = data.artist.similar.artist;
                    console.log('similar artists ', similarArtists);
                    let artistLinks = '';
                    similarArtists.forEach(artist => {
                        artistLinks += `<a href="${artist.url}" target="_blank">${artist.name}</a> `;
                    });
                    document.getElementById('similar-artists').innerHTML = artistLinks;
                });
        }); // these are the final brackets 
}



function expandFooter() {
    document.getElementById("footer").style.height = "100%";
}

function collapseFooter() {
    document.getElementById("footer").style.height = "20px";
}

/* Fullscreen */
let elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

function fullscreen() {
    let isFullscreen = document.fullscreen;
    if (isFullscreen == true) {
        closeFullscreen();
    } else {
        openFullscreen();
    }
}



// Update the now playing information every 3 seconds
setInterval(updateNowPlaying, 3000);