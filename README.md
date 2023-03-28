# dash.fm: a now playing dashboard for last.fm
This dashboard displays album art and information about the artist and track currently playing on last.fm for a particular use. It fetches data from the last.fm, Wikipedia, Musicbrainz and Deezer APIs. It can run without a server or easily be deployed to a site using https://www.w3schools.com/spaces/ or netlify.com.

## Setup
Setup involves obtaining a last.fm API key and inserting it into the key.js file. The dashboard can display your own or another user’s information by changing the URL: index.html?u=RJ, where RJ is the name of the user. 

It has three main views: album art with song details, artist bio with an option for full biography or full screen view, and images from the coverart archive. The dashboard’s accuracy depends on the correctness of your tags.

## Known Issues
* On some streaming platforms (i.e.: Tidal), collaborating artists get lumped together in a single artist tag (i.e.: see https://www.last.fm/music/Skrillex,+Missy+Elliott+&+Mr.+Oizo) when there are more than one performer on a track. This can cause issues when finding the correct info.
* The link to Genius Lyrics might break, depending on the formatting of the song title and the punctuation it contains. Google search is usually faster anyway and will always work, but Genius tends to give more detail, so I've kept both. 
* Some more obscure albums (mostly compilations) can be hard to find via the deezer api.


## Screenshots
### Just the album
![No detail](https://github.com/peterdconradie/dash.fm/blob/main/screens/no_detail_view.png)

### More info
![Detail](https://github.com/peterdconradie/dash.fm/blob/main/screens/detail_view.png)

### Full artist bio
![Full artist bio](https://github.com/peterdconradie/dash.fm/blob/main/screens/full_bio.png)
