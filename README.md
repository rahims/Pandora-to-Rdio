# Pandora to Rdio
Pandora to Rdio is a quick Chrome extension I created at the [Austin Music Hackathon](http://austinmusichacks.eventbrite.com/). It takes any track you "thumbs up" in [Pandora](http://www.pandora.com) and adds it to an [Rdio](http://www.rdio.com) playlist.

Use it to take the pain out of creating playlists by letting Pandora do the hard work of finding music you like. The code also serves as a good base for building out more elaborate Pandora integrations, such as a Last.fm scrobbler. If you build something cool, I'd love to hear about it, [rsonawalla@gmail.com](mailto:rsonawalla@gmail.com) / [@rahims](https://twitter.com/rahims).

For more background on this project, please see my [related blog post](http://www.hirahim.com/blog/2012/10/28/saving-pandora-songs-to-rdio/).

## Installation
1. Sign up for a free [Rdio API key](http://developer.rdio.com).
2. Edit `background.js` and set the value for `consumer_key` to your Rdio API key and `consumer_secret` to your Rdio shared secret.
3. Open Chrome, go to Settings, click on Extensions, check the "Developer mode" checkbox.
4. Click on "Load unpacked extension" and select the `pandora-to-rdio` folder.
5. You'll be taken to an Rdio page that prompts you to grant the add-on access to your Rdio account, click "Allow".
6. You're all done. The extension is meant to be unobtrusive, so there aren't any icons to clutter your browser nor any notifications. Set it and forget it.

## Usage
Simply "thumbs up" tracks you enjoy on Pandora, the extension will add the track to an Rdio playlist called "Pandora Favorites". This playlist is automatically created for you.

## License
Copyright (C) 2012 Rahim Sonawalla ([rsonawalla@gmail.com](mailto:rsonawalla@gmail.com) / [@rahims](http://twitter.com/rahims)).

Released under the [MIT license](http://www.opensource.org/licenses/mit-license.php).
