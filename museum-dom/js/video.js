"use strict";

//const changeProgress = (el, val) => {
//	el.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
//		val * 100
//	}%, #c4c4c4 ${val * 100}%, #c4c4c4 100%)`;
//};

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// let players = [];

// function onYouTubeIframeAPIReady() {
// 	document.querySelectorAll("iframe").forEach((iframe, i) => {
// 		if (iframe.src.indexOf("https://www.youtube.com/") == 0) {
// 			if (!iframe.hasAttribute("id")) {
// 				iframe.setAttribute("id", "ytplayer_" + i);
// 			}

// 			players.push(
// 				new YT.Player(iframe.id, {
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

//console.log("players ", players);
let players = [];

function onYouTubeIframeAPIReady() {
	var swiper = document.querySelector(".youtube-swiper");
	var slides = swiper.getElementsByClassName("swiper-slide");

	for (var i = 0; i < slides.length; i++) {
		var element = slides[i].getElementsByClassName("yt-player")[0];
		var id = element.getAttribute("data-id");

		var player = new YT.Player(element, {
			height: "254",
			width: "452",
			videoId: id,
			playerVars: {
				autoplay: false,
				rel: 0,
			},
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
		});
		players.push(player);
	}
	console.log(players);
}

class Ui {
	constructor(el) {
		this.win = $(window);
		this.onResize = this.onResize.bind(this);
		this.init();
	}

	init() {
		console.log(this.win);
		this.addListeners();
	}

	addListeners() {
		this.win.addEventListener("resize", this.onResize);
	}

	onResize() {
		console.log("test");
	}
}

const videoPlayers = document.querySelectorAll("video");
const videoHTML5 = document.querySelectorAll(".video-container");
//const videoContainer = document.querySelector("#test");

class Video {
	constructor(container) {
		this.container = container;
		this.id = container.id;
		this.video = container.querySelector("video");
		this.playbackAnimation = container.querySelector(".playback");
		this.poster = container.querySelector(".poster");
		this.playBigButton = container.querySelector(".play");
		this.playButton = container.querySelector(".playpause");
		this.progressBar = container.querySelector(".progress");
		this.seek = container.querySelector(".seek");
		this.volumeButton = container.querySelector(".mute");
		this.volume = container.querySelector(".volume");
		this.fullscreenButton = container.querySelector(".fs");
		this.togglePlay = this.togglePlay.bind(this);
		this.updatePlayButton = this.updatePlayButton.bind(this);
		this.updateProgress = this.updateProgress.bind(this);
		this.skipAhead = this.skipAhead.bind(this);
		this.updateVolume = this.updateVolume.bind(this);
		this.updateVolumeIcon = this.updateVolumeIcon.bind(this);
		this.toggleMute = this.toggleMute.bind(this);
		this.toggleFullScreen = this.toggleFullScreen.bind(this);
		this.updateFullscreenButton = this.updateFullscreenButton.bind(this);
		this.showPoster = this.showPoster.bind(this);
		this.animatePlayback = this.animatePlayback.bind(this);
		this.playBack = this.playBack.bind(this);
		this.init();
	}
	togglePlay() {
		console.log("this_", this);
		if (this.video.paused || this.video.ended) {
			if (!this.poster.classList.contains("d-none")) {
				this.poster.classList.add("d-none");
			}
			this.video.play();
		} else {
			this.video.pause();
		}
	}

	updatePlayButton() {
		this.playButton.classList.toggle("hide");
		this.playBigButton.classList.toggle("hide");
	}

	skipAhead(event) {
		const skipTo = event.target.dataset.seek
			? event.target.dataset.seek
			: event.target.value;
		this.video.currentTime = skipTo;
		this.progressBar.value = skipTo;
		this.seek.value = skipTo;
	}

	updateVolume() {
		if (this.video.muted) {
			this.video.muted = false;
		}

		this.video.volume = this.volume.value;
		this.changeProgress(this.volume, this.volume.value);
	}

	updateVolumeIcon() {
		if (this.video.muted || this.video.volume === 0) {
			this.volumeButton.classList.add("hide");
		} else {
			this.volumeButton.classList.remove("hide");
		}
	}

	toggleMute() {
		this.video.muted = !this.video.muted;

		if (this.video.muted) {
			this.volume.setAttribute("data-volume", this.volume.value);
			this.volume.value = 0;
			this.changeProgress(this.volume, 0);
		} else {
			this.volume.value = this.volume.dataset.volume;
			this.changeProgress(this.volume, this.volume.dataset.volume);
		}
	}

	toggleFullScreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			this.container.requestFullscreen();
		}
	}

	updateFullscreenButton() {
		this.fullscreenButton.classList.toggle("hide");
	}

	showPoster() {
		this.poster.classList.remove("d-none");
		this.video.currentTime = 0;
	}

	animatePlayback() {
		// анимация множителя скорости проигрывания видео
		this.playbackAnimation.animate(
			[
				{
					opacity: 1,
					transform: "scale(1)",
				},
				{
					opacity: 0,
					transform: "scale(1.3)",
				},
			],
			{
				duration: 500,
			}
		);
	}

	updateProgress() {
		this.seek.value = Math.floor(this.video.currentTime);
		this.progressBar.value = Math.floor(this.video.currentTime);
	}

	playBack(x) {
		let speed = this.video.playbackRate + x;
		if (!(speed > 2 || speed == 0)) {
			this.video.playbackRate = speed;
			this.playbackAnimation.textContent = `${speed}x`;
		}
		this.animatePlayback();
	}

	initializeVideo() {
		const videoDuration = Math.round(this.video.duration);
		this.progressBar.setAttribute("max", videoDuration);
		this.seek.setAttribute("max", videoDuration);
		this.volume.value = 0.5;
		this.changeProgress(this.volume, 0.5);
	}

	changeProgress(el, val) {
		el.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
			val * 100
		}%, #c4c4c4 ${val * 100}%, #c4c4c4 100%)`;
	}

	addListeners() {
		this.playBigButton.addEventListener("click", this.togglePlay);
		this.playButton.addEventListener("click", this.togglePlay);
		this.poster.addEventListener("click", this.togglePlay);
		this.video.addEventListener("play", this.updatePlayButton);
		this.video.addEventListener("pause", this.updatePlayButton);
		this.video.addEventListener("timeupdate", this.updateProgress);
		this.video.addEventListener("volumechange", this.updateVolumeIcon);
		this.video.addEventListener("click", this.togglePlay);
		this.video.addEventListener("ended", this.showPoster);
		this.seek.addEventListener("input", this.skipAhead);
		this.volume.addEventListener("input", this.updateVolume);
		this.volumeButton.addEventListener("click", this.toggleMute);
		this.fullscreenButton.addEventListener("click", this.toggleFullScreen);
		this.container.addEventListener(
			"fullscreenchange",
			this.updateFullscreenButton
		);
	}

	init() {
		console.log("init!!!!");
		const recurs = () => {
			if (this.video.duration !== NaN && Math.round(this.video.duration) > 0) {
				this.initializeVideo();
			} else {
				setTimeout(recurs, 100);
			}
		};
		recurs();
		this.addListeners();
	}
}

const mainVideo = (container) => {
	const video = container.querySelector("video");
	const playbackAnimation = container.querySelector(".playback");
	const poster = container.querySelector(".poster");
	const playBigButton = container.querySelector(".play");
	const playButton = container.querySelector(".playpause");
	const progressBar = container.querySelector(".progress");
	const seek = container.querySelector(".seek");
	const volumeButton = container.querySelector(".mute");
	const volume = container.querySelector(".volume");
	const fullscreenButton = container.querySelector(".fs");

	function togglePlay() {
		if (video.paused || video.ended) {
			if (!poster.classList.contains("d-none")) {
				poster.classList.add("d-none");
			}
			video.play();
		} else {
			video.pause();
		}
	}

	function updatePlayButton() {
		playButton.classList.toggle("hide");
		playBigButton.classList.toggle("hide");
	}

	function initializeVideo() {
		const videoDuration = Math.round(video.duration);
		progressBar.setAttribute("max", videoDuration);
		seek.setAttribute("max", videoDuration);
		volume.value = 0.5;
		changeProgress(volume, 0.5);
	}

	function updateProgress() {
		seek.value = Math.floor(video.currentTime);
		progressBar.value = Math.floor(video.currentTime);
	}

	function skipAhead(event) {
		const skipTo = event.target.dataset.seek
			? event.target.dataset.seek
			: event.target.value;
		video.currentTime = skipTo;
		progressBar.value = skipTo;
		seek.value = skipTo;
	}

	function updateVolume() {
		if (video.muted) {
			video.muted = false;
		}

		video.volume = volume.value;
		changeProgress(volume, volume.value);
	}

	function updateVolumeIcon() {
		if (video.muted || video.volume === 0) {
			volumeButton.classList.add("hide");
		} else {
			volumeButton.classList.remove("hide");
		}
	}

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

	function toggleFullScreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			container.requestFullscreen();
		}
	}

	function updateFullscreenButton() {
		fullscreenButton.classList.toggle("hide");
	}

	function showPoster() {
		poster.classList.remove("d-none");
		video.currentTime = 0;
	}

	function animatePlayback() {
		// анимация множителя скорости проигрывания видео
		playbackAnimation.animate(
			[
				{
					opacity: 1,
					transform: "scale(1)",
				},
				{
					opacity: 0,
					transform: "scale(1.3)",
				},
			],
			{
				duration: 500,
			}
		);
	}

	function playBack(x) {
		let speed = video.playbackRate + x;
		if (!(speed > 2 || speed == 0)) {
			video.playbackRate = speed;
			playbackAnimation.textContent = `${speed}x`;
		}
		animatePlayback();
	}

	function keyboardShortcuts(event) {
		videoSwiper;
		const { key } = event;
		switch (key) {
			case " ":
				togglePlay();
				break;
			case ">":
				playBack(0.25);
				break;
			case "<":
				playBack(-0.25);
				break;
			case "m":
				toggleMute();
				break;
			case "f":
				toggleFullScreen();
				break;
		}
	}

	const init = (cb) => {
		const recurs = () => {
			if (video.duration !== NaN && Math.round(video.duration) > 0) {
				cb();
			} else {
				setTimeout(recurs, 100);
			}
		};
		recurs();
	};

	init(initializeVideo);

	playButton.addEventListener("click", togglePlay);
	playBigButton.addEventListener("click", togglePlay);
	poster.addEventListener("click", togglePlay);
	video.addEventListener("play", updatePlayButton);
	video.addEventListener("pause", updatePlayButton);
	video.addEventListener("timeupdate", updateProgress);
	video.addEventListener("volumechange", updateVolumeIcon);
	video.addEventListener("click", togglePlay);
	video.addEventListener("ended", showPoster);
	seek.addEventListener("input", skipAhead);
	volume.addEventListener("input", updateVolume);
	volumeButton.addEventListener("click", toggleMute);
	fullscreenButton.addEventListener("click", toggleFullScreen);
	container.addEventListener("fullscreenchange", updateFullscreenButton);

	//video.addEventListener("loadedmetadata", initializeVideo); // не всегда срабатывает!!! так как видео уже загружено
	//document.addEventListener("keyup", keyboardShortcuts); //если использовать одно видео, если есть input нужно их исключить!!!
};

// валидация номера телефона (2)
// возможность одновременного воспроизведения только одного видео (2) есть ошибки в консоле!!!
// галерея изображений (8)
// итого 140

function geSlideDataIndex(swipe) {
	var activeIndex = swipe.activeIndex;
	var slidesLen = swipe.slides.length;
	if (swipe.params.loop) {
		switch (swipe.activeIndex) {
			case 0:
				activeIndex = slidesLen - 3;
				break;
			case slidesLen - 1:
				activeIndex = 0;
				break;
			default:
				--activeIndex;
		}
	}
	return activeIndex;
}

function getSlideActive(swipe) {
	const slides = swipe.slides;
	let activeSlideID = false;
	slides.forEach((slide) => {
		if (slide.classList.contains("swiper-slide-active")) {
			activeSlideID = slide.querySelector(".video-container").id;
		}
	});
	return activeSlideID;
}

function keyboardShortcuts(event) {
	console.log("this ", this);
	console.log("target ", event.target);
	if (
		this !== event.target &&
		(/textarea|select|input/i.test(event.target.nodeName) ||
			event.target.type === "text")
	) {
		return;
	}
	const { key } = event;
	if (key === " " || key === "<" || key === ">" || key === "m" || key === "f") {
		event.preventDefault();
		const video_id = getSlideActive(videoSwiper);
		const video = bigVideo.filter((e) => e.id === video_id);
		switch (key) {
			case " ":
				video[0].togglePlay();
				break;
			case ">":
				video[0].playBack(0.25);
				break;
			case "<":
				video[0].playBack(-0.25);
				break;
			case "m":
				console.log("mute");
				video[0].toggleMute();
				break;
			case "f":
				video[0].toggleFullScreen();
				break;
		}
	}
}

const bigVideo = [];

videoHTML5.forEach((v, i) => {
	v.setAttribute("id", "video_" + i);
	bigVideo.push(new Video(v));
});

console.log("bigVideo");

//document.addEventListener("keyup", keyboardShortcuts);
document.addEventListener("keydown", keyboardShortcuts);
