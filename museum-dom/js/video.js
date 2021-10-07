"use strict";

//video может быть сюда перенести слайдеры для видео?

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let players = [];

function onYouTubeIframeAPIReady() {
	document.querySelectorAll("iframe").forEach((iframe, i) => {
		if (iframe.src.indexOf("https://www.youtube.com/") == 0) {
			if (!iframe.hasAttribute("id")) {
				iframe.setAttribute("id", "ytplayer_" + i);
			}

			players.push(
				new YT.Player(iframe.id, {
					host: "https://www.youtube.com",
					events: {
						onStateChange: function (event) {
							if (event.data == YT.PlayerState.PLAYING) {
								players.forEach((player) => {
									if (player.id != event.target.id) {
										player.pauseVideo();
									}
								});
							}
						},
					},
				})
			);
		}
	});
}

console.log("players ", players);
