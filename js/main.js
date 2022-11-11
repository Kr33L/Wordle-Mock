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
	setTargetWord();
	refreshTimer();
	logLocalStorage();
});