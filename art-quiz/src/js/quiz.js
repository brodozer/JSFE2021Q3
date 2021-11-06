"use strict";
import LoadImage from "./loadImage";

class Quiz {
	constructor(quiz, type, opt, questions, id) {
		this.loadImage = new LoadImage(); // объект для загрузки картинок
		//quiz
		this.quiz = quiz; // ижект темплейта в зависимости от типа квиза
		this.answers = this.quiz.querySelector(".answers");
		this.progress = this.quiz.querySelector(".progress");
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

		this.statisticsAnswer = [];
		this.imgs = false;
		this.type = type; // тип квиза авторы/картины (нужно для класса контейнера и темплейта html!)
		this.opt = opt; // опции для записи статистики прохождения раунда квиза
		this.questions = questions; // массив из 10 раундов
		this.id = Number(id); // id карточки для которой нужно отобразить вопросы
		this.round = this.questions[this.id]; // текущий раунд квиза (10 вопросов)
		this.answeredAmount = 0;
		this.nextQuestion = this.nextQuestion.bind(this);
		this.renderResult = this.renderResult.bind(this);
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
		this.renderQuestion(this.round[this.answeredAmount]);

		// listetner вынести в отдельный метод?
		this.answers.addEventListener("click", this.renderResult);
		this.btnNextQuestion.addEventListener("click", this.nextQuestion);
		// показать модалку
	}
	nextQuestion() {
		// проверить, последний вопрос или нет
		this.answeredAmount++;
		if (this.answeredAmount < this.round.length) {
			this.renderQuestion(this.round[this.answeredAmount]); // рендер вопроса
			this.progress[this.answeredAmount].classList.add("on");
		} else {
			console.log("next quiz --->");
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
		// обнулять счетчик вопроса
		this.id++;
		// перезаписывать раунд!!!
		this.answeredAmount = 0;
		let correctAnswers = this.calculateCorrectAnswer(this.statisticsAnswer); // кол-во правильных ответов
		// записать статистику в опции
		// обновить карточку в категориях
		// добавить id++
		// сборка и инжект вопроса
		// убрать модалку
	}
	renderResult() {
		// запускать checkAnswer
		// собрать и показывать модалку с рузультатами
	}
	checkAnswer() {
		let correctAnswer = "";
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
		console.log("question ", question.imageNum);
		let html = "";
		if (this.type === "artists") {
			console.log("num img ", question.imageNum);
			let url = `https://raw.githubusercontent.com/brodozer/image-data/master/full/${question.imageNum}full.jpg`;
			let img = await this.loadImage.load(url); // try catch для обработки ошибок
			console.log("img quiz ", img);
			this.imgs[0].style.backgroundImage = `url("${img.src}")`;
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
			let imgs = [];
			answers.forEach((answer, i) => {
				html += `
					<label>
						<input type="radio" name="answer" value="${answer.name}"/>
						<span>${answerOptions[i]}</span>
					</label>
				`;
				imgs.push(
					this.loadImage.load(
						`https://raw.githubusercontent.com/brodozer/image-data/master/full/${answer.imageNum}full.jpg`
					)
				);
			});
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
		}
		console.log("quiz answers ", html);
		this.answers.innerHTML = html;
		if (this.answeredAmount == 0) {
			this.quiz.className = `quiz quiz-${this.type}`;
		} else {
			// убрать модалку
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
