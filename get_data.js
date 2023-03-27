let lastPlayedTrack = null;
const myUrl1 = new URL(window.location.toLocaleString());
const myUrl2 = new URL(myUrl1);
const user = myUrl2.searchParams.get('u');
const url_recent = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;

function updateNowPlaying() {
    // the first, original fetch for raw last.fm data
    fetch(url_recent).then(response => response.json()).then(data => {
        const track = data.recenttracks.track[0];
        let artist = track.artist['#text'];
        const song = track.name;
        let album = track.album['#text'];
        const albumArtUrl = track.image[3]['#text'];
        const mbid = track.mbid;
        const album_mbid = track.album.mbid;
        const trackUrl = track.url
            // we save the track infor in currentTrack, so it can be checked later
            // let truncatedArtist = artist.split(',')[0];
        const truncatedSong = song.split(' (')[0];
        const albumTrunc = album.split(' (')[0];
        const artistTrunc = artist.split(',')[0];
        //console.log('trackURLs info: ', trackUrl);
        let truncatedTrackName = truncatedSong.slice(0, 49);
        if (truncatedSong.length > 49) {
            truncatedTrackName += '...';
        }
        //console.log('getrecenttracks info: ', data);
        //console.log('trackURLs info: ', trackUrl);
        document.querySelector('#song-link').innerHTML = `<a href="${trackUrl}" target="_blank">Last.fm: Track</a>`;
        // Update artist information
        document.querySelector('#artist-info').textContent = `${artist}`;
        // Update track information
        document.querySelector('#track-info').textContent = `${truncatedTrackName}`;
        // insert page title
        document.querySelector('#page_title').textContent = `${truncatedTrackName} by ${artist}`;
        // Update album information
        document.querySelector('#album-info').textContent = `${album}`;
        document.querySelector('#album-info-wiki').textContent = `${album}`;
        //document.querySelector('#album-art').src = albumArtUrl;
        //coverart first from last.fm
        document.querySelector('#last-album-art').src = albumArtUrl;
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
        //console.log(genuisTrack); // "This-is-my-string"
        let genuisArtist = artistTrunc;
        genuisArtist = genuisArtist.replace(/ /g, "-");
        //myString = myString.replace(/,/g, "");
        if (genuisArtist.endsWith("!") || genuisArtist.endsWith("?")) {
            genuisArtist = genuisArtist.slice(0, -1);
        }
        genuisArtist = genuisArtist.toLowerCase();
        //console.log(genuisArtist); // "This-is-my-string"
        const geniusLyricsUrl = `https://genius.com/${encodeURIComponent(genuisArtist)}-${encodeURIComponent(genuisTrack)}-lyrics`;
        //console.log(geniusLyricsUrl); // "This-is-my-string"
        document.querySelector('#genius-lyrics-link').href = geniusLyricsUrl;
        const googleLyricsSearch = `https://www.google.com/search?q=${encodeURIComponent(truncatedSong)}+by+${encodeURIComponent(artistTrunc)}+lyrics`;
        //console.log(googleLyricsSearch); // "This-is-my-string"
        document.querySelector('#google-lyrics-search').href = googleLyricsSearch;
        return fetch(url_recent);
    }).then(response => response.json()).then(data => {
        const track = data.recenttracks.track[0];
        let artist = track.artist['#text'];
        const album = track.album['#text'];
        const songName = track.name;
        const currentTrack = track.name;
        //console.log('currentTrack for if statemt : ', currentTrack);
        // this is the tyler function, but it works for all artists: it truncates afer the comma. Right now, I have only found Tyler, the Creator with a comma in the name.
        function truncateString(str) {
            let parts = str.split(",");
            if (parts[0] === "Tyler" && parts[1] === " the Creator") {
                return `${parts[0]},${parts[1]}`;
            }
            else {
                return parts[0];
            }
        }
        let truncatedArtist = truncateString(artist);
        //console.log(`Fixed Artist: ${truncatedArtist}`);
        // Truncate album name after " ("
        // this will probably not work everywhere for every instance
        const truncatedAlbum = album.split(' (')[0];
        //console.log(`Fixed Album: ${truncatedAlbum}`);
        const encodedArtist = encodeURIComponent(truncatedArtist);
        // Fetch release group
        if (currentTrack !== lastPlayedTrack) {
            // trying populating with defaults here
            document.getElementById('wikipedia').innerHTML = '<p>No information found on wikipedia</p>';
            document.getElementById('artist-bio').innerHTML = '<p>No information found on wikipedia</p>';
            document.getElementById('albums').innerHTML = '<p>No albums found in musicbrainz</p>';
            document.querySelector('#artist-from').textContent = `No information found on musicbrainz`;
            document.querySelector('#artist-area').textContent = `No information found on musicbrainz`;
            document.querySelector('#artist-lifespan').textContent = `No information found on musicbrainz`;
            document.querySelector('#artist-type').textContent = `No information found on musicbrainz`;
            document.querySelector('#release-date').textContent = `No date found`;
            document.querySelector('#mb-album-art').src = 'images/transparent.png'
                // document.querySelector('#mb-album-art').src = albumArtUrl;
                //document.querySelector('#mb-album-art').src = 'images/transparent.png'
                // artist works 
            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${encodeURIComponent(truncatedArtist)}`).then(response => response.json()).then(data => {
                // 2. Get the artist ID
                const artistId = data.data[0].id;
                const artistImage = data.data[0].picture_big;
                console.log(`Artist Image: ${artistImage}`);
                document.querySelector('#artist-image').src = artistImage;
            });
            // end sanbox
            /// deezer sandbox here 
            //var truncatedAlbumDeezer = truncatedAlbum.substring(0, 40);
            let truncatedAlbumDeezer = truncatedAlbum.split(" ").slice(0, 7).join(" ");
            //const truncatedAlbumDeezer = truncatedAlbum.split(':')[0];
            console.log('truncatedAlbum for deezer: ', truncatedAlbumDeezer)
            const deezerAlbumSearch = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${truncatedAlbumDeezer}`;
            console.log('deezerAlbumSearch', deezerAlbumSearch)
            fetch(deezerAlbumSearch).then(response => response.json()).then(data => {
                console.log('deezerAlbumSearch', data)
                console.log('deezerAlbumSearch', deezerAlbumSearch)
                const albumImage = data.data[0].cover_xl;
                console.log(`album Image from deezer: ${albumImage}`);
                document.querySelector('#mb-album-art').src = albumImage;
            });
            const mb_rg_url = `https://musicbrainz.org/ws/2/release-group/?query=artist:${encodedArtist} AND release:${truncatedAlbum} and title:${truncatedAlbum} &fmt=json`;
            //const mb_rg_url = `https://musicbrainz.org/ws/2/release/?query=artist:${encodedArtist} AND release:${truncatedAlbum}&fmt=json`;
            console.log(mb_rg_url);
            fetch(mb_rg_url).then(response => response.json()).then(data => {
                console.log('rg data from mb', data);
                const testObject = data;
                console.log('test data from mb', testObject);
                let filteredReleaseGroups = [];
                for (let i = 0; i < testObject.length; i++) {
                    if (testObject[i].title === truncatedAlbum) {
                        filteredReleaseGroups.push(releaseGroups[i]);
                    }
                }
                //console.log('filtered', filteredReleaseGroups);
                const releaseGroupId = data['release-groups'][0].id;
                const releaseID = data["release-groups"][0].releases[0].id
                const releaseDate = data["release-groups"][0]["first-release-date"]
                const releaseType = data["release-groups"][0]["primary-type"]
                document.querySelector('#release-date').textContent = `${releaseDate}`;
                //                    document.querySelector('#release-type').textContent = `${releaseType}`;
                //https://musicbrainz.org/ws/2/release-group/${releaseGroupID}?inc=aliases+artist-credits+releases+url-rels&fmt=json
                const mbUrl = `https://musicbrainz.org/ws/2/release-group/${releaseGroupId}?inc=aliases+artist-credits+releases+url-rels&fmt=json`;
                console.log('mbUrl for wiki album ', mbUrl)
                    // wiki sandbox ends here
                fetch(mbUrl).then(response => response.json()).then(data => {
                    let relations = data.relations;
                    // search for wikidata here
                    const filtered = relations.find(relation => relation.type === 'wikidata');
                    console.log('wikidataRelation album= ', filtered)
                    var WikiDataURL = filtered.url.resource;
                    console.log('WikiDataURL album= ', WikiDataURL)
                    const wikidataID = WikiDataURL.split('/').pop();
                    const wikipediaURL = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&ids=${wikidataID}&sitefilter=enwiki&origin=*`;
                    fetch(wikipediaURL).then(response => response.json()).then(data => {
                        console.log('wikipedia data: ', data)
                        const entities = data.entities;
                        const entity = entities[Object.keys(entities)[0]];
                        const sitelinks = entity.sitelinks;
                        const enwiki = sitelinks.enwiki;
                        const title = enwiki.title;
                        const wikipediaPageURL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${encodeURIComponent(title)}&origin=*`;
                        const wikipediaPageURLdirect = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
                        //console.log('direct link ', wikipediaPageURLdirect);
                        // document.querySelector('#wiki-album-page-link').href = wikipediaPageURLdirect;
                        // const formattedBio = artistBioFull.replace(/\n/g, '<br>');
                        console.log('wikipediaPageURLdirect: ', wikipediaPageURLdirect);
                        document.getElementById("wiki-album-link").href = wikipediaPageURLdirect;
                        return fetch(wikipediaPageURL);
                    }).then(response => response.json()).then(data => {
                        const pages = data.query.pages;
                        const page = pages[Object.keys(pages)[0]];
                        const extract = page.extract;
                        //const truncatedExtract = extract;
                        let truncatedExtract = extract.split(" ").slice(0, 105).join(" ") + "...";
                        ////console.log(truncatedExtract);
                        const formattedExtract = extract.replace(/<\/p><p>/g, "</p><br><p>");
                        // const formattedExtract= extract;
                        console.log('third wiki: ', formattedExtract);
                        document.getElementById('wikipedia_album').innerHTML = formattedExtract;
                        //href here wiki-album-link
                    })
                })
            });;
            // fetch artist images fromd deezer 
            // Fetch artist bio
            fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodedArtist}&api_key=${apiKey}&format=json`).then(response => response.json()).then(data => {
                let artistBio = data.artist.bio.summary;
                //const artistBioFull = data.artist.bio.content;
                const artistBioName = data.artist.name;
                //const formattedBio = artistBioFull.replace(/\n/g, '<br>');
                artistBio = artistBio.replace(/<a[^>]*>([^<]+)<\/a>/gi, '...');
                //console.log('Artist info: ', data);
                ////console.log(`Artist bio summary: ${artistBio}`);
                //console.log('Artist info full: ${artistBioFull}', );
                //document.querySelector('#artist-bio').innerHTML = artistBio;
                document.querySelector('#artist-bio-name').innerHTML = artistBioName;
                const tags = data.artist.tags.tag;
                let tagLinks = '';
                //console.log('tags ', tags);
                tags.forEach(tag => {
                    tagLinks += `<a href="${tag.url}" target="_blank">${tag.name}</a> `;
                });
                document.getElementById('artist-tags').innerHTML = tagLinks;
                const similarArtists = data.artist.similar.artist;
                //console.log('similar artists ', similarArtists);
                let artistLinks = '';
                similarArtists.forEach(artist => {
                    artistLinks += `<a href="${artist.url}" target="_blank">${artist.name}</a> `;
                });
                document.getElementById('similar-artists').innerHTML = artistLinks;
                const url = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodedArtist}&fmt=json`;
                //console.log('Mb artist ', url);
                fetch(url).then(response => response.json()).then(data => {
                    const mbArtistID = data.artists[0].id;
                    const mbArtist = data.artists[0];
                    //console.log('artist data from mb:  ', data);
                    //console.log('artist id:  ', mbArtistID);
                    const mbArtistURL = `https://musicbrainz.org/ws/2/release-group?artist=${mbArtistID}&type=album&fmt=json`;
                    fetch(mbArtistURL).then(response => response.json()).then(data => {
                        const releaseGroups = data['release-groups'];
                        releaseGroups.sort((a, b) => new Date(a['first-release-date']) - new Date(b['first-release-date']));
                        let html = '<ul>';
                        releaseGroups.forEach(releaseGroup => {
                            const title = releaseGroup.title;
                            const date = releaseGroup['first-release-date'];
                            const type = releaseGroup['primary-type'];
                            const mbID = releaseGroup.id;
                            const lastfmURL = `https://www.last.fm/music/${encodeURIComponent(encodedArtist)}/${encodeURIComponent(title)}`;
                            const aotyURL = `https://www.albumoftheyear.org/search/albums/?q=${encodeURIComponent(title)}`;
                            const mbURL = `https://musicbrainz.org/release-group/${mbID}`;
                            html += `<li><a href="${lastfmURL}" target="_blank"><img src="images/last.fm.png" alt="${title}" ></a><a href="${aotyURL}" target="_blank"><img src="images/aoty.png" alt="${title}"></a><a href="${mbURL}" target="_blank"><img src="images/mb.png" alt="${title}"></a><span>${title} (${date})</span></li>`;
                        });
                        html += '</ul>';
                        document.getElementById('albums').innerHTML = html;
                        /// code pasted here
                        const mbURLwiki = `https://musicbrainz.org/ws/2/artist/${mbArtistID}?inc=url-rels&fmt=json`;
                        // james blake doesn't work
                        //console.log('debug url:', mbURLwiki)
                        fetch(mbURLwiki).then(response => response.json()).then(data => {
                            let relations = data.relations;
                            const wikidataRelation = relations.find(relation => relation.type === 'wikidata');
                            const wikidataURL = wikidataRelation.url.resource;
                            const wikidataID = wikidataURL.split('/').pop();
                            const wikipediaURL = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&ids=${wikidataID}&sitefilter=enwiki&origin=*`;
                            // this removes all the entries from the relations array with an empty source-credit (i.e.: all aliases are removed)
                            let filteredRelations = data.relations.filter(relation => !relation['source-credit']);
                            //console.log('filteredRelations urls: ', filteredRelations);
                            const urls = filteredRelations.filter(relation => ['last.fm', 'allmusic', 'discogs'].includes(relation.type)).map(relation => ({
                                url: relation.url.resource
                                , type: relation.type
                            }));
                            console.log('relations urls: ', data);
                            const relationsDiv = document.getElementById('relations-auto');
                            relationsDiv.innerHTML = '';
                            urls.forEach(url => {
                                const img = document.createElement('img');
                                img.src = `images/${url.type}.png`;
                                const a = document.createElement('a');
                                a.href = url.url;
                                a.target = '_blank';
                                a.appendChild(img);
                                relationsDiv.appendChild(a);
                            });
                            // relationships end here
                            //console.log('first wiki: ', wikipediaURL);
                            // add more artist info here 
                            const artistOrigin = data.country;
                            const artistLifespan = data["life-span"].begin;
                            const artistType = data.type;
                            const artistArea = data.area.name;
                            const artistName = data.name;
                            const lastArtistUrl = `https://www.last.fm/music/${encodeURIComponent(artistName)}`;
                            //console.log('Logged from MB! ', lastArtistUrl);
                            document.querySelector('#artist-from').textContent = `${artistOrigin}`;
                            document.querySelector('#artist-area').textContent = `${artistArea}`;
                            document.querySelector('#artist-lifespan').textContent = `${artistLifespan}`;
                            document.querySelector('#artist-type').textContent = `${artistType}`;
                            document.getElementById("last_artist_link").href = lastArtistUrl;
                            const musicBrainzArtistLink = `https://musicbrainz.org/artist/${encodeURIComponent(mbArtistID)}`;
                            //console.log('artist id link for link ', musicBrainzArtistLink);
                            document.querySelector('#mb-artist-link').href = musicBrainzArtistLink;
                            const aotyArtistSearch = `https://www.albumoftheyear.org/search/artists/?q=${encodeURIComponent(artistBioName)}`;
                            document.querySelector('#aoty-artist-link').href = aotyArtistSearch;
                            /// go on to grab the wikipdia data
                            return fetch(wikipediaURL);
                        }).then(response => response.json()).then(data => {
                            const entities = data.entities;
                            const entity = entities[Object.keys(entities)[0]];
                            const sitelinks = entity.sitelinks;
                            const enwiki = sitelinks.enwiki;
                            const title = enwiki.title;
                            const wikipediaPageURL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${encodeURIComponent(title)}&origin=*`;
                            const wikipediaPageURLdirect = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
                            //console.log('direct link ', wikipediaPageURLdirect);
                            document.querySelector('#wiki-page-link').href = wikipediaPageURLdirect;
                            // const formattedBio = artistBioFull.replace(/\n/g, '<br>');
                            //console.log('second wiki: ', wikipediaPageURL);
                            return fetch(wikipediaPageURL);
                        }).then(response => response.json()).then(data => {
                            const pages = data.query.pages;
                            const page = pages[Object.keys(pages)[0]];
                            const extract = page.extract;
                            //const truncatedExtract = extract;
                            let truncatedExtract = extract.split(" ").slice(0, 105).join(" ") + "...";
                            ////console.log(truncatedExtract);
                            const formattedExtract = extract.replace(/<\/p><p>/g, "</p><br><p>");
                            // const formattedExtract= extract;
                            ////console.log('third wiki: ', formattedExtract);
                            document.getElementById('wikipedia').innerHTML = formattedExtract;
                            //document.getElementById('wikipedia').innerHTML = formattedExtract;
                            document.querySelector('#artist-bio').innerHTML = truncatedExtract;
                        });
                        // until here
                    });
                });
            });
            // I populate the last played track here 
            lastPlayedTrack = currentTrack;
        } /// this is the end bracket for the if statement 
    }); // these are the final brackets for the first fetch (get new playing onfo) requests
}
/// now playing function ends here 
var pageHeight = document.documentElement.scrollHeight;
console.log(pageHeight);
window.onload = function () {
    var pageHeight = document.documentElement.scrollHeight;
    document.querySelector('#side-bar .content').style.height = pageHeight + 'px';
}

function expandFooter() {
    document.getElementById("footer").style.height = "100%";
}

function collapseFooter() {
    document.getElementById("footer").style.height = "0px";
}
/* Fullscreen */
let elem = document.documentElement;
/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
    }
}
/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
    }
}

function fullscreen() {
    let isFullscreen = document.fullscreen;
    if (isFullscreen == true) {
        closeFullscreen();
    }
    else {
        openFullscreen();
    }
}
// Update the now playing information every 3 seconds
setInterval(updateNowPlaying, 2000);