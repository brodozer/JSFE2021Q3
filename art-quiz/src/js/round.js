"use strict";

import LoadImage from "./loadImage";

class Round {
	constructor(body, opt) {
		//quiz
		this.body = body;
		this.quiz = this.body.querySelector(".quiz");
		this.opt = opt;

		this.answers = this.quiz.querySelector(".answers");
		this.progress = this.quiz.querySelector(".progress");
		this.progressBullets = false;
		this.question = this.quiz.querySelector(".question");
		this.imgContainer = this.quiz.querySelector(".img-container");
		this.progressBullets = this.quiz.querySelectorAll(".progress span");
		//modals
		this.modals = document.querySelector(".modals-container");
		this.btnNextQuestion = this.modals.querySelector(".btn-next-question");
		this.btnNextRound = this.modals.querySelector(".btn-next-round");
		this.btnContinue = this.modals.querySelector(".btn-continue");
		this.btnCategories = this.quiz.querySelector(".btn-categories");
		this.btnHome = this.quiz.querySelector(".btn-home");
		this.btnYes = this.modals.querySelector(".btn-yes");
		this.btnNo = this.modals.querySelector(".brn-no");
		this.modalNextRound = this.modals.querySelector(".next-round");
		this.modalNextQuestion = this.modals.querySelector(".next-question");
		this.modalGameOver = this.modals.querySelector(".game-over");

		this.imgs = [];
		this.answeredAmount = 0;
		this.roundResult = []; // true/false
		this.type = false; // тип квиза авторы/картины (нужно для класса контейнера и темплейта html!)
		this.rounds = []; // массив из 10 раундов
		this.round = []; // текущий раунд квиза (10 вопросов)
		this.id = 0; // id карточки для которой нужно отобразить вопросы

		//audio
		this.sounds = {
			wrong: new Audio("../assets/audio/wrong.wav"),
			correct: new Audio("../assets/audio/correct.wav"),
			round: new Audio("../assets/audio/round.mp3"),
		};

		//timer
		this.optTimer = {
			id: false,
			seconds: 0,
		};
		this.quizTimer = this.quiz.querySelector(".quiz-timer");

		//bind
		this.nextQuestion = this.nextQuestion.bind(this);
		this.nextRound = this.nextRound.bind(this);
		this.checkAnswer = this.checkAnswer.bind(this);
		this.closeQuiz = this.closeQuiz.bind(this);
		this.timer = this.timer.bind(this);
		//init
		this.events();
	}

	events() {
		this.answers.removeEventListener("click", this.checkAnswer);
		this.answers.addEventListener("click", this.checkAnswer);
		this.btnNextQuestion.addEventListener("click", this.nextQuestion);
		this.btnNextRound.addEventListener("click", this.nextRound);
		this.btnContinue.addEventListener("click", this.closeQuiz);
		this.btnCategories.addEventListener("click", () => {
			if (this.opt.timer) {
				clearInterval(this.optTimer.id);
			}
			this.quiz.classList.remove("toggle");
		});
		this.btnHome.addEventListener("click", () => {
			if (this.opt.timer) {
				clearInterval(this.optTimer.id);
			}
			this.body.querySelector(".header .btn-home").classList.remove("active");
			this.body.querySelector(".categories").classList.add("d-none");
			this.body.querySelector(".home").classList.remove("d-none");
			this.body.querySelector(".home").style.opacity = 1;
			this.quiz.classList.remove("toggle");
		});
	}
	start(type, rounds, id) {
		this.type = type;
		this.id = Number(id);
		this.rounds = rounds;
		if (this.type === "artists") {
			this.imgContainer.innerHTML = '<div class="img responsive"></div>';
			//this.imgContainer.innerHTML = '<div class="img"></div>';
			this.question.textContent = "Кто автор этой картины ?";
		} else {
			this.imgContainer.innerHTML =
				'<div class="img responsive"><div class="number">A</div></div><div class="img responsive"><div class="number">B</div></div><div class="img responsive"><div class="number">C</div></div><div class="img responsive"><div class="number">D</div></div>';
		}
		this.imgs = this.imgContainer.querySelectorAll(".img");
		if (this.opt.timer) {
			// отображение таймера в квизе
			this.quizTimer.innerHTML = "00:00";
			this.quizTimer.classList.remove("d-none");
		} else {
			this.quizTimer.classList.add("d-none");
		}

		this.rebind();
	}
	rebind() {
		this.round = this.rounds[this.id];
		this.answeredAmount = 0;
		this.roundResult = [];
		this.progressBullets.forEach((bullet, i) => {
			if (i === 0) {
				bullet.classList.add("on");
			} else {
				bullet.classList.remove("on");
			}
		});
		this.renderQuestion(this.round[0]); // ? рендерить последовательно или перескакивать через раунды, которые пользователь уже сыграл ранее
	}
	nextQuestion() {
		this.answeredAmount++;
		let count = this.answeredAmount;
		console.log("count ", count);
		if (this.answeredAmount < this.round.length) {
			this.renderQuestion(this.round[this.answeredAmount]);
			this.progressBullets[this.answeredAmount].classList.add("on");
		} else {
			console.log("end round --->");
			this.endRound();
		}
	}
	nextRound() {
		if (this.opt[this.type].length < 12) {
			this.id++;
			if (this.rounds.length == this.id) {
				this.id = 0;
			}
			// todo проверять игрался такой раунд или нет, если да, то включать кнопку replay и при нажатии на next-round переходить к первому раунду, который еще не играл и выводить это в название кнопки (next round 5)
			this.rebind();
			this.modals.classList.remove("toggle");
			this.modalNextRound.classList.remove("active");
		} else {
			console.log("game over --->");
			this.gameOver();
		}
	}
	gameOver() {
		// todo render модалки для окончания игры. показывать, если пройдены все раунды
	}
	endRound() {
		this.quiz.classList.remove("toggle");
		// ? убрать у body overflow hidden! (может overflow убирать на другом этапе, когда пользователь выбрал категории)
		let totalCorrectAnswer = this.calculateCorrectAnswer(this.roundResult); // кол-во правильных ответов
		let result = {
			id: this.id,
			score: totalCorrectAnswer,
			result: this.roundResult,
		};
		let resultIndex = this.opt[this.type].findIndex((e) => e.id == this.id);
		if (resultIndex !== -1) {
			this.opt[this.type][resultIndex] = result;
		} else {
			this.opt[this.type].push(result);
		}
		console.log("round result ", result);

		// вариант 2 - накинуть карточке класс played (включит кнопку и скор)
		//           - заинжектить скор
		const card = document.getElementById(this.id);
		// можно добавить проверку, чтобы добавлять класс, только тогда, когда его нет (для случаев, когда раунд уже сыгран)
		card.classList.add("played");
		card.innerHTML = `		
			<div class="card-title">
				<div class="number color">${this.id + 1}</div>
				<div class="score">${totalCorrectAnswer}/10</div>
			</div>
			<div class="card-img">
				<img
					src="assets/images/categories/${this.type}/${this.id}.jpg"
				/>
			</div>
			<button class="btn btn-result">result</button>
		`;
		this.modalNextRound.querySelector(
			".score"
		).textContent = `${totalCorrectAnswer}/10`;
		this.modalNextQuestion.classList.remove("active");
		this.modalNextRound.classList.add("active");
		this.playAudio(this.sounds.round);
	}
	playAudio(sound) {
		if (this.opt.muted) {
			sound.volume = this.opt.volume;
			sound.play();
		}
	}
	async renderResult(isCorrect) {
		let question = this.round[this.answeredAmount];
		let descriptions = `
			<p>${question.name}</p>
			<p>${question.author}</p>
			<p>${question.year}</p>
		`;
		let className = isCorrect ? "correct" : "wrong";
		const img = await LoadImage.load(
			`https://raw.githubusercontent.com/brodozer/image-data/master/img/${question.imageNum}.jpg`
		);
		const imgContainer = this.modalNextQuestion.querySelector(".img");
		if (imgContainer.childNodes.length != 0) {
			imgContainer.childNodes[0].remove();
		}
		imgContainer.append(img);
		this.modalNextQuestion.querySelector(".descriptions").innerHTML =
			descriptions;
		this.modalNextQuestion.className = `next-question ${className} modal active`;
		this.modals.classList.add("toggle");
	}
	checkAnswer(event) {
		event.preventDefault();
		clearInterval(this.optTimer.id);
		let correctAnswer =
			this.type === "artists"
				? this.round[this.answeredAmount].author
				: this.round[this.answeredAmount].name;
		let answer = event.target.closest(".answer");
		let currentAnswer = answer.dataset.answer;
		let isCorrect = false;
		if (correctAnswer === currentAnswer) {
			isCorrect = true;
		}
		let className = isCorrect ? "correct" : "wrong";
		answer.classList.add(className);
		if (isCorrect) {
			this.playAudio(this.sounds.correct);
		} else {
			this.playAudio(this.sounds.wrong);
		}
		// todo менять класс кнопки (зеленая или красная)
		// todo менять цвет пагинации (зеленая или красная)
		// todo проигрывать звук правильного/неправильного ответа (если активировано в настройках)
		console.log("correct answer ", correctAnswer);
		console.log("current answer ", currentAnswer);
		this.roundResult.push(isCorrect);
		this.renderResult(isCorrect);
	}
	shuffleAnswers(answers) {
		for (let i = answers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			const temp = answers[i];
			answers[i] = answers[j];
			answers[j] = temp;
		}
		return answers;
	}
	async renderQuestion(question) {
		console.log("question ", question);
		let answers = this.shuffleAnswers(question.answers);
		let urls = [];
		let html = "";
		if (this.type === "artists") {
			urls.push(
				LoadImage.load(
					`https://raw.githubusercontent.com/brodozer/image-data/master/full/${question.imageNum}full.jpg`
				)
			);
			answers.forEach((answer) => {
				html += `<div class="answer" data-answer="${answer}">${answer}</div>`;
			});
		} else {
			this.question.textContent = `Какую из этих картин написал ${question.author} ?`;
			let answerOptions = ["A", "B", "C", "D"];
			answers.forEach((answer, i) => {
				html += `<div class="answer" data-answer="${answer.name}">${answerOptions[i]}</div>`;
				urls.push(
					LoadImage.load(
						`https://raw.githubusercontent.com/brodozer/image-data/master/img/${answer.imageNum}.jpg`
					)
				);
			});
		}
		console.log("quiz answers ", html);
		const statusesPromise = await Promise.allSettled(urls);
		statusesPromise.forEach((item, i) => {
			if (item.status === "fulfilled") {
				console.log("img quiz ", item.value);
				// ? картинки или бекграунд
				if (this.answeredAmount > 0) {
					this.imgs[i].lastChild.remove();
				}
				this.imgs[i].append(item.value);
				//this.imgs[i].style.backgroundImage = `url("${item.value.src}")`; // item.value === image
			} else {
				console.log(item.reason.message);
				//throw item.reason;
			}
		});
		this.answers.innerHTML = html;
		if (this.answeredAmount == 0) {
			this.quiz.className = `quiz quiz-${this.type}`;
			this.quiz.classList.add("toggle");
		} else {
			// убрать модалку c результатом ответа на вопрос
			//
			this.modals.classList.remove("toggle");
		}
		this.startTimer();
	}
	calculateCorrectAnswer(result) {
		let total = result.filter((e) => e == true).length;
		return total;
	}

	//timer
	timer() {
		if (this.optTimer.seconds < 0) {
			clearInterval(this.optTimer.id);
			console.log("time out");
			this.playAudio(this.sounds.wrong);
			this.roundResult.push(false);
			this.renderResult(false);
		} else {
			let strTimer = `00:${
				this.optTimer.seconds < 10
					? "0" + this.optTimer.seconds
					: this.optTimer.seconds
			}`;
			this.quizTimer.innerHTML = strTimer;
		}
		--this.optTimer.seconds;
	}

	startTimer() {
		if (this.opt.timer) {
			this.optTimer.seconds = this.opt.seconds;
			this.optTimer.id = setInterval(() => {
				this.timer();
			}, 1000);
		}
	}

	closeQuiz() {
		this.modals.classList.remove("toggle");
		this.modalNextRound.classList.remove("active");
		/*
			todo закрыть квиз, показать категории
			todo вызывать при клике по кнопке категорий и кнопке no в модалке modalNextRound
		*/
	}
}

export default Round;
