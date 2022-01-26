const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficutlySelect = document.getElementById('difficulty');

// List of words for game
const words = [
	'sigh',
	'tense',
	'airplane',
	'ball',
	'pies',
	'juice',
	'warlike',
	'bad',
	'north',
	'dependent',
	'steer',
	'silver',
	'highfaltin',
	'superficial',
	'quice',
	'eight',
	'feeble',
	'admit',
	'drage',
	'loving',
];

// Initialize word
let randomWord;

// Initialze score
let score = 0;

//initialize time
let time = 10;

//default difficulty to valude in local storage or medium
let difficulty = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select option value
difficutlySelect.value = 
	localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium';

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word form array
function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
	randomWord = getRandomWord();

	word.innerHTML = randomWord;
}

// Update score
function updateScore() {
	score++;
	scoreEl.innerHTML = score;
}

//Update time
function updateTime() {
	time--;

	timeEl.innerHTML = time + 's';

	if( time == 0){
		clearInterval(time);
		//end game
		gameOver();
	}
}

// Game over, show end screen
function gameOver() {
	endgameEl.innerHTML = `
		<h1>Time ran out</h1>
		<p>Your final score is ${score}</p>
		<button onclick="window.location.reload()">Reload</button>
	`;

	endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
	const insertedText = e.target.value;
	
	if(insertedText === randomWord){
		addWordToDOM();
		updateScore();

		//Clear
		e.target.value = "";

		time += 5;
		updateTime();
	}
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
	difficulty = e.target.value;
	localStorage.setItem('difficulty', difficulty);
});