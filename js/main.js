(function loadScripts() {
	const scripts = ["js/words.js", "js/functions.js"];

	scripts.forEach((scriptPath) => {
		const script = document.createElement("script");
		script.src = scriptPath;
		document.body.appendChild(script);
	});
})();

window.addEventListener("load", function () {
	setLocalStorage();
	logLocalStorage();

	displayMessage("Open the CONSOLE window!", 1000);

	dataKeys.forEach((key) => {
		key.addEventListener("click", handleInputEvent);
		document.addEventListener("keydown", handleInputEvent);
	});
});
