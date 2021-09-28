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

const counts = document.querySelectorAll(".counts, .input-wr");
console.log("counts ", counts);
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

const modals = document.querySelector(".modals");
const buyNow = document.querySelector(".btn-buy-now");

buyNow.addEventListener("click", function () {
	modals.classList.add("toggle");
});

modals.addEventListener("click", function (e) {
	let target = e.target;
	if (
		target.classList.contains("modals") ||
		target.classList.contains("close-book")
	) {
		modals.classList.remove("toggle");
	}
});

// form

const form = document.querySelector(".booking form");
form.addEventListener("submit", (e) => {
	console.log("form not submit");
	e.preventDefault();
});

// riple effect

const buttons = document.querySelectorAll(".ripple");

buttons.forEach((button) => {
	button.addEventListener("click", function (e) {
		const x = e.clientX;
		const y = e.clientY;

		const buttonTop = e.target.offsetTop;
		const buttonLeft = e.target.offsetLeft;

		const xInside = x - buttonLeft;
		const yInside = y - buttonTop;

		const circle = document.createElement("span");
		circle.classList.add("circle");
		circle.style.top = yInside + "px";
		circle.style.left = xInside + "px";

		this.appendChild(circle);

		setTimeout(() => circle.remove(), 500);
	});
});

console.log(`
Самооценка работы:

Итого: 155

1 [+/-] Вёрстка валидная +5/10
2 [+] Вёрстка семантическая +24

В коде страницы присутствуют следующие элементы:

 - <header>, <main>, <footer> +2
 - семь элементов <section> (по количеству секций) +2
 - только один заголовок <h1> +2
 - семь заголовков <h2> (по количеству секций) +2
 - шесть заголовков <h3> (по количеству карточек) +2
 - два элемента <nav> (основная и вспомогательная панель навигации) +2
 - три списка ul > li > a (основная и вспомогательная панель навигации, ссылки на соцсети) +2
 - тринадцать кнопок button (четыре из них в секции Video, пять в секции Tickets, по две - стрелки слайдера и плейлиста) +2
 - три тега input type="radio" (в секции Tickets) +2
 - два тега input type="number"(в секции Tickets) +2
 - два тега input type="range" (громкось и прогрес-бар видео) +2
 - для всех элементов <img> указан обязательный атрибут alt +2


3 [+] Вёрстка соответствует макету +45
 - блок <header> +5
 - секция Welcome +5
 - секция Visiting +5
 - секция Explore +5
 - секция Video +5
 - секция Gallery +5
 - секция Tickets +5
 - секция Contacts +5
 - блок <footer> +5

4 [+] Форма покупки билетов +22
 - форма плавно выдвигается слева при открытии и плавно возвращается назад при закрытии. В открытом состоянии под формой есть полупрозрачный overlay, который занимает весь экран. Форма и overlay прокручиваются вместе со страницей +2
 - форма открывается при клике по кнопке Buy Now в секции Tickets и закрывается кликом по иконке с крестиком в верхнем правом углу или кликом по overlay +2
 - при вёрстке формы используются следующие элементы: form, input type="date", input type="time", input type="text", input type="email", input type="tel", input type="number", select +8
 - вёрстка формы соответствует макету + 10

5 [+] Требования к css + 18
 - добавлен favicon +2
 - для построения сетки используются флексы или гриды +2
 - при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2
 - фоновый цвет каждого блока и секции тянется на всю ширину страницы +2
 - иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2
 - расстояние между буквами, там, где это требуется по макету, регулируется css-свойством letter-spacing +2
 - переключаются радиокнопки в блоке Tickets, одновременно может быть выбрана только одна кнопка +2
 - в блоке Contacts правильно указанны ссылки на почту mailto и на телефон tel +2
 - в футере добавлены ссылки на соцсети. Круглая граница вокруг иконок соцсетей выполнена при помощи css +2

6 [+] Интерактивность, реализуемая через css +25
 - плавная прокрутка по якорям +5
 - параллакс +5
 - при кликам по кнопке Discover the Louvre и карточкам секции Visiting открываются полноэкранные панорамы Google Street View встроенные в страницы вашего сайта при помощи iframe +5
 - изменение стиля интерактивных элементов при наведении и клике +10
 - интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты – изменение цвета фона или шрифта, появление подчёркивания и т.д. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +4
 - обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +2
 - интерактивность при наведении карточек в секции Visiting предусматривает плавное растягивание подчёркивания заголовка карточки на всю ширину карточки +2
 - интерактивность при наведении иконок социальных сетей в футере предусматривает изменение цвета иконки и круглой границы вокруг иконки на золотистый +2

 7 [+] Интерактивность, реализуемая через js +16
 - можно передвигать ползунки громкости и прогресс-бар видео, при этом цвет шкалы до и после ползунка отличается и соответствует макету +2
 - кликами по кнопкам + и - в секции Tiskets можно менять количество билетов Basic и Senior от 0 до 20 +2
 - кнопке "Book" в форме покупки билетов добавлен ripple-эффект Демо +2
 - при перезагрузке (обновлении) страницы картины в блоке Galery отображаются в рандомном порядке + 10

`);
