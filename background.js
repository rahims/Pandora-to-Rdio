var oauth = null;
var playlist_key = 0; // Holds the Rdio playlist ID

// Called when the extension is first loaded.
document.addEventListener('DOMContentLoaded', function () {
	oauth = ChromeExOAuth.initBackgroundPage({
		'request_url': 'http://api.rdio.com/oauth/request_token',
		'authorize_url': 'https://www.rdio.com/oauth/authorize',
		'access_url': 'http://api.rdio.com/oauth/access_token',
		'consumer_key': 'XXXXXXXXXXXXXXXXXXXXXXXX', // Your Rdio API key
		'consumer_secret': 'XXXXXXXXXX' // Your Rdio API shared secret
	});

	// Grab an Rdio oAuth token when the extension is first loaded. Stored in
	// localStorage so that we don't have to ask for authorization again.
	if (!oauth.hasToken())
	{
		oauth.authorize(function() {});
	}
});

function formEncode(params) {
	var encoded = [];

	for (prop in params)
	{
		if (!params.hasOwnProperty(prop)) continue;

		encoded.push(encodeURIComponent(prop) + '=' + encodeURIComponent(params[prop]))
	}

	return encoded.join('&');
};

function rdio(params, onSuccess) {
	var rdioCall = function() {
		oauth.sendSignedRequest('http://api.rdio.com/1/', onSuccess, {
			'method': 'POST',
			'body': formEncode(params)
		});
	};

	if (oauth.hasToken())
	{
		rdioCall();
	}
	else {
		oauth.authorize(rdioCall);
	}
};

function addToPlaylist(artist, title) {
	// Search for the track in Rdio and grab its track key
	var params = {
		'method': 'search',
		'query': artist + ' ' + title,
		'types': 'Track',
		'count': 1
	};

	rdio(params, function(data) {
		res = JSON.parse(data)

		track_key = res['result']['results'][0]['key'];

		// Add the track if we already know the playlist key
		if (playlist_key != 0)
		{
			addTrack(track_key);
		}
		else {
			// Otherwise find the playlist first and then add the track
			findPlaylist(track_key);
		}
	});
};

function addTrack(track_key) {
	var params = {
		'method': 'addToPlaylist',
		'playlist': playlist_key,
		'tracks': track_key
	};

	rdio(params, function(data) {
		console.log('Track added');
	});
};

function findPlaylist(track_key) {
	rdio({'method': 'getPlaylists'}, function(data) {
		res = JSON.parse(data);

		playlists = res['result']['owned']

		for (var i = 0; i < playlists.length; i++)
		{
			playlist = playlists[i];

			if (playlist['name'] == 'Pandora Favorites')
			{
				playlist_key = playlist['key'];
			}
		}

		// If the playlist doesn't exist, create it.
		if (playlist_key == 0)
		{
			var params = {
				'method': 'createPlaylist',
				'name': 'Pandora Favorites',
				'description': 'Favorite songs from Pandora',
				'tracks': track_key
			};

			rdio(params, function(data) {
				res = JSON.parse(data);

				playlist_key = res['result']['key'];
			});
		}
		else {
			addTrack(track_key);
		}
	});
};

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse)
	{
		addToPlaylist(request.artist, request.title);
	}
);
