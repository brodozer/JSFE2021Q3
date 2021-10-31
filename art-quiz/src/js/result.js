"use strict";

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

	loadImage(url) {
		return new Promise((resolve, reject) => {
			let image = new Image();

			image.onload = () => resolve(image);
			const msg = `Could not load image at ${url}`;
			image.onerror = () => reject(new Error(msg));
			image.src = url;
		});
	}

	addCard(src, index, content) {
		// собирать и вставлять карточку
		let html = `
			<div class="card ${
				this.result.get(index) ? "correct" : "wrong"
			}" data-id="${index}">
				<div class="img">
					<img src="${src}">
				</div>
			</div>
		`;
		content.insertAdjacentHTML("beforeend", html);
	}

	// async renderResult() {
	// 	let html = `
	// 		<div class="result">
	// 			<div class="title">result round ${Number(this.round_id) + 1} (${
	// 		this.score
	// 	}/10)</div>
	// 			<div class="content">${cards}</div>
	// 		</div>
	// 	`;
	// 	this.container.innerHTML = html;

	// 	const content = this.container.querySelector('.content');

	// 	await Promise.all(this.urls)
	// 		.then(imgs => images
	// 		.forEach((img, i) => this.addCard(img.src, i, content)))
	// 		.catch(err => alert(err))
	// }

	renderResult() {
		let cards = "";
		console.log(this.round);
		this.round.forEach((el, i) => {
			cards += `
				<div class="card ${this.result.get(i) ? "correct" : "wrong"}" data-id="${i}">
					<div class="img">
						<img src="https://raw.githubusercontent.com/brodozer/image-data/master/img/${
							el.imageNum
						}.jpg">
					</div>
				</div>
		`;
		});
		let html = `
			<div class="result">
				<div class="title">result round ${Number(this.round_id) + 1} (${
			this.score
		}/10)</div>
				<div class="content">${cards}</div>
			</div>
		`;
		this.container.innerHTML = html;

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
