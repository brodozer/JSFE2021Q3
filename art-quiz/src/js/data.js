class Data {
	constructor() {
		this.numberAnswers = 4;
		this.numberQuestions = 10;
		this.numberRounds = 12;
		this.data = [];
		this.questions = {};
		this.fetch();
	}

	async fetch() {
		try {
			const url = "assets/data/images.json";
			const response = await fetch(url);
			const data = await response.json();
			this.data = data;
			this.getQuestions();
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
			if (round.length == this.numberQuestions) {
				if (this.questions.artists.length < this.numberRounds) {
					this.questions.artists.push(round);
				} else {
					this.questions.pictures.push(round);
				}

				round = [];
			}
			if (this.questions.artists.length < this.numberRounds) {
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
		for (let i = 0; answers.length < this.numberAnswers; i++) {
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
		for (let i = 0; answers.length < this.numberAnswers; i++) {
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
