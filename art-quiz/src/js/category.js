"use strict";

import Animation from "./animation";

class Category {
	constructor(body, opt, data, result, round) {
		this.body = body;
		this.container = this.body.querySelector(".categories .content");
		this.opt = opt;
		this.data = data;
		this.type = false;
		this.result = result;
		this.round = round;

		// this.categoriesImgs = {
		// 	artists: [],
		// 	pictures: [],
		// };

		this.btnHome = this.body.querySelector(".header .btn-home");
		this.btnCategories = this.body.querySelector(".header .btn-categories");
		this.home = this.body.querySelector(".home");
		this.categories = this.body.querySelector(".categories");
		this.container.addEventListener("click", this.cardsHandler.bind(this));
		this.renderCategories = this.renderCategories.bind(this);
	}
	renderCategories(event) {
		this.type = event.target.closest(".card").id;
		let cards = "";
		// массив картинок категорий (первая картинка вопроса раунда) динамичные картинки категорий с гитхаба
		// if (this.categoriesImgs[this.type].length == 0) {
		// 	const urls = [];
		// 	this.questions[this.type].forEach((round) => {
		// 		urls.push(
		// 			`https://raw.githubusercontent.com/brodozer/image-data/master/img/${round[0].imageNum}.jpg`
		// 		);
		// 	});
		// 	this.categoriesImgs[this.type] = urls;
		// 	console.log("categeories imgs ", urls);
		// }
		for (let i = 0; i < 12; i++) {
			let res = this.opt[this.type].find((r) => r.id == i);
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

		this.container.innerHTML = cards;
		this.btnHome.classList.add("active");
		this.btnHome.dataset.hide = "categories";
		Animation.fadeOut(this.home, this.categories);
	}
	cardsHandler(event) {
		if (event.target.closest(".card")) {
			let cardId = event.target.closest(".card").id;
			let round = this.data.questions[this.type][cardId];
			console.log("round ", round);
			console.log("card id ", cardId);
			if (event.target.tagName === "BUTTON") {
				// ? что если пользователь нажал не по кнопке а по элементу внутри кнопки
				this.btnCategories.classList.add("active");
				this.btnHome.dataset.hide = "result";
				this.result.renderResult(
					this.opt[this.type].find((res) => res.id == cardId),
					this.data.questions[this.type][cardId],
					cardId
				);
			} else {
				if (event.target.closest(".card").classList.contains("played")) {
					this.data.getQuestions();
				}
				this.round.start(this.type, this.data.questions[this.type], cardId);
			}
		}
	}
}

export default Category;
