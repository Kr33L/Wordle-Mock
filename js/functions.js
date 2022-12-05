const gameGrid = document.querySelector("[data-grid]");
const keyboard = document.querySelector("[data-keyboard]");
const gridTiles = document.querySelectorAll("[data-tile]");
const dataKeys = document.querySelectorAll("[data-key]");

const maxLength = 5;

// <====== main functions ======>

// <--- set data in local storage --->

function setLocalStorage() {
	const randomIndex = Math.floor(Math.random() * dictionary.length);
	const targetWord = dictionary[randomIndex].toUpperCase();
	const readableDate = `Last refresh was on ${date.day}/${date.month} at ${date.hour}:${date.minute}`;

	function refreshTimer() {
		const lastUpdated = localStorage.getItem("lastUpdated");
		const refreshTime = 86400000 - (Date.now() - lastUpdated) + "ms";
		return refreshTime;
	}

	if (localStorage.length === 0 || refreshTimer() < 0) {
		localStorage.setItem("lastUpdated", Date.now());
		localStorage.setItem("lastUpdatedHuman", readableDate);
		localStorage.setItem("targetWord", targetWord);
		localStorage.setItem("timeUntilRefresh", refreshTimer());
	} else {
		localStorage.setItem("timeUntilRefresh", refreshTimer());
	}
}

// <--- show input on the grid --->
function gridInput(key) {
	for (let i = 0; i < gridTiles.length; i++) {
		const tile = gridTiles[i];
		const tileText = tile.textContent;

		if (key.match(/^[a-z]$/i) && tileText === "" && maxLength > i) {
			tile.textContent = key;
			break;
		}
	}
}

// <--- check if key matches target word --->
function checkKey(key) {
	const targetWord = localStorage.getItem("targetWord");
	const outcome = (type, backgroundColor) => console.log(`%c${type}`, `background-color: ${backgroundColor}; color: black; padding: 10px;`);

	if (key === "F12") return;
	if (key === " ") key = "SPACE";
	if (!targetWord) return console.error("No target word available");
	if (!key.match(/^[a-z]$/i)) return console.error(`${key} is not a letter`);

	targetWord.includes(key) ? outcome("Correct", "lightGreen") : outcome("Incorrect", "Orange");
}

// <====== helper functions ======>

// <--- log current content of the localStorage in console --->

function logLocalStorage() {
	console.group("%c<-- Local Storage -->", "color: #fff; background: #000; padding: 50px;");

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);

		if (key === "lastUpdated" || key === "lastUpdatedHuman" || key === "targetWord" || key === "timeUntilRefresh") {
			console.log(`%c${key}: %c${value}`, "color: black; background: white; padding: 10px;");
		}
	}

	console.groupEnd();
}

// <--- clear data from local storage --->
function clearData() {
	if (localStorage.length === 0) return console.error("No data to clear");

	localStorage.clear();
	console.info("Local storage cleared");
}

// <--- display a blinking message on the page --->
function displayMessage(message, time) {
	const messageContainer = document.querySelector("#blinker");
	const initialMessage = messageContainer.textContent;

	let showingMessage = true;

	setInterval(() => {
		if (showingMessage) {
			messageContainer.textContent = message;
			showingMessage = false;
		} else {
			messageContainer.textContent = initialMessage;
			showingMessage = true;
		}
	}, time);
}

// <====== human readable date and time ======>
const addZero = (num) => (num < 10 ? "0" + num : num);
const now = new Date();
const date = {
	month: addZero(now.getMonth() + 1),
	day: addZero(now.getDate()),
	hour: addZero(now.getHours()),
	minute: addZero(now.getMinutes()),
};
