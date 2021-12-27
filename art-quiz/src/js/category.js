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
		for (let i = 0; i < this.data.numberRounds; i++) {
			let result = this.opt[this.type].find((r) => r.id == i);
			if (result) {
				cards += `
					<div class="card played" id="${i}">
						<div class="card-title">
							<div class="number color">${i + 1}</div>
							<div class="score">${result.score}/10</div>
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
		const eventTarget = event.target;
		const currentCard = eventTarget.closest(".card");
		if (currentCard) {
			const cardId = currentCard.id;
			if (eventTarget.tagName === "BUTTON") {
				this.btnCategories.classList.add("active");
				this.btnHome.dataset.hide = "result";
				this.result.renderResult(
					this.opt[this.type].find((res) => res.id == cardId),
					this.data.questions[this.type][cardId],
					cardId,
					this.categories
				);
			} else {
				if (eventTarget.closest(".card").classList.contains("played")) {
					this.data.getQuestions();
				}
				this.round.start(this.type, this.data.questions[this.type], cardId);
			}
		}
	}
}

export default Category;
