"use strict";

//import Result from "./result";
//import Quiz from "./quiz";

import Animation from "./animation";

class Settings {
	constructor(body, result, quiz, opt) {
		this.body = body;
		this.artists = document.getElementById("artists");
		this.pictures = document.getElementById("pictures");
		//buttons
		this.btnSettings = this.body.querySelector(".btn-settings");
		this.btnSave = this.body.querySelector(".btn-save");
		this.btnDefault = this.body.querySelector(".btn-default");
		this.btnHome = this.body.querySelector(".btn-home-header");
		this.btnCategories = this.body.querySelector(".btn-categories-header");
		this.volume = this.body.querySelector(".volume");
		this.mute = this.body.querySelector(".mute");
		this.timer = this.body.querySelector(".timer");
		this.seconds = this.body.querySelector(".seconds");
		this.btnIncrease = this.body.querySelector(".btn-increase");
		this.btnDecrease = this.body.querySelector(".btn-decrease");
		//pages
		this.home = this.body.querySelector(".home");
		this.settings = this.body.querySelector(".settings");
		this.categories = this.body.querySelector(".categories");
		this.resultContainer = this.body.querySelector(".result");
		this.quiz = this.body.querySelector(".quiz");
		//type quiz
		this.type = false;
		this.categoriesImgs = {
			artists: [],
			pictures: [],
		};
		//data
		this.data = {};
		this.questions = {};
		//settings
		this.opt = opt;
		this.result = result;
		this.quiz = quiz;
		//defopt
		this.defOpt = {
			volume: 0.5,
			timer: false,
			seconds: 15,
			muted: false,
		};
		//bind method
		this.saveSettings = this.saveSettings.bind(this);
		this.resetSetings = this.resetSetings.bind(this);
		this.toggleMute = this.toggleMute.bind(this);
		this.updateVolumeIcon = this.updateVolumeIcon.bind(this);
		this.renderCategories = this.renderCategories.bind(this);
		this.displayHome = this.displayHome.bind(this);
		this.displayCategories = this.displayCategories.bind(this);
	}
	//установить настройки громкости и таймера
	//загрузить данные с сервера
	//сформировать вопросы - вывести в отдельный метод, чтобы можно было пересобрать заново из данных

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
				if (this.questions.artists.length < 12) {
					this.questions.artists.push(round);
				} else {
					this.questions.pictures.push(round);
				}

				round = [];
			}
			if (this.questions.artists.length < 12) {
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
			data = data.filter((e) => e.author !== author);
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

	addListeners() {
		console.log("addListeners");
		this.btnSettings.addEventListener("click", () => {
			Animation.fadeOut(this.home, this.settings);
		});
		this.btnSave.addEventListener("click", this.saveSettings);
		this.btnDefault.addEventListener("click", this.resetSetings);
		this.artists.addEventListener("click", this.renderCategories);
		this.pictures.addEventListener("click", this.renderCategories);
		this.btnHome.addEventListener("click", this.displayHome);
		this.btnCategories.addEventListener("click", this.displayCategories);
		this.mute.addEventListener("click", this.toggleMute);
		this.volume.addEventListener("change", this.updateVolumeIcon);
		this.btnDecrease.addEventListener("click", (e) => {
			this.seconds.stepDown();
		});
		this.btnIncrease.addEventListener("click", (e) => {
			this.seconds.stepUp();
		});
		this.categories
			.querySelector(".content")
			.addEventListener("click", (event) => {
				if (event.target.closest(".card")) {
					let cardId = event.target.closest(".card").id;
					let round = this.questions[this.type][cardId];
					console.log("round ", round);
					console.log("card id ", cardId);
					if (event.target.tagName === "BUTTON") {
						this.btnCategories.classList.add("active");
						this.btnHome.dataset.hide = "result";
						this.result.renderResult(
							this.opt[this.type].find((res) => res.id == cardId),
							this.questions[this.type][cardId],
							cardId
						);
					} else {
						if (event.target.closest(".card").classList.contains("played")) {
							this.getQuestions(this.data);
						}
						this.quiz.start(this.type, this.questions[this.type], cardId);
					}
				}
			});
	}

	displayCategories() {
		this.btnCategories.classList.remove("active");
		this.btnHome.dataset.hide = "categories";
		Animation.fadeOut(this.resultContainer, this.categories);
	}

	displayHome(event) {
		const hide = document.getElementById(
			event.target.closest("button").dataset.hide
		);
		this.btnHome.classList.remove("active");
		this.btnCategories.classList.remove("active");
		Animation.fadeOut(hide, this.home);
	}

	saveSettings() {
		this.opt.volume = this.volume.value;
		this.opt.timer = this.timer.checked;
		this.opt.seconds = this.seconds.value;
		Animation.fadeOut(this.settings, this.home);
	}

	resetSetings() {
		for (const key in this.defOpt) {
			this.opt[key] = this.defOpt[key];
		}
		this.setSettings();
		this.updateVolumeIcon();
		Animation.fadeOut(this.settings, this.home);
	}

	setSettings() {
		this.volume.value = this.opt.volume;
		this.timer.checked = this.opt.timer;
		this.seconds.value = this.opt.seconds;
	}

	updateVolumeIcon() {
		if (this.volume.value == 0) {
			this.mute.classList.add("on");
		} else {
			this.mute.classList.remove("on");
		}
	}

	toggleMute() {
		this.opt.muted = !this.opt.muted;

		if (this.opt.muted) {
			this.volume.setAttribute("data-volume", this.volume.value);
			this.volume.value = 0;
			this.updateVolumeIcon();
		} else {
			this.volume.value = this.volume.dataset.volume;
			this.updateVolumeIcon();
		}
	}

	renderCategories(event) {
		this.type = event.target.closest(".card").id;
		let cards = "";
		if (this.categoriesImgs[this.type].length == 0) {
			const urls = []; // массив картинок категорий (первая картинка вопроса раунда) динамичные картинки категорий с гитхаба
			this.questions[this.type].forEach((round) => {
				urls.push(
					`https://raw.githubusercontent.com/brodozer/image-data/master/img/${round[0].imageNum}.jpg`
				);
			});
			this.categoriesImgs[this.type] = urls;
			console.log("categeories imgs ", urls);
		}
		for (let i = 0; i < 12; i++) {
			let res = this.opt[this.type].find((res) => res.id == i);
			if (res) {
				cards += `
					<div class="card played" id="${i}">
						<div class="card-title">
							<div class="number color">${i + 1}</div>
							<div class="score">${res.score}/10</div>
						</div>
						<div class="card-img">
							<img
								src="assets/images/categories/${this.type}/${i}.jpg"
							/>
						</div>
						<button class="btn btn-result">result</button>
					</div>
				`;
			} else {
				cards += `
					<div class="card" id="${i}">
						<div class="card-title">
							<div class="number">${i + 1}</div>
						</div>
						<div class="card-img">
							<img
								src="assets/images/categories/${this.type}/${i}.jpg"
							/>
						</div>
					</div>
				`;
			}
		}

		this.categories.querySelector(".content").innerHTML = cards;
		this.btnHome.classList.add("active");
		this.btnHome.dataset.hide = "categories";
		Animation.fadeOut(this.home, this.categories);
	}

	init() {
		console.log("init");
		this.startQuiz();
		this.addListeners();
		this.setSettings();
	}
}

export default Settings;
