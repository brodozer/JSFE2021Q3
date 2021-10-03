"use strict";

// byrger menu

const menu = () => {
	const burgerMenu = document.querySelector(".burger-menu");
	const welcomTitle = document.querySelector(".welcome-title");
	const modalMenu = document.querySelector(".modal-menu");
	const sectionWelcome = document.querySelector(".section-welcome");

	const links = modalMenu.querySelectorAll(".nav-link");

	const toggleClass = () => {
		burgerMenu.classList.toggle("toggle");
		welcomTitle.classList.toggle("toggle");
		modalMenu.classList.toggle("toggle");
	};

	const setHeight = () => {
		if (modalMenu.offsetHeight > sectionWelcome.offsetHeight) {
			sectionWelcome.style.height = modalMenu.offsetHeight + "px";
		}
	};

	links.forEach((l) => {
		l.addEventListener("click", () => {
			toggleClass();
		});
	});

	burgerMenu.addEventListener("click", function (e) {
		if (burgerMenu.classList.contains("toggle")) {
			sectionWelcome.removeAttribute("style");
		} else {
			setHeight();
		}
		toggleClass();
	});
};

menu();

//welcom swiper

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
	dragLine.style.left = `${sliderVal}%`;
	overlay.style.width = `${sliderVal}%`;
});

// art gallery

const gallery = [
	"assets/img/galery/galery1.jpg",
	"assets/img/galery/galery2.jpg",
	"assets/img/galery/galery3.jpg",
	"assets/img/galery/galery4.jpg",
	"assets/img/galery/galery5.jpg",
	"assets/img/galery/galery6.jpg",
	"assets/img/galery/galery7.jpg",
	"assets/img/galery/galery8.jpg",
	"assets/img/galery/galery9.jpg",
	"assets/img/galery/galery10.jpg",
	"assets/img/galery/galery11.jpg",
	"assets/img/galery/galery12.jpg",
	"assets/img/galery/galery13.jpg",
	"assets/img/galery/galery14.jpg",
	"assets/img/galery/galery15.jpg",
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

shuffle(gallery).forEach((src, i) => {
	const img = document.createElement("img");
	img.classList.add("gallery-img");
	img.src = src;
	img.alt = `galery1${i + 1}`;
	pictureInnerContainer.append(img);
});

// video

const youtubeSwiper = new Swiper(".youtube-swiper", {
	loop: true,
	spaceBetween: 22,
	slidesPerView: 2,
	navigation: {
		nextEl: ".button-next",
		prevEl: ".button-prev",
	},
	pagination: {
		el: ".pagination",
		clickable: true,
	},
	breakpoints: {
		960: {
			slidesPerView: 3,
			spaceBetween: 45,
		},
	},
});

const videoSwiper = new Swiper(".video-swiper", {
	loop: true,
	allowTouchMove: false,
	autoHeight: true,
	spaceBetween: 10,
	slidesPerView: 1,
});

// change main video
youtubeSwiper.on("slideChange", function () {
	let index = this.realIndex;
	videoSwiper.slideTo(++index);
});

const inputs = document.querySelectorAll('.video-controls input[type="range"]');
const volumes = document.querySelectorAll(".video-controls .volume");

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

const counts = document.querySelectorAll(".counts, .input-wr");
counts.forEach((e) => {
	let incBtn = e.querySelector(".increase");
	let decBtn = e.querySelector(".decrease");
	let number = e.querySelector("input[type='number']");
	incBtn.addEventListener("click", () => {
		number.stepUp();
	});
	decBtn.addEventListener("click", () => {
		number.stepDown();
	});
});

// custom select

const select = () => {
	const customSelect = document.querySelectorAll(".custom-select");
	customSelect.forEach((wraper) => {
		const sel = wraper.querySelector("select");
		sel.classList.add("d-none");
		const div = document.createElement("div");
		div.setAttribute("class", "select");
		let html = "";
		html +=
			'<div class="select-selected"><span class="icon ticket"></span><span class="select-value">' +
			sel[0].innerHTML +
			'</span><span class="icon arrow"></span></div>';
		html += '<div class="select-items">';
		for (let i = 1; i < sel.length; i++) {
			if (i == 2) {
				html += '<span class="option active">' + sel[i].innerHTML + "</span>";
			} else {
				html += '<span class="option">' + sel[i].innerHTML + "</span>";
			}
		}
		html += "</div>";
		console.log(html);
		div.innerHTML = html;
		wraper.appendChild(div);

		div.addEventListener("click", function () {
			this.classList.toggle("open");
		});

		div.querySelectorAll(".option").forEach((option) => {
			option.addEventListener("click", function () {
				if (!this.classList.contains("active")) {
					this.parentNode
						.querySelector(".option.active")
						.classList.remove("active");
					this.classList.add("active");
					//this.closest(".select").querySelector(".select-value").textContent = this.textContent;
					sel.value = this.textContent; // change select value
				}
			});
		});
	});
};

select();

// modals

const booking = document.querySelector(".modal-booking");
const buyNow = document.querySelector(".btn-buy-now");

buyNow.addEventListener("click", function () {
	booking.classList.add("toggle");
});

booking.addEventListener("click", function (e) {
	let target = e.target;
	if (
		target.classList.contains("modal-booking") ||
		target.classList.contains("close-book")
	) {
		booking.classList.remove("toggle");
	}
});

// // form

// const form = document.querySelector(".booking form");
// form.addEventListener("submit", (e) => {
// 	e.preventDefault();
// });

// riple effect

// const buttons = document.querySelectorAll(".ripple");

// buttons.forEach((button) => {
// 	button.addEventListener("click", function (e) {
// 		const x = e.clientX;
// 		const y = e.clientY;

// 		const buttonTop = e.target.offsetTop;
// 		const buttonLeft = e.target.offsetLeft;

// 		const xInside = x - buttonLeft;
// 		const yInside = y - buttonTop;

// 		const circle = document.createElement("span");
// 		circle.classList.add("circle");
// 		circle.style.top = yInside + "px";
// 		circle.style.left = xInside + "px";

// 		this.appendChild(circle);

// 		setTimeout(() => circle.remove(), 500);
// 	});
// });

//MAPBOX

mapboxgl.accessToken =
	"pk.eyJ1IjoiYnJvZG96ZXIiLCJhIjoiY2t1NzlmYjluMDY2cDJxbnptZmJ0YnV3aiJ9.RCq-BVqBx9-GedAVEXD0HQ";

// const geojson = {
// 	type: "FeatureCollection",
// 	features: [
// 		{
// 			type: "Feature",
// 			geometry: {
// 				type: "Point",
// 				coordinates: [-77.032, 38.913],
// 			},
// 			properties: {
// 				title: "Mapbox",
// 				description: "Washington, D.C.",
// 			},
// 		},
// 		{
// 			type: "Feature",
// 			geometry: {
// 				type: "Point",
// 				coordinates: [-122.414, 37.776],
// 			},
// 			properties: {
// 				title: "Mapbox",
// 				description: "San Francisco, California",
// 			},
// 		},
// 	],
// };

const geojson = [
	{
		coordinates: [2.3364, 48.86091],
		color: "black",
	},
	{
		coordinates: [2.3333, 48.8602],
		color: "grey",
	},
	{
		coordinates: [2.3397, 48.8607],
		color: "grey",
	},
	{
		coordinates: [2.333, 48.8619],
		color: "grey",
	},
	{
		coordinates: [2.3365, 48.8625],
		color: "grey",
	},
];

const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/light-v10",
	center: [2.3364, 48.86091],
	zoom: 16,
});

map.addControl(new mapboxgl.NavigationControl());

geojson.forEach((geo) => {
	new mapboxgl.Marker({
		color: geo.color,
	})
		.setLngLat(geo.coordinates)
		.addTo(map);
});

console.log(`
	Оценка работы 150

[+]	1 Вёрстка соответствует макету. Ширина экрана 1024px (40)
[+]	2 Вёрстка соответствует макету. Ширина экрана 768px (40)
[+]	3 Вёрстка соответствует макету. Ширина экрана 420px (40)
[+]	4 Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки (6)
[+]	5 Совмещается адаптивная и респонсивная (резиновая) вёрстка (14)
[±]	6 На ширине экрана 1024рх и меньше реализовано адаптивное меню (10/12)
[-]	7 Оптимизация скорости загрузки страницы (0/8)
`);
