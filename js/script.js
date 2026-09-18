const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;
let seconds = 0;
let timerInterval = null;

const images = [];
for (let i = imgStart; i <= imgStart + 7; i++) {
    images.push(`https://picsum.photos/seed/${i}/${dimension}/${dimension}`);
}
cards = [...images, ...images];


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function initGame() {
    shuffle(cards);
    cards.forEach((imgUrl) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = imgUrl;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        board.appendChild(card);

        card.addEventListener('click', () => handleCardClick(card));
    })

    clearInterval(timerInterval);
    startTimer();
}


function revealCard(card) {
    card.style.backgroundImage = `url("${card.dataset.value}")`;
}


function handleCardClick(card) {
    if (lockBoard || card.classList.contains("matched") || card === firstCard || card.firstChild) {
        return;
    }
    revealCard(card);
    if (!firstCard) {
        firstCard = card;
        return;
    }
    else {
        secondCard = card;
        lockBoard = true;
        moves++;
        checkMatch();

    }
}


function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}


function checkMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCount += +2;
        resetTurn();
        checkVictory();
    }
    else {
        setTimeout(() => {
            firstCard.style.backgroundImage = "";
            secondCard.style.backgroundImage = "";
            resetTurn();
        }, 800);
    }
}


function checkVictory() {

}


initGame();
