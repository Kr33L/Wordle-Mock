function loadScript(src) {
	const script = document.createElement("script");
	script.src = src;
	document.body.appendChild(script);
}

loadScript("js/words.js");
setTimeout(() => {
	loadScript("js/main.js");
});

//get a random word from the dictionary array

function getRandomWord() {
	const randomIndex = Math.floor(Math.random() * dictionary.length);
	return dictionary[randomIndex];
}
