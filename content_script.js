$(".thumbUpButton").click(function() {
	var title = $(".playerBarSong").text();
	var artist = $(".playerBarArtist").text();

	chrome.extension.sendMessage({"artist": artist, "title": title});
});
