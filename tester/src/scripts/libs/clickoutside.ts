const ClickOutside = (callback): void => {
	// Clicks
	document.addEventListener(
		"click",
		(e: Event) => {
			const target = e.target as HTMLElement;
			const classTargets = document.querySelectorAll(".co-el") as NodeList;

			// const parent = (<HTMLElement>(<HTMLElement>target).parentNode)
			// if (parent.classList.contains('open')) {
			// 	parent.classList.remove('open')
			// }

			if (target.closest(".co-trigger")) return;

			callback();

			Array.prototype.forEach.call(classTargets, (item) => {
				if (item.classList.contains("open")) {
					item.classList.remove("open");
				}
			});
		},
		false,
	);

	// ESC key
	document.addEventListener("keyup", (e) => {
		const openElements = document.querySelectorAll(".open") as NodeList;
		const keys = e.keyCode || e.which;

		if (keys === 27) {
			callback();

			Array.prototype.forEach.call(openElements, (item) => {
				if (item.classList.contains("open")) {
					item.classList.remove("open");
				}
			});
		}
	});
};
export default ClickOutside;
