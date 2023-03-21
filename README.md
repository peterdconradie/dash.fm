# dash.fm: a now playing dashboard for last.fm
This dashboard displays album art and information about the artist currently playing, fetched from the last.fm API. It can run without a server or easily be deployed to a site using https://www.w3schools.com/spaces/. 

## Setup
Setup involves obtaining a last.fm API key and inserting it into the key.js file. The dashboard can display your own or another user’s information by changing the URL: index.html?u=RJ, where RJ is the name of the user. 

It has three main views: album art with song details, artist bio with an option for full biography or full screen view, and images from the coverart archive. The dashboard’s accuracy depends on the correctness of your tags.

## Known Issues
* On some streaming platforms (i.e.: Tidal), collaborating artists get lumped together as artist (i.e.: see https://www.last.fm/music/Skrillex,+Missy+Elliott+&+Mr.+Oizo) when there are more than one performer on a track. This can cause issue when finding the correct info.
* The link to Genius might break, depending on the formatting of the song title and the punctuation it contains. Google search is usually faster anyway, but Genius tends to give more detail, so I've kept both. 
* For classic albums you might get some very old cover art, or coverartarchive may struggle to find the correct cover. You might even laserdisc or minidisc covers from time to ime, or obscure photographed Japanese releases. For new releases this isn't a problem. If a cover can't be found at all, you can always add some yourself: https://musicbrainz.org/doc/How_to_Add_Cover_Art
* It can take some time to get the cover art from coverartarchive.org. As a workaround, I first get a smaller image and then the big one. This is only an issue when you switch albums of course. In the background, I also fetch the last.fm image, but it is quite low res.

## Screenshots
### Just the album
![No detail](https://github.com/peterdconradie/dash.fm/blob/main/screens/no_detail_view.png)

### More info
![Detail](https://github.com/peterdconradie/dash.fm/blob/main/screens/detail_view.png)

### Full artist bio
![Full artist bio](https://github.com/peterdconradie/dash.fm/blob/main/screens/full_bio.png)