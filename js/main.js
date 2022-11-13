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

	//display message while console window is closed
	displayMessage("Open your console window", 5000);

	// <====== event handlers ======>
	dataKeys.forEach((key) => {
		key.addEventListener("click", (e) => {
			gridInput(e.target.dataset.key);
			checkKey(e.target.dataset.key);
		});
	});

	document.addEventListener("keydown", (e) => {
		gridInput(e.key.toUpperCase());
		checkKey(e.key.toUpperCase());
	});
});
