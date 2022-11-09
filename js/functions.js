function getRandomWord() {
	const randomIndex = Math.floor(Math.random() * dictionary.length); //gets a random index of the dictionary array
	const randomWord = dictionary[randomIndex]; //assign the random indexed word to a variable
	return randomWord; // return the random word
}

function dateFormat() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const hour = date.getHours();
	if (hour < 10) {
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
	const refreshTime = 86400000 - (new Date() - lastUpdated);
	return refreshTime + " ms";
}

//object containing all the key value pairs from local storage
function setLocalStorage() {
	displayLocalStorage();
	localStorage.setItem("lastUpdated", Date.now());
	localStorage.setItem("lastUpdatedHuman", dateFormat());
	localStorage.setItem("timeUntilRefresh", timeUntilRefresh());
	localStorage.setItem("targetWord", getRandomWord());
	displayLocalStorage();
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

function getWord() {
	const targetWord = localStorage.getItem("targetWord");
	const lastUpdated = localStorage.getItem("lastUpdated");
	//if local storage is empty, or if the word is older than 24 hours, get a new word
	if (targetWord === null || lastUpdated === null || Date.now() - lastUpdated > 86400000) {
		setLocalStorage();
	}
}
