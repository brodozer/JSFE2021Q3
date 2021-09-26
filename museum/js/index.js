"use strict";

const swiperWelcome = new Swiper(".swiper-welcome", {
	loop: true,
	slidesPerView: 1,
	pagination: {
		el: ".pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".button-next",
		prevEl: ".button-prev",
	},
});

const current = document.querySelector(".swiper-welcome .current");

swiperWelcome.on("slideChange", function () {
	let index = swiperWelcome.realIndex;
	current.innerHTML = `0${++index}`;
});

// slider compare

const imgCompare = document.querySelector(".explore");

const compareSlider = imgCompare.querySelector(".img-comp-slider input");
const dragLine = imgCompare.querySelector(".slider-drag-line");
const overlay = imgCompare.querySelector(".img-before");

compareSlider.addEventListener("input", () => {
	let sliderVal = compareSlider.value;
	console.log(sliderVal);
	dragLine.style.left = `${sliderVal}%`;
	overlay.style.width = `${sliderVal}%`;
});

// art gallery

const gallery = [
	'<img src="/assets/img/galery/galery1.jpg" alt="galery1" />',
	'<img src="/assets/img/galery/galery2.jpg" alt="galery2" />',
	'<img src="/assets/img/galery/galery3.jpg" alt="galery3" />',
	'<img src="/assets/img/galery/galery4.jpg" alt="galery4" />',
	'<img src="/assets/img/galery/galery5.jpg" alt="galery5" />',
	'<img src="/assets/img/galery/galery6.jpg" alt="galery6" />',
	'<img src="/assets/img/galery/galery7.jpg" alt="galery7" />',
	'<img src="/assets/img/galery/galery8.jpg" alt="galery8" />',
	'<img src="/assets/img/galery/galery9.jpg" alt="galery9" />',
	'<img src="/assets/img/galery/galery10.jpg" alt="galery10" />',
	'<img src="/assets/img/galery/galery11.jpg" alt="galery11" />',
	'<img src="/assets/img/galery/galery12.jpg" alt="galery12" />',
	'<img src="/assets/img/galery/galery13.jpg" alt="galery13" />',
	'<img src="/assets/img/galery/galery14.jpg" alt="galery14" />',
	'<img src="/assets/img/galery/galery15.jpg" alt="galery15" />',
];

const pictureInnerContainer = document.querySelector(
	".picture-inner-container"
);

const shuffle = (array) => {
	let currentIndex = array.length,
		randomIndex;
	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};

let html = "";

shuffle(gallery).forEach((img) => {
	html += img;
});

pictureInnerContainer.innerHTML = html;

// video

const youtubeSwiper = new Swiper(".youtube-swiper", {
	loop: true,
	spaceBetween: 45,
	slidesPerView: 3,
	navigation: {
		nextEl: ".button-next",
		prevEl: ".button-prev",
	},
	pagination: {
		el: ".pagination",
		clickable: true,
	},
});

const videoSwiper = new Swiper(".video-swiper", {
	loop: true,
	allowTouchMove: false,
	autoHeight: true,
	spaceBetween: 10,
	slidesPerView: 1,
});

youtubeSwiper.on("slideChange", function () {
	let index = this.realIndex;
	videoSwiper.slideTo(++index);
});

const inputs = document.querySelectorAll('.video-controls input[type="range"]');
const volumes = document.querySelectorAll(".video-controls .volume");
console.log(volumes);
console.log(inputs);

const changeProgress = (el, val) => {
	el.style.background = `linear-gradient(to right, #710707 0%, #710707 ${val}%, #c4c4c4 ${val}%, #c4c4c4 100%)`;
};

inputs.forEach((i) => {
	i.addEventListener("input", () => {
		changeProgress(i, i.value);
	});
});

volumes.forEach((v) => {
	v.value = 50;
	changeProgress(v, 50);
});
//volume.value = 50;
//changeProgress(volume, 50);

// tickets

const counts = document.querySelectorAll(".counts");
console.log("counts ", counts);
counts.forEach((e) => {
	let incBtn = e.querySelector(".increase");
	let decBtn = e.querySelector(".decrease");
	incBtn.addEventListener("click", () => {
		incBtn.previousElementSibling.stepUp();
	});
	decBtn.addEventListener("click", () => {
		decBtn.nextElementSibling.stepDown();
	});
});
