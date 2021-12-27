import Animation from "./animation";

class Quiz {
	constructor(body, category, setting) {
		this.body = body;
		this.category = category;
		this.setting = setting;
		this.btnSettings = this.body.querySelector(".btn-settings");
		this.quizType = this.body.querySelector(".quiz-type");
		this.header = this.body.querySelector(".header");
		this.header.addEventListener("click", (event) => {
			const target = event.target;
			const currentBtn = target.closest(".btn");
			if (currentBtn) {
				if (currentBtn.classList.contains("btn-home")) {
					this.showHome();
				} else {
					this.showCategories();
				}
			}
		});
		this.quizType.addEventListener(
			"click",
			this.category.renderCategories.bind(this)
		);
		this.category.round.btnHome.addEventListener("click", () => {
			this.showHome();
			this.category.round.closeQuiz();
		});
		this.btnSettings.addEventListener("click", () => {
			Animation.fadeOut(this.category.home, this.setting.settings);
		});
		this.setting.setSettings();
	}

	showCategories() {
		this.category.btnCategories.classList.remove("active");
		this.category.btnHome.dataset.hide = "categories";
		Animation.fadeOut(this.category.result.result, this.category.categories);
	}

	showHome() {
		const hide = document.getElementById(this.category.btnHome.dataset.hide);
		this.category.btnHome.classList.remove("active");
		this.category.btnCategories.classList.remove("active");
		Animation.fadeOut(hide, this.category.home);
	}
}

export default Quiz;
