# dash.fm
Now playing dashboard for last.fm

This is an html / javascript dashboard that can be used to display album art and information about your currently playing artist. It should run without a server, but you can also deploy it to somewhere like https://www.w3schools.com/spaces/. 

Setup is simple: Get a last.fm api key, following these instructions; https://www.last.fm/api/authentication
Edit the key.js file and insert your api key. It is a string with characters and numbers.

To view your own, or someoneelse's now dashboard, just change the url (or append it with: index.html?u=RJ, where RJ is the name of the user. 

The dashboard has three main views: first, a simple abum art view, with song title, artist and album. If you hover, you'll get more detail, like the artist bio. Next to the artist bio, there is an option to view the full biography, or view the website in full screen. 

The images are taken from coverart archive and might load a little slow, so be patient. If you listen to an album, this not an issue. Older albums (i.e.: released before the streaming age) sometimes have very old album covers. New releases should work better. 

The dashboard works only as good as your tags, so faulty tags will result in incorrect art or bios. 
