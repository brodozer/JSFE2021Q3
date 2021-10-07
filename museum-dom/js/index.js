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
	players.forEach((player) => {
		// вынести в отдельную ф-ю stopYtplayer
		if (player.getPlayerState() == YT.PlayerState.PLAYING) {
			player.pauseVideo();
		}
	});
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
		if (number.name === "basic" || number.name === "senior") {
			changeCountTicket(number, number.value);
		}
	});
	decBtn.addEventListener("click", () => {
		number.stepDown();
		if (number.name === "basic" || number.name === "senior") {
			changeCountTicket(number, number.value);
		}
	});
});

// custom select

const textTime = document.querySelector(".payment .time"); // поле для времени
const textDate = document.querySelector(".payment .date"); // поле для даты
const textTicket = document.querySelector(".payment .ticket"); // поле для тип билета

const totalPriceSenior = document.querySelector(".total-price-senior");
const totalPriceBasic = document.querySelector(".total-price-basic");
const totalPrice = document.querySelectorAll(".sum"); // total price all ticket

const inputCount = document.querySelectorAll(
	'input[name="basic"], input[name="senior"]'
);

const ticketPriceBasic = document.querySelectorAll(".ticket-price-basic"); // price basic
const ticketPriceSenior = document.querySelectorAll(".ticket-price-senior"); // price senior

const ticketNumberSenior = document.querySelector(".ticket-number-senior"); // кол-во билетов senior
const ticketNumberBasic = document.querySelector(".ticket-number-basic"); // кол-во билетов basic

const selectTicket = document.querySelector(".select-ticket"); // список билетов
const selectTime = document.querySelector(".select-time"); // список времени

const dropDown = (el, cb) => {
	// @el  родитель, куда будем инжектить список
	// @cb  ф-я, которую будем вешать на кнопки в листе

	const sel = el.querySelector("select");
	sel.classList.add("d-none");
	let icon = "ticket";
	if (el.classList.contains("select-time")) {
		icon = "time";
	}
	let html = "";
	html +=
		'<div class="select-selected"><span class="icon ' +
		icon +
		'"></span><span class="select-value">' +
		sel[0].innerHTML +
		'</span><span class="icon arrow"></span></div>';
	html += '<div class="select-items">';
	for (let i = 1; i < sel.length; i++) {
		html +=
			'<span class="option" data-id="' +
			(i - 1) +
			'">' +
			sel[i].innerHTML +
			"</span>";
	}
	html += "</div>";
	console.log(html);

	const select = document.createElement("div");
	select.setAttribute("class", "select");

	select.innerHTML = html;
	el.appendChild(select);

	select.addEventListener("click", function () {
		this.classList.toggle("open");
	});

	select.querySelectorAll(".option").forEach((option) => {
		option.addEventListener("click", function () {
			if (!this.classList.contains("active")) {
				this.parentNode
					.querySelector(".option.active")
					.classList.remove("active");
				this.classList.add("active");
				this.closest(".select").querySelector(".select-value").textContent =
					this.textContent;
				cb(this.textContent);
			}
		});
	});
};

// калькулятор билетов

let tickets = {};

const radioBtn = document.querySelectorAll('input[type="radio"]');

const radioCheck = (ticket_type) => {
	radioBtn.forEach((btn) => {
		if (btn.value == ticket_type) {
			btn.checked = true;
		} else {
			btn.checked = false;
		}
	});
};

const listActive = (list, value) => {
	list.forEach((item) => {
		if (item.textContent === value) {
			item.classList.add("active");
		} else {
			item.classList.remove("active");
		}
	});
};

const ticketPrice = () => {
	injectText(ticketPriceBasic, String(tickets.ticket_price));
	injectText(ticketPriceSenior, String(tickets.ticket_price / 2));
	textTicket.textContent = tickets.ticket_type;
};

const total = () => {
	let price = {
		temporary: 20,
		permanent: 25,
		combined: 40,
	};
	let priceTicket = "";
	for (let k in price) {
		if (tickets.ticket_type.toLowerCase().includes(k)) {
			priceTicket = price[k];
		}
	}

	let sum = priceTicket * tickets.basic + (priceTicket / 2) * tickets.senior;

	injectText(totalPrice, sum + "€");

	totalPriceSenior.textContent = `${(priceTicket / 2) * tickets.senior} €`;
	totalPriceBasic.textContent = `${priceTicket * tickets.basic} €`;

	writeLocalStorage("ticket_price", priceTicket);
};

const writeLocalStorage = (key, value) => {
	tickets[key] = value;
	localStorage.tickets = JSON.stringify(tickets);
};

const injectText = (col, value) => {
	col.forEach((e) => {
		e.innerHTML = value;
	});
};

const changeCountTicket = (input, value) => {
	writeLocalStorage(input.name, value);
	inputCount.forEach((i) => {
		if (i.name === input.name && i.value !== value) {
			i.value = value;
		}
	});
	if (input.name == "senior") {
		ticketNumberSenior.innerHTML = value;
	} else {
		ticketNumberBasic.innerHTML = value;
	}
	total();
};

const setTime = (value) => {
	textTime.innerHTML = value;
};

const setTicket = (value) => {
	writeLocalStorage("ticket_type", value);
	radioCheck(value);
	total();
	ticketPrice();
};

// init!!!!!!!

if (localStorage.tickets) {
	tickets = JSON.parse(localStorage.tickets);
	for (let k in tickets) {
		if (k === "senior" || k === "basic") {
			inputCount.forEach((i) => {
				if (i.name === k) {
					i.value = tickets[k]; // меняем инпутам значения из tickets
				}
			});
		}
		if (k === "ticket_type") {
			radioCheck(tickets[k]);
		}
	}
	ticketNumberSenior.innerHTML = tickets.senior;
	ticketNumberBasic.innerHTML = tickets.basic;
	ticketPrice();
	total();
} else {
	tickets = {
		senior: 1,
		basic: 1,
		ticket_type: "Temporary exhibition",
		ticket_price: 20,
	};
	localStorage.tickets = JSON.stringify(tickets);
}

dropDown(selectTicket, setTicket);
dropDown(selectTime, setTime);

//radio btn

radioBtn.forEach((btn) => {
	btn.addEventListener("change", function () {
		writeLocalStorage(this.name, this.value);
		total();
		ticketPrice();
	});
});

// modals

const booking = document.querySelector(".modal-booking");
const buyNow = document.querySelector(".btn-buy-now");

buyNow.addEventListener("click", function () {
	listActive(selectTicket.querySelectorAll(".option"), tickets.ticket_type);
	listActive(selectTime.querySelectorAll(".option"), "09 : 00");

	textTicket.innerHTML = tickets.ticket_type;
	textTime.innerHTML = "09 : 00";
	// открываем модалку
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

// validation

const regName = /^[a-zA-Zа-яА-Я\s]+$/iu;
const regEmail = /^[\w-]{3,15}@[a-z]{4,}\.[a-z]{2,}$/i;
const regPhone = /^\d[\d\s-]{4,10}\d$/;

const config = {
	name: {
		min: 3,
		max: 15,
		reg: /^[a-zA-Zа-яА-Я\s]+$/iu,
		msg: "Имя должно содержать от 3 до 15 символов",
		msgReg:
			"В качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы",
	},
	email: {
		min: 10,
		max: 100,
		reg: /^[\w-]{3,15}@[a-z]{4,}\.[a-z]{2,}$/i,
		msg: "Email должен содержать минимум 10 символов",
		msgReg: "Email введен не корректно",
	},
	phone: {
		min: 4,
		max: 10,
		//reg: /^\d[\d\s-]{4,10}\d$/,
		//reg: /[0-9]/gm,
		reg: /^[0-9]{3}[-\s]?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}$/im,
		msg: "Телефон должен содержать от 4 до 10 символов",
		msgReg:
			"Номер содержит только цифры с разделением или без на пробелы или дефиз",
	},
};

const form = document.querySelector(".booking form");

const validation = (form, config) => {
	const inputs = form.querySelectorAll(
		'[name="name"], [name="email"], [name="phone"]'
	);
	const showMsg = (el, msg) => {
		let span = document.createElement("span");
		span.classList.add("msg");
		span.innerHTML = msg;
		el.appendChild(span);
		el.classList.add("error");
	};
	const hideMsg = (el) => {
		if (el.querySelector(".msg")) {
			el.querySelector(".msg").remove();
			el.classList.remove("error");
		}
	};
	const checkInputs = (i) => {
		let iConf = config[i.name];
		let value = i.value;
		let formGroup = i.closest(".form-group");
		// убирать пробелы и дефизы перед проверкой длинны?
		if (i.name === "phone") {
			value = value.replace(/[-\s]/g, "");
		}

		if (value.length < iConf.min || value.length > iConf.max) {
			showMsg(formGroup, iConf.msg);
		} else {
			console.log(value);
			if (iConf.reg.test(value)) {
				hideMsg(formGroup);
			} else {
				showMsg(formGroup, iConf.msgReg);
			}
		}
	};

	inputs.forEach((i) => {
		i.addEventListener("blur", function () {
			checkInputs(i);
		});
		i.addEventListener("focus", function () {
			hideMsg(i.closest(".form-group"));
		});
	});

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		inputs.forEach((i) => {
			checkInputs(i);
		});
		// проверка на класс error и отправка данных
	});
};

validation(form, config);

// datetime // может добавить сравнение через date.getTime() // создавать дату на 18-00 для переключения на следующий день

const dateTime = () => {
	const pad = (n) => {
		if (n < 10) return "0" + n;
		return n;
	};

	const datePicker = form.querySelector('[type="date"]');
	const date = new Date();

	const year = date.getFullYear();
	let months = date.getMonth() + 1;

	let days = date.getDate();
	let hours = date.getHours();

	if (hours > 18) {
		days = date.getDate() + 1;
	}

	months = pad(months);
	days = pad(days);

	datePicker.min = `${year}-${months}-${days}`;
	datePicker.value = `${year}-${months}-${days}`;

	const changeDate = () => {
		let date = new Date(datePicker.value);
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		textDate.innerHTML = `${days[date.getDay()]}, ${
			months[date.getMonth()]
		} ${date.getDate()}`;

		console.log(date);
	};

	changeDate();

	datePicker.addEventListener("input", changeDate);
};

dateTime();
