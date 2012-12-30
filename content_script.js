var insertListener = function(event){
  if (event.animationName == "nodeInserted") {
    var slides = $(".slide");
    if(slides.length >= 2) {
        var slide = $(slides[1]);
        var selector = slide.find(".thumbUp");

        var $hiddenSongTitle = $('<input/>',{type:'hidden',class:"rdioSongTitle",value:$(".playerBarSong").text()});
        var $hiddenArtist = $('<input/>',{type:'hidden',class:"rdioArtist",value:$(".playerBarArtist").text()});
        selector.append($hiddenSongTitle);
        selector.append($hiddenArtist);
    }
  }
}

document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome + Safari

$('.slides').on('click', '.thumbUp', function(event){
    var title = $(event.target.parentNode).find(".rdioSongTitle").attr("value");
    var artist = $(event.target.parentNode).find(".rdioArtist").attr("value");
    chrome.extension.sendMessage({"artist": artist, "title": title});
});

$(".thumbUpButton").click(function() {
    var title = $(".playerBarSong").text();
    var artist = $(".playerBarArtist").text();
    chrome.extension.sendMessage({"artist": artist, "title": title});
});
