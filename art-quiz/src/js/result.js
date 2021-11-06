"use strict";
import LoadImage from "./loadImage";

class Result {
	constructor(result, round, round_id, container) {
		this.result = result.result;
		this.score = result.score;
		this.round = round;
		this.round_id = round_id;
		this.container = container;
		this.urls = []; // перебрать round и собрать  url
		this.renderDescriptions = this.renderDescriptions.bind(this);
		this.renderResult();
	}

	async renderResult() {
		let cards = "";
		console.log(this.round);
		this.round.forEach((el, i) => {
			cards += `
				<div class="card ${this.result[i] ? "correct" : "wrong"}" data-id="${i}">
					<div class="img">
						<img src="https://raw.githubusercontent.com/brodozer/image-data/master/img/${
							el.imageNum
						}.jpg">
					</div>
				</div>
			`;
			this.urls.push(
				LoadImage.load(
					`https://raw.githubusercontent.com/brodozer/image-data/master/img/${el.imageNum}.jpg`
				)
			);
		});
		let html = `
			<div class="result">
				<div class="title">result round ${Number(this.round_id) + 1} (${
			this.score
		}/10)</div>
				<div class="content">${cards}</div>
			</div>
		`;

		const statusesPromise = await Promise.allSettled(this.urls);

		statusesPromise.forEach((p, i) => {
			if (p.status === "fulfilled") {
				console.log("loadImg, ", p.value.src);
				// создавать карточку
				// инжектить img
				// инжектить карточку
				// вешать обработчик на карточку
			} else {
				console.log(item.reason.message);
				//throw item.reason;
			}
		});

		console.log("promise done");
		//this.container.innerHTML = html;
		this.container.querySelector(".categories").classList.add("d-none");
		this.container.insertAdjacentHTML("beforeend", html);

		// нужно скрыть категории, показать результаты

		document.querySelectorAll(".result .card").forEach((card) => {
			card.addEventListener("click", this.renderDescriptions);
		});
	}
	renderDescriptions(event) {
		const parent = event.target.closest(".card");
		const id = parent.dataset.id;

		parent.removeEventListener("click", this.renderDescriptions);

		let descriptions = document.createElement("div");
		descriptions.className = "descriptions";
		const html = `		
			<p>${this.round[id].name}</p>
			<p>${this.round[id].author}</p>
			<p>${this.round[id].year}</p>
		`;
		descriptions.innerHTML = html;
		parent.appendChild(descriptions);
		descriptions.style.animationPlayState = "running";
	}
}

export default Result;
