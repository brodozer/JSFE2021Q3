"use strict";

import Animation from "./animation";

class Quiz {
	constructor(body, category, setting) {
		this.body = body;
		this.category = category;
		this.setting = setting;
		//buttons
		this.artists = document.getElementById("artists");
		this.pictures = document.getElementById("pictures");
		this.btnSettings = this.body.querySelector(".btn-settings");
		this.btnHome = this.body.querySelector(".header .btn-home");
		this.btnCategories = this.body.querySelector(".header .btn-categories");
		//pages
		this.home = this.body.querySelector(".home");
		this.settings = this.body.querySelector(".settings");
		this.result = this.body.querySelector(".result");
		this.categories = this.body.querySelector(".categories");
		//events
		this.artists.addEventListener(
			"click",
			this.category.renderCategories.bind(this)
		);
		this.pictures.addEventListener(
			"click",
			this.category.renderCategories.bind(this)
		);
		this.btnHome.addEventListener("click", this.showHome.bind(this));
		this.btnCategories.addEventListener(
			"click",
			this.showCategories.bind(this)
		);

		this.btnSettings.addEventListener("click", () => {
			Animation.fadeOut(this.home, this.settings);
		});
		this.setting.setSettings();
	}
	showCategories() {
		this.btnCategories.classList.remove("active");
		this.btnHome.dataset.hide = "categories";
		Animation.fadeOut(this.result, this.categories);
	}

	showHome(event) {
		const hide = document.getElementById(
			event.target.closest("button").dataset.hide
		);
		this.btnHome.classList.remove("active");
		this.btnCategories.classList.remove("active");
		Animation.fadeOut(hide, this.home);
	}
}

export default Quiz;
