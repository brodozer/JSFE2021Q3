class Animation {
	static fadeOut(hide, show) {
		let opacity = 1;
		const timer = setInterval(() => {
			if (opacity <= 0.1) {
				clearInterval(timer);
				hide.classList.add("d-none");
				if (show) {
					this.fadeIn(show);
				}
			}
			hide.style.opacity = parseFloat(opacity);
			opacity -= opacity * 0.1;
		}, 10);
	}

	static fadeIn(el) {
		let opacity = 0.01;
		el.classList.remove("d-none");

		const timer = setInterval(() => {
			if (opacity >= 1) {
				clearInterval(timer);
			}

			el.style.opacity = opacity;
			opacity += opacity * 0.1;
		}, 10);
	}
}

export default Animation;
