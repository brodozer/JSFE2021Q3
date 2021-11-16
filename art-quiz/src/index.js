"use strict";

import "./sass/style.scss";

import Quiz from "./js/quiz";
import Round from "./js/round";
import Result from "./js/result";
import Category from "./js/category";
import Setting from "./js/setting";
import Data from "./js/data";

class Main {
	static init() {
		const body = document.body;
		let options = {};
		if (localStorage.opt) {
			options = JSON.parse(localStorage.opt);
		} else {
			options = {
				volume: 0.5,
				muted: false,
				timer: false,
				seconds: 15,
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
		const data = new Data();
		const result = new Result(body);
		const round = new Round(body, options);
		const setting = new Setting(body, options);
		const category = new Category(body, options, data, result, round);
		const quiz = new Quiz(body, category, setting);
		//  повесить обработчики для  ls и записывать данные перед закрытием страницы
	}
}

Main.init();

//const settings = new Settings();
