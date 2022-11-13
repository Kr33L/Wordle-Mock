const gameGrid = document.querySelector("[data-grid]");
const keyboard = document.querySelector("[data-keyboard]");
const gridTiles = document.querySelectorAll("[data-tile]");
const dataKeys = document.querySelectorAll("[data-key]");

// <====== human readable date and time ======>
const addZero = (num) => (num < 10 ? "0" + num : num);
const now = new Date();
const date = {
	month: addZero(now.getMonth() + 1),
	day: addZero(now.getDate()),
	hour: addZero(now.getHours()),
	minute: addZero(now.getMinutes()),
};

// <====== set data in local storage ======>
function setLocalStorage() {
	const targetWord = dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();
	const readableDate = `Last refresh was on ${date.day}/${date.month} at ${date.hour}:${date.minute}`;
	function refreshTimer() {
		const lastUpdated = localStorage.getItem("lastUpdated");
		const refreshTime = 86400000 - (Date.now() - lastUpdated) + "ms";
		return refreshTime;
	}

	if (localStorage.length === 0 || refreshTimer() <= 0) {
		localStorage.setItem("lastUpdated", Date.now());
		localStorage.setItem("lastUpdatedHuman", readableDate);
		localStorage.setItem("targetWord", targetWord);
	}

	localStorage.setItem("timeUntilRefresh", refreshTimer());
}

// <====== log current content of the localStorage in console ======>
function logLocalStorage() {
	console.group("%c<-- Local Storage -->", "color: #fff; background: #000; padding: 50px;");
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		console.log(`%c${key}: %c${value}`, "color: black; background: white; padding: 10px;");
	}
	console.groupEnd();
}

// <====== clear data from local storage ======>
function clearData() {
	if (localStorage.length === 0) return console.error("No data to clear");
	localStorage.clear();
	console.info("Local storage cleared");
}

function gridInput(key) {
	for (const tile of gridTiles) {
		//get the index of the tile
		const tileIndex = tile.dataset.tile;
		if (tile.textContent === "" && key.match(/^[a-z]$/i) && tileIndex < 5) {
			tile.textContent = key;
			break;
		}
	}
}

// <====== check if key matches target word ======>
function checkKey(key) {
	const targetWord = localStorage.getItem("targetWord");
	const rightKey = () => console.log("%ccorrect", "color: black; background: lightgreen; padding: 10px;");
	const wrongKey = () => console.log("%cincorrect", "color: black; background: orange; padding: 10px;");

	if (key === " ") key = "SPACE";
	if (key === "F12") return;
	if (!targetWord) return console.error("No target word available");
	if (!key.match(/^[a-z]$/i)) return console.error(`${key} is not a letter`);
	targetWord.includes(key) ? rightKey() : wrongKey();
}

// <--- display a blinking message on the page --->
function displayMessage(message, time) {
	setInterval(() => {
		const messageContainer = document.createElement("p");
		messageContainer.textContent = message;
		document.body.appendChild(messageContainer);
		setTimeout(() => {
			messageContainer.remove();
		}, time - 1000);
	}, time);
}

// <====== initialize the game ======>
function startGame() {
	setLocalStorage();
	logLocalStorage();
}
