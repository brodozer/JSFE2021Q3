"use strict";

import LoadImage from "./loadImage";

class Quiz {
	constructor(quiz, type, opt, questions, id) {
		//this.loadImage = new LoadImage(); // объект с методом для загрузки картинок
		//quiz
		this.quiz = quiz; // ижект темплейта в зависимости от типа квиза
		this.answers = this.quiz.querySelector(".answers");
		this.progress = this.quiz.querySelector(".progress");
		this.progressBullets = false;
		this.question = this.quiz.querySelector(".question");
		this.imgContainer = this.quiz.querySelector(".img-container");
		//modals
		this.modals = document.querySelector(".modals-container");
		this.btnNextQuestion = this.modals.querySelector(".btn-next-question");
		this.btnNextRound = this.modals.querySelector(".btn-next-round");
		this.btnYes = this.modals.querySelector(".btn-yes");
		this.btnNo = this.modals.querySelector(".brn-no");
		this.modalNextRound = this.modals.querySelector(".next-round");
		this.modalNextQuestion = this.modals.querySelector(".next-question");
		this.modalGameOver = this.modals.querySelector(".game-over");

		this.statisticAnswers = [];
		this.imgs = false;
		this.type = type; // тип квиза авторы/картины (нужно для класса контейнера и темплейта html!)
		this.opt = opt; // опции для записи статистики прохождения раунда квиза
		this.questions = questions; // массив из 10 раундов
		this.id = Number(id); // id карточки для которой нужно отобразить вопросы
		this.round = this.questions[this.id]; // текущий раунд квиза (10 вопросов)
		this.answeredAmount = 0;
		this.nextQuestion = this.nextQuestion.bind(this);
		this.checkAnswer = this.checkAnswer.bind(this);
		this.init();
	}

	init() {
		if (this.type === "artists") {
			this.imgContainer.innerHTML = '<div class="img"></div>';
			this.question.textContent = "Кто автор этой картины ?";
		} else {
			this.imgContainer.innerHTML =
				'<div class="img"></div><div class="img"></div><div class="img"></div><div class="img"></div>';
		}

		this.imgs = this.imgContainer.querySelectorAll(".img");
		this.progress.innerHTML =
			'<span class="on"></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>';
		// навесить обработчики - кнопка next, next round, close, categories
		this.progressBullets = this.progress.querySelectorAll("span");
		this.renderQuestion(this.round[this.answeredAmount]);

		// listetner вынести в отдельный метод?
		this.answers.addEventListener("click", this.checkAnswer);
		this.btnNextQuestion.addEventListener("click", this.nextQuestion);
		// показать модалку
	}
	nextQuestion() {
		// проверить, последний вопрос или нет
		this.answeredAmount++;
		if (this.answeredAmount < this.round.length) {
			this.renderQuestion(this.round[this.answeredAmount]); // рендер вопроса
			this.progressBullets[this.answeredAmount].classList.add("on");
		} else {
			console.log("next round --->");
			this.nextRound();
			// показать модалку с переходом на следующий раунд
		}
		// собрать вопрос
		// добавить класс прогрессу
		// убрать модалку
	}
	nextRound() {
		// если пользователь дошел до последнего вопроса
		// повесить на нажатие кнопки в модалке
		this.id++;
		this.round = this.questions[this.id];
		this.answeredAmount = 0;
		this.progressBullets.forEach((bullet, i) => {
			if (i !== 0) {
				bullet.classList.remove("on");
			}
		});
		let correctAnswers = this.calculateCorrectAnswer(this.statisticAnswers); // кол-во правильных ответов
		// записать статистику в опции
		// обновить карточку в категориях
		// сборка и инжект вопроса
		// убрать модалку
	}
	renderResult(isCorrect) {
		let question = this.round[this.answeredAmount];
		let descriptions = `
			<p>${question.name}</p>
			<p>${question.author}</p>
			<p>${question.year}</p>
		`;
		let className = isCorrect ? "correct" : "wrong";
		this.modalNextQuestion.querySelector(
			".img"
		).style.backgroundImage = `url("https://raw.githubusercontent.com/brodozer/image-data/master/full/${question.imageNum}full.jpg")`;
		this.modalNextQuestion.querySelector(".descriptions").innerHTML =
			descriptions;
		this.modalNextQuestion.className = `next-question ${className} modal active`;
		this.modals.classList.add("toggle");
		//собрать модалку
	}
	checkAnswer(event) {
		event.preventDefault();
		let correctAnswer =
			this.type === "artists"
				? this.round[this.answeredAmount].author
				: this.round[this.answeredAmount].name;
		let currentAnswer = event.target
			.closest("label")
			.querySelector("input").value;
		let isCorrect = false;
		if (correctAnswer === currentAnswer) {
			isCorrect = true;
		}
		console.log("correct answer ", correctAnswer);
		console.log("current answer ", currentAnswer);
		this.statisticAnswers.push(isCorrect);
		this.renderResult(isCorrect);
		// проверить ответ
		// показать модалку с результатом
		// записать ответ в результаты (содать временный массив)
		// result = [[1, true]...[5, false]]
		// count = 5 - считать правильные ответы (посчитать в конце!!! )
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
		let imgs = [];
		let html = "";
		if (this.type === "artists") {
			let url = `https://raw.githubusercontent.com/brodozer/image-data/master/full/${question.imageNum}full.jpg`;
			imgs.push(LoadImage.load(url));
			answers.forEach((answer) => {
				html += `
					<label>
						<input type="radio" name="answer" value="${answer}"/>
						<span>${answer}</span>
					</label>
				`;
			});
		} else {
			this.question.textContent = `Какую из этих картин написал ${question.author} ?`;
			let answerOptions = ["A", "B", "C", "D"];
			answers.forEach((answer, i) => {
				html += `
					<label>
						<input type="radio" name="answer" value="${answer.name}"/>
						<span>${answerOptions[i]}</span>
					</label>
				`;
				imgs.push(
					LoadImage.load(
						`https://raw.githubusercontent.com/brodozer/image-data/master/full/${answer.imageNum}full.jpg`
					)
				);
			});
		}
		console.log("quiz answers ", html);
		const statusesPromise = await Promise.allSettled(imgs);
		statusesPromise.forEach((item, i) => {
			if (item.status === "fulfilled") {
				console.log("img quiz ", item.value);
				this.imgs[i].style.backgroundImage = `url("${item.value.src}")`; // item.value === image
			} else {
				console.log(item.reason.message);
				//throw item.reason;
			}
		});
		this.answers.innerHTML = html;
		if (this.answeredAmount == 0) {
			this.quiz.className = `quiz quiz-${this.type}`;
			// body установить overflow: hidden!
		} else {
			// убрать модалку
			this.modals.classList.remove("toggle");
		}
	}
	calculateCorrectAnswer() {
		// мапу заменить на массив
		// пройтись по мапе и вернуть кол-во правильных ответов
		// записать в статистику и вывести в модалку
	}
	closeQuiz() {
		// закрыть квиз, показать категории
		// вызывать при клике по кнопке категорий и кнопке no в модалке modalNextRound
	}
	// методы renderQuestion, shuffleAnswer, checkAnswer вынести в отдельный класс?
}

export default Quiz;
