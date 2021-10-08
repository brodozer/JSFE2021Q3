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
					//host: "https://www.youtube.com",
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

const changeProgress = (el, val) => {
	el.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
		val * 100
	}%, #c4c4c4 ${val * 100}%, #c4c4c4 100%)`;
};

const videoPlayers = document.querySelectorAll("video");
const videoHTML5 = document.querySelectorAll(".video-container");
//const videoContainer = document.querySelector("#test");

const mainVideo = (container) => {
	const video = container.querySelector("video");
	const playbackAnimation = container.querySelector(".play");
	const playButton = container.querySelector(".playpause");
	const progressBar = container.querySelector(".progress");
	const seek = container.querySelector(".seek");
	const volumeButton = container.querySelector(".mute");
	const volume = container.querySelector(".volume"); // input type range
	const fullscreenButton = container.querySelector(".fs");

	function togglePlay() {
		if (video.paused || video.ended) {
			video.play();
		} else {
			video.pause();
		}
	}

	function updatePlayButton() {
		playButton.classList.toggle("hide");
		playbackAnimation.classList.toggle("hide");
	}

	// initializeVideo sets the video duration, and maximum value of the
	// progressBar
	function initializeVideo() {
		const videoDuration = Math.round(video.duration);
		progressBar.setAttribute("max", videoDuration);
		seek.setAttribute("max", videoDuration);
		// тут можно инитить уровень громкости для всех видео
		volume.value = 0.5;
		changeProgress(volume, 0.5);
	}

	// updateProgress indicates how far through the video
	// the current playback is by updating the progress bar

	function updateProgress() {
		seek.value = Math.floor(video.currentTime);
		progressBar.value = Math.floor(video.currentTime);
	}

	// skipAhead jumps to a different point in the video when the progress bar
	// is clicked
	function skipAhead(event) {
		// это будет в горячих клавишах, прописать на сколько увеличивать или уменьшать!!
		const skipTo = event.target.dataset.seek
			? event.target.dataset.seek
			: event.target.value;
		video.currentTime = skipTo;
		progressBar.value = skipTo;
		seek.value = skipTo;
	}

	// updateVolume updates the video's volume
	// and disables the muted state if active
	function updateVolume() {
		if (video.muted) {
			video.muted = false;
		}

		video.volume = volume.value; // значение из input
		changeProgress(volume, volume.value);
	}
	// updateVolumeIcon updates the volume icon so that it correctly reflects
	// the volume of the video
	function updateVolumeIcon() {
		if (video.muted || video.volume === 0) {
			volumeButton.classList.add("hide");
		} else {
			volumeButton.classList.remove("hide");
		}
	}

	// toggleMute mutes or unmutes the video when executed
	// When the video is unmuted, the volume is returned to the value
	// it was set to before the video was muted
	function toggleMute() {
		video.muted = !video.muted;

		if (video.muted) {
			volume.setAttribute("data-volume", volume.value);
			volume.value = 0;
			changeProgress(volume, 0);
		} else {
			volume.value = volume.dataset.volume;
			changeProgress(volume, volume.dataset.volume);
		}
	}

	// toggleFullScreen toggles the full screen state of the video
	// If the browser is currently in fullscreen mode,
	// then it should exit and vice versa.
	function toggleFullScreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			container.requestFullscreen();
		}
	}

	// updateFullscreenButton changes the icon of the full screen button
	// and tooltip to reflect the current full screen state of the video
	function updateFullscreenButton() {
		fullscreenButton.classList.toggle("hide");
	}

	function showPoster() {
		let src = video.currentSrc;
		video.src = "";
		video.src = src;
	}

	// keyboardShortcuts executes the relevant functions for
	// each supported shortcut key
	// function keyboardShortcuts(event) {
	// 	const { key } = event;
	// 	switch (key) {
	// 		case "k":
	// 			togglePlay();
	// 			animatePlayback();
	// 			if (video.paused) {
	// 				showControls();
	// 			} else {
	// 				setTimeout(() => {
	// 					hideControls();
	// 				}, 2000);
	// 			}
	// 			break;
	// 		case "m":
	// 			toggleMute();
	// 			break;
	// 		case "f":
	// 			toggleFullScreen();
	// 			break;
	// 		case "p":
	// 			togglePip();
	// 			break;
	// 	}
	// }

	// Add eventlisteners here
	playButton.addEventListener("click", togglePlay);
	playbackAnimation.addEventListener("click", togglePlay);

	video.addEventListener("play", updatePlayButton);
	video.addEventListener("pause", updatePlayButton);
	// init video
	video.addEventListener("loadedmetadata", initializeVideo);
	//update progressBar
	video.addEventListener("timeupdate", updateProgress);
	//update volume
	video.addEventListener("volumechange", updateVolumeIcon);
	video.addEventListener("click", togglePlay);
	//ended video
	video.addEventListener("ended", showPoster);
	//skip video
	seek.addEventListener("input", skipAhead);
	//volume
	volume.addEventListener("input", updateVolume);
	volumeButton.addEventListener("click", toggleMute);
	//fullscreen
	fullscreenButton.addEventListener("click", toggleFullScreen);
	container.addEventListener("fullscreenchange", updateFullscreenButton);

	//document.addEventListener("keyup", keyboardShortcuts);
};

//mainVideo(videoContainer);

videoHTML5.forEach((v) => {
	mainVideo(v);
});
