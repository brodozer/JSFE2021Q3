"use strict";

class Data {
	constructor() {
		this.data = [];
		this.questions = {};
		this.fetch();
	}
	async fetch() {
		try {
			const url = "js/images.json";

			const res = await fetch(url);
			const data = await res.json();
			//console.log(url, data);

			this.data = data;
			this.getQuestions(this.data);
			//console.log(this.questions);
		} catch (error) {
			alert(error);
		}
	}

	getQuestions() {
		let cloneData = this.data.map((a) => ({ ...a }));
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
}

export default Data;
