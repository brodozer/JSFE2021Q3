"use strict";

import "./sass/style.scss";
//import "./js/settings";

import Settings from "./js/settings";
import Quiz from "./js/quiz";
import Result from "./js/result";
//import Animation from "./js/animation";

class Main {
	static init() {
		const body = document.body;
		let options = false;
		if (localStorage.opt) {
			options = JSON.parse(localStorage.opt);
		} else {
			options = {
				volume: 50,
				timer: false,
				//artists: [],
				//pictures: [],
				artists: [
					{
						id: 3,
						score: 5,
						result: [
							true,
							false,
							true,
							true,
							true,
							true,
							true,
							false,
							true,
							true,
						],
					},
				],
				pictures: [
					{
						id: 5,
						score: 7,
						result: [],
					},
				],
			};
		}
		console.log(options);
		const quiz = new Quiz(body, options);
		const result = new Result(body);
		const settings = new Settings(body, result, quiz, options);
		settings.init();
	}
}

Main.init();

//const settings = new Settings();
