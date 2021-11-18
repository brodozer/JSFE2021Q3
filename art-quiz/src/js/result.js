"use strict";
import LoadImage from "./loadImage";
import Animation from "./animation";

class Result {
	constructor(body) {
		this.body = body;
		this.result = this.body.querySelector(".result");
		this.categoties = this.body.querySelector(".categories");
		this.title = this.result.querySelector(".result .title");
		this.content = this.result.querySelector(".result .content");
		this.round = [];
		this.renderDescriptions = this.renderDescriptions.bind(this);
	}

	async renderResult(result, round, round_id) {
		this.round = round;
		const urls = [];
		this.content.innerHTML = "";
		this.title.textContent = `result round ${Number(round_id) + 1} (${
			result.score
		}/10)`;
		round.forEach((el) => {
			urls.push(
				LoadImage.load(
					`https://raw.githubusercontent.com/brodozer/image-data/master/img/${el.imageNum}.jpg`
				)
			);
		});

		const statusesPromise = await Promise.allSettled(urls);

		statusesPromise.forEach((p, i) => {
			if (p.status === "fulfilled") {
				//console.log("loadImg, ", p.value.src);
				const card = document.createElement("div");
				card.className = `card ${result.result[i] ? "correct" : "wrong"}`;
				card.dataset.id = i;
				card.append(p.value);
				this.content.append(card);
			} else {
				console.log(item.reason.message);
				//throw item.reason;
			}
		});

		console.log("promise done");
		Animation.fadeOut(this.categoties, this.result);

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
