# dash.fm: a now playing dashboard for last.fm
This dashboard displays album art and information about the artist currently playing, fetched from the last.fm API. It can run without a server or easily be deployed to a site using https://www.w3schools.com/spaces/. 

# Setup
Setup involves obtaining a last.fm API key and inserting it into the key.js file. The dashboard can display your own or another user’s information by changing the URL: index.html?u=RJ, where RJ is the name of the user. 

It has three main views: album art with song details, artist bio with an option for full biography or full screen view, and images from the coverart archive. The dashboard’s accuracy depends on the correctness of your tags.


# Known Issues
* On some streamings platforms (i.e.: Tidal), artists get lumped together when there are more than one on a track. This can cause issue when finding the correct info. 
* The link to Genius might break, depending on the the formatting of the song title. 
* For classic albums you might get some very old cover art, or coverartarchive may struggle to find the currect art.

# Screenshots
![No detail](https://github.com/peterdconradie/dash.fm/blob/main/screens/no_detail_view.png)

![Detail](https://github.com/peterdconradie/dash.fm/blob/main/screens/detail_view.png)

![Full artist bio](https://github.com/peterdconradie/dash.fm/blob/main/screens/full_bio.png)
 