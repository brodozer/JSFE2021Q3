class Animation {
	static minOpacityValue = 0;
	static maxOpacityValue = 1;
	static opacityStep = 0.1;
	static fadeOut(hide, show) {
		let opacity = this.maxOpacityValue;
		const timer = setInterval(() => {
			if (opacity <= this.opacityStep) {
				opacity = this.minOpacityValue;
				clearInterval(timer);
				hide.classList.add("d-none");
				if (show) {
					this.fadeIn(show);
				}
			}
			hide.style.opacity = parseFloat(opacity);
			opacity -= opacity * this.opacityStep;
		}, 10);
	}

	static fadeIn(el) {
		let opacity = this.opacityStep;
		el.style.opacity = opacity;
		el.classList.remove("d-none");

		const timer = setInterval(() => {
			if (opacity >= this.maxOpacityValue) {
				opacity = this.maxOpacityValue;
				clearInterval(timer);
			}

			el.style.opacity = opacity;
			opacity += opacity * 0.1;
		}, 10);
	}
}

export default Animation;
