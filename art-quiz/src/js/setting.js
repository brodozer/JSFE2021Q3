"use strict";

import Animation from "./animation";

class Setting {
	constructor(body, opt) {
		this.opt = opt;
		this.body = body;
		this.btnSave = this.body.querySelector(".btn-save");
		this.btnDefault = this.body.querySelector(".btn-default");
		this.home = this.body.querySelector(".home");
		this.settings = this.body.querySelector(".settings");
		this.volume = this.body.querySelector(".volume");
		this.muted = this.body.querySelector(".mute");
		this.timer = this.body.querySelector(".timer");
		this.seconds = this.body.querySelector(".seconds");
		this.btnIncrease = this.body.querySelector(".btn-increase");
		this.btnDecrease = this.body.querySelector(".btn-decrease");

		this.defOpt = {
			volume: 0.5,
			timer: false,
			seconds: 15,
			muted: false,
		};

		this.saveSettings = this.saveSettings.bind(this);
		this.resetSetings = this.resetSetings.bind(this);
		this.events();
	}

	events() {
		this.btnSave.addEventListener("click", this.saveSettings);
		this.btnDefault.addEventListener("click", this.resetSetings);
		this.btnDecrease.addEventListener("click", () => {
			this.seconds.stepDown();
		});
		this.btnIncrease.addEventListener("click", () => {
			this.seconds.stepUp();
		});
	}

	saveSettings() {
		this.opt.volume = this.volume.value;
		this.opt.timer = this.timer.checked;
		this.opt.seconds = this.seconds.value;
		this.opt.muted = this.muted.checked;
		Animation.fadeOut(this.settings, this.home);
	}

	resetSetings() {
		for (const key in this.defOpt) {
			this.opt[key] = this.defOpt[key];
		}
		this.setSettings();
		Animation.fadeOut(this.settings, this.home);
	}

	setSettings() {
		this.volume.value = this.opt.volume;
		this.timer.checked = this.opt.timer;
		this.muted.checked = this.opt.muted;
		this.seconds.value = this.opt.seconds;
	}
}

export default Setting;
