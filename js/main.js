(function loadScripts() {
	const scripts = ["js/words.js", "js/functions.js"];
	for (const i of scripts) {
		const script = document.createElement("script");
		script.src = i;
		document.body.appendChild(script);
	}
})();

//wait until window has fully loaded
window.addEventListener("load", function () {
	startGame();

	// <====== event handlers ======>
	dataKeys.forEach((key) => {
		key.addEventListener("click", (e) => {
			//if (e.target.dataset.key === "ENTER") { do something }
			//if (e.target.dataset.key === "DELETE") { do something }
			checkKey(e.target.dataset.key);
		});
	});

	document.addEventListener("keydown", (e) => {
		checkKey(e.key.toUpperCase());
	});
});
