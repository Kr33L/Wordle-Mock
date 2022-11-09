const storage = {
	lastUpdatedHuman: localStorage.getItem("lastUpdatedHuman"),
	randomWord: localStorage.getItem("randomWord"),
	lastUpdated: localStorage.getItem("lastUpdated"),
};

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
	const minute = date.getMinutes();
	if (minute < 10) {
		minute = "0" + minute;
	}
	const currentDate = `Last refresh was on ${day}/${month}/${year} at ${hour}:${minute}`;
	return currentDate;
}

function timeUntilRefresh() {
  const lastUpdated = localStorage.getItem("lastUpdated");
  const timeUntilRefresh = 86400000 - (new Date() - lastUpdated);
  return timeUntilRefresh;
}

function setLocalStorage() {
	console.log(storage);
	localStorage.setItem("lastUpdated", Date.now());
	localStorage.setItem("lastUpdatedHuman", dateFormat());
  localStorage.setItem("timeUntilRefresh", timeUntilRefresh());
	localStorage.setItem("targetWord", getRandomWord());
	console.log(storage);
}

function getWord() {
	const targetWord = localStorage.getItem("targetWord");
	const lastUpdated = localStorage.getItem("lastUpdated");
	//if local storage is empty, or if the word is older than 24 hours, get a new word
	if (targetWord === null || lastUpdated === null || Date.now() - lastUpdated > 86400000) {
		setLocalStorage();
	}
}
