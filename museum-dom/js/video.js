"use strict";

//video может быть сюда перенести слайдеры для видео?

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let players = [];

// function onYouTubeIframeAPIReady() {
// 	document.querySelectorAll("iframe").forEach((iframe, i) => {
// 		if (iframe.src.indexOf("https://www.youtube.com/") == 0) {
// 			if (!iframe.hasAttribute("id")) {
// 				iframe.setAttribute("id", "ytplayer_" + i);
// 			}

// 			players.push(
// 				new YT.Player(iframe.id, {
// 					host: "https://www.youtube.com",
// 					events: {
// 						onStateChange: function (event) {
// 							if (event.data == YT.PlayerState.PLAYING) {
// 								players.forEach((player) => {
// 									if (player.id != event.target.id) {
// 										player.pauseVideo();
// 									}
// 								});
// 							}
// 						},
// 					},
// 				})
// 			);
// 		}
// 	});
// }

console.log("players ", players);

//const videoContainer = document.querySelectorAll(".video-container");
const videoContainer = document.querySelector("#test");

const mainVideo = (container) => {
	const video = container.querySelector("video");
	const playbackAnimation = container.querySelector(".play");
	const playButton = container.querySelector(".playpause");
	const progressBar = container.querySelector(".progress");
	const volumeButton = container.querySelector(".mute");
	const volume = container.querySelector(".volume"); // input type range
	const fullscreenButton = container.querySelector(".fs");

	// Add functions here

	// togglePlay toggles the playback state of the video.
	// If the video playback is paused or ended, the video is played
	// otherwise, the video is paused
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
		//const videoDuration = Math.round(video.duration);
		//progressBar.setAttribute("max", videoDuration);
		// инит уровня громкости !!!
		progressBar.setAttribute("max", 100);
	}

	// updateProgress indicates how far through the video
	// the current playback is by updating the progress bar

	function updateProgress() {
		const progressValue = Math.floor(
			(video.currentTime * 100) / video.duration
		);

		//const progressValue = Math.floor(video.currentTime);
		progressBar.value = progressValue;
		changeProgress(progressBar, progressValue);
		// changeProgress(
		// 	progressBar,
		// 	Math.floor((progressValue * 100) / progressBar.max)
		// );
	}

	// skipAhead jumps to a different point in the video when the progress bar
	// is clicked
	function skipAhead(event) {
		// это будет в горячих клавишах, прописать на сколько увеличивать или уменьшать!!
		// const skipTo = event.target.dataset.seek
		// 	? event.target.dataset.seek
		// 	: event.target.value;
		const skipTo = Math.floor((video.duration * event.target.value) / 100);
		video.currentTime = skipTo;
		progressBar.value = event.target.value;
		//progressBar.value = skipTo;
	}

	// updateVolume updates the video's volume
	// and disables the muted state if active
	function updateVolume() {
		if (video.muted) {
			video.muted = false;
		}

		video.volume = volume.value; // значение из input
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
			changeProgress(volume, volume.dataset.volume * 100);
		}
	}

	// toggleFullScreen toggles the full screen state of the video
	// If the browser is currently in fullscreen mode,
	// then it should exit and vice versa.
	function toggleFullScreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			videoContainer.requestFullscreen();
		}
	}

	// updateFullscreenButton changes the icon of the full screen button
	// and tooltip to reflect the current full screen state of the video
	function updateFullscreenButton() {
		fullscreenButton.classList.toggle("hide");
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

	//skip video
	progressBar.addEventListener("input", skipAhead);
	//volume
	volume.addEventListener("input", updateVolume);
	volumeButton.addEventListener("click", toggleMute);
	//fullscreen
	fullscreenButton.addEventListener("click", toggleFullScreen);
	videoContainer.addEventListener("fullscreenchange", updateFullscreenButton);

	//document.addEventListener("keyup", keyboardShortcuts);
};

mainVideo(videoContainer);
