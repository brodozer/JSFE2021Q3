"use strict";

// artists: {
// 	round_1: {
// 		score: 5,
// 		result: new Map(),
// 	}
// },

//https://raw.githubusercontent.com/brodozer/image-data/master/img/0.jpg

import Result from "./result";
import Quiz from "./quiz";

class Settings {
	constructor() {
		this.artists = document.getElementById("artists");
		this.pictures = document.getElementById("pictures");
		//buttons
		this.btnSettings = document.querySelector(".btn-settings");
		this.btnSave = document.querySelector(".btn-save");
		this.btnDefault = document.querySelector(".btn-default");
		this.btnHome = document.querySelector(".btn-home");
		this.btnCategories = document.querySelector(".btn-categories");
		this.volume = document.querySelector(".volume");
		this.timer = document.querySelector(".timer");
		//pages
		this.home = document.querySelector(".home");
		this.settings = document.querySelector(".settings");
		this.contentContainer = document.querySelector(".content-container");
		this.categories = document.querySelector(".categories");
		this.quiz = document.querySelector(".quiz");
		//type quiz
		this.type = false;
		//data
		this.data = {};
		this.questions = {};
		//settings
		this.opt = {};

		//bind method
		this.saveSettings = this.saveSettings.bind(this);
		this.resetSetings = this.resetSetings.bind(this);
		this.renderCategories = this.renderCategories.bind(this);
		this.displayHome = this.displayHome.bind(this);
		this.displayCategories = this.displayCategories.bind(this);
		this.fadeOut = this.fadeOut.bind(this);
		this.fadeIn = this.fadeIn.bind(this);
		//init
		this.init();
	}
	//установить настройки громкости и таймера
	//загрузить данные с сервера
	//сформировать вопросы - вывести в отдельный метод, чтобы можно было пересобрать заново из данных

	getOpt() {
		// проверить в локал стораж, если есть, то записать, если нет, дефолт
		if (localStorage.opt) {
			this.opt = JSON.parse(localStorage.opt);
		} else {
			this.opt = {
				volume: 50,
				timer: false,
				artists: {
					round_1: {
						score: "5",
						result: new Map([
							[0, true],
							[1, true],
							[2, false],
							[3, true],
							[4, true],
							[5, true],
							[6, true],
							[7, true],
							[8, true],
							[9, false],
						]),
						// result [true, false, ... true]
					},
				},
				pictures: {
					round_5: {
						score: "7",
						result: new Map(),
					},
				},
			};
		}
		console.log(this.opt);
	}

	async startQuiz() {
		// получить данные, записать данные, собрать вопросы

		try {
			const url = "js/images.json";

			const res = await fetch(url);
			const data = await res.json();
			console.log(url, data);

			this.data = data;
			this.getQuestions(this.data);
			console.log(this.questions);
		} catch (error) {
			alert(error);
		}
	}

	getQuestions(data) {
		let cloneData = data.map((a) => ({ ...a }));
		this.questions.artists = [];
		this.questions.pictures = [];
		let round = [];
		cloneData.forEach((item) => {
			if (round.length == 10) {
				if (this.questions.artists.length < 10) {
					this.questions.artists.push(round);
				} else {
					this.questions.pictures.push(round);
				}

				round = [];
			}
			if (this.questions.artists.length < 10) {
				round.push(this.typeAuthor(cloneData, item));
			} else {
				round.push(this.typePicture(cloneData, item));
			}
		});
	}

	getRandomNum(max) {
		return Math.floor(Math.random() * max);
	}

	typeAuthor(data, item) {
		let answers = [item.author];
		for (let i = 0; i < 3; i++) {
			data = data.filter((e) => e.author !== answers[i]);
			let randomNum = this.getRandomNum(data.length);
			answers.push(data[randomNum].author);
		}
		item.answers = answers;
		return item;
	}

	typePicture(data, item) {
		let answers = [
			{
				name: item.name,
				imageNum: item.imageNum,
			},
		];
		let author = item.author;
		for (let i = 0; i < 3; i++) {
			data = data.filter((e) => e.author !== author); // можно фильтровать только по названию картины (нужно фильтровать по имени автора, чтобы 4 картины были от разного автора)
			let randomNum = this.getRandomNum(data.length);
			author = data[randomNum].author;
			answers.push({
				name: data[randomNum].name,
				imageNum: data[randomNum].imageNum,
			});
		}
		item.answers = answers;
		return item;
	}

	toggleVisible(hide, show) {
		// не работает!!!
		hide.style.opacity = "0";

		hide.addEventListener(
			"transitionend",
			function () {
				hide.classList.add("d-none");
				show.classList.remove("d-none");
				hide.style.opacity = "1";
			},
			{ once: true }
		);
	}

	addListeners() {
		this.btnSettings.addEventListener("click", () => {
			this.fadeOut(this.home, this.settings, this.fadeIn);
			//this.toggleVisible(this.home, this.settings);
		});
		this.btnSave.addEventListener("click", this.saveSettings);
		this.btnDefault.addEventListener("click", this.resetSetings);
		this.artists.addEventListener("click", this.renderCategories);
		this.pictures.addEventListener("click", this.renderCategories);
		this.btnHome.addEventListener("click", this.displayHome);
		this.btnCategories.addEventListener("click", this.displayCategories);
	}

	displayCategories() {
		this.btnCategories.classList.add("d-none");
		this.btnHome.classList.remove("d-none");
		this.contentContainer.querySelector(".result").remove();
		this.contentContainer
			.querySelector(".categories")
			.classList.remove("d-none");
	}

	saveSettings() {
		this.opt.volume = this.volume.value;
		this.opt.timer = this.timer.checked;
		this.fadeOut(this.settings, this.home, this.fadeIn);
		//this.fadeIn(this.home);
		//this.toggleVisible(this.settings, this.home);
	}

	resetSetings() {
		this.opt.volume = 50;
		this.opt.timer = false;
		this.setSettings();
		this.fadeOut(this.settings, this.home, this.fadeIn);
		//this.toggleVisible(this.settings, this.home);
	}

	setSettings() {
		this.volume.value = this.opt.value;
		this.timer.checked = this.opt.timer;
	}

	renderCategories(event) {
		this.type = event.target.closest(".card").id;
		let cards = "";

		for (let i = 0; i < 10; i++) {
			if (this.opt[this.type].hasOwnProperty(`round_${i}`)) {
				cards += `
					<div class="card" id="round_${i}">
						<div class="card-title">
							<div class="number color">${i + 1}</div>
							<div class="score">${this.opt[this.type]["round_" + i].score}/10</div>
						</div>
						<div class="card-img">
							<img
								src="assets/images/categories/category-${i + 1}-color.jpg"
							/>
						</div>
						<button class="btn btn-result">result</button>
					</div>
				`;
			} else {
				cards += `
					<div class="card" id="round_${i}">
						<div class="card-title">
							<div class="number">${i + 1}</div>
						</div>
						<div class="card-img">
							<img
								src="assets/images/categories/category-${i + 1}-grayscale.jpg"
							/>
						</div>
					</div>
				`;
			}
		}

		let html = `
			<div class="categories">
				<div class="title">categories</div>
				<div class="content">${cards}</div>
			</div>
		`;
		this.contentContainer.innerHTML = html;
		this.btnHome.classList.remove("d-none");
		this.fadeOut(this.home, this.contentContainer, this.fadeIn);
		this.contentContainer
			.querySelector(".categories")
			.addEventListener("click", (event) => {
				if (event.target.closest(".card")) {
					let cardId = event.target.closest(".card").id;
					let id = cardId[cardId.length - 1];
					let round = this.questions[this.type][id];
					console.log("round ", round);
					console.log("id ", id);
					if (event.target.tagName === "BUTTON") {
						this.btnHome.classList.add("d-none");
						this.btnCategories.classList.remove("d-none");
						let result = new Result(
							this.opt[this.type][cardId],
							this.questions[this.type][id],
							id,
							this.contentContainer
						);
						console.log("result ", result);
					} else {
						const quiz = new Quiz(
							this.quiz,
							this.type,
							this.opt,
							this.questions[this.type],
							id
						);
						console.log("quiz ", quiz);
						console.log("new quiz");
					}
				}
			});
		//this.toggleVisible(this.home, this.contentContainer);
	}

	fadeOut(hide, show, cb) {
		let opacity = 1;
		const timer = setInterval(function () {
			if (opacity <= 0.1) {
				clearInterval(timer);
				hide.classList.add("d-none");
				cb(show);
			}
			hide.style.opacity = parseFloat(opacity);
			opacity -= opacity * 0.1;
		}, 10);
	}

	fadeIn(el) {
		let opacity = 0.01;
		el.classList.remove("d-none");

		const timer = setInterval(function () {
			if (opacity >= 1) {
				clearInterval(timer);
			}

			el.style.opacity = opacity;
			opacity += opacity * 0.1;
		}, 10);
	}

	displayHome() {
		this.btnHome.classList.add("d-none");
		this.fadeOut(this.contentContainer, this.home, this.fadeIn);
		//this.toggleVisible(this.contentContainer, this.home);
	}

	init() {
		this.getOpt();
		this.startQuiz();
		this.addListeners();
		this.setSettings();
		// обработчики на кнопки и инпуты
	}
}

export default Settings;
