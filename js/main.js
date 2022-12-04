function loadScripts() {
	const scripts = ["js/words.js", "js/functions.js"];

	scripts.forEach((scriptPath) => {
		const script = document.createElement("script");
		script.src = scriptPath;
		document.body.appendChild(script);
	});
}

loadScripts();

window.addEventListener("load", function () {
	setLocalStorage();
	logLocalStorage();

	displayMessage("Open the CONSOLE window!", 1000);

	// <====== event handlers ======>
	dataKeys.forEach((key) => {
		key.addEventListener("click", (event) => {
			gridInput(event.target.dataset.key);
			checkKey(event.target.dataset.key);
		});
	});

	document.addEventListener("keydown", (event) => {
		gridInput(event.key.toUpperCase());
		checkKey(event.key.toUpperCase());
	});
});
