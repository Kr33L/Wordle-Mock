function getRandomWord() {
	const randomIndex = Math.floor(Math.random() * dictionary.length);
	const randomWord = dictionary[randomIndex];
	return randomWord;
}

function dateFormat() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();
	if (hour < 10) hour = "0" + hour;
	if (minute < 10) minute = "0" + minute;
	const currentDate = `Last refresh was on ${day}/${month}/${year} at ${hour}:${minute}`;
	return currentDate;
}

function timeUntilRefresh() {
	const lastUpdated = localStorage.getItem("lastUpdated");
	const refreshTime = 86400000 - (Date.now() - lastUpdated);
	localStorage.setItem("timeUntilRefresh", refreshTime);
	return refreshTime + " ms";
}

function setLocalStorage() {
	if (localStorage.length === 0 || Date.now() - lastUpdated > 86400000) {
		localStorage.setItem("lastUpdated", Date.now());
		localStorage.setItem("lastUpdatedHuman", dateFormat());
		localStorage.setItem("targetWord", getRandomWord());
	}
}

function displayLocalStorage() {
	console.group("Local Storage");
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		console.log(`%c${key}: %c${value}`, "color: lightblue", "color: white");
	}
	console.groupEnd();
}

//functions for wordle game
