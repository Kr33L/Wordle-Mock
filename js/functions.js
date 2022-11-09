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
	const hour = date.getHours();
	let (hour < 10) {
		hour = "0" + hour;
	}
	let minute = date.getMinutes();
	if (minute < 10) {
		minute = "0" + minute;
	}
	const currentDate = `Last refresh was on ${day}/${month}/${year} at ${hour}:${minute}`;
	return currentDate;
}

function timeUntilRefresh() {
	const lastUpdated = localStorage.getItem("lastUpdated");
	const refreshTime = 86400000 - (Date.now() - lastUpdated);
	return refreshTime + " ms";
}

//object containing all the key value pairs from local storage
function setLocalStorage() {
	if (localStorage.length === 0 || Date.now() - lastUpdated > 86400000) {
		localStorage.setItem("lastUpdated", Date.now());
		localStorage.setItem("lastUpdatedHuman", dateFormat());
		localStorage.setItem("timeUntilRefresh", timeUntilRefresh());
		localStorage.setItem("targetWord", getRandomWord());
	}
}

//iterate through local storage and display the key value pairs
function displayLocalStorage() {
	console.group("Local Storage");
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		//color code the key value pairs
		const value = localStorage.getItem(key);
		console.log(`%c${key}: %c${value}`, "color: lightblue", "color: white");
	}
	console.groupEnd();
}

function setTargetWord() {
	const targetWord = localStorage.getItem("targetWord");
	const lastUpdated = localStorage.getItem("lastUpdated");
	//if local storage is empty, or if the word is older than 24 hours, get a new word
	if (targetWord === null || lastUpdated === null || Date.now() - lastUpdated > 86400000) {
		setLocalStorage();
		displayLocalStorage();
	}
}

//functions for wordle game
