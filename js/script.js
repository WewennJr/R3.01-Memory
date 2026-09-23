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

let images = [];

function generateCards() {
    let newImgStart;
    do {
        newImgStart = Math.floor(Math.random() * 100) + 1;
    } while (newImgStart === imgStart);

    imgStart = newImgStart;
    images = [];
    for (let i = imgStart; i <= imgStart + 7; i++) {
        images.push(`https://picsum.photos/seed/${i}/${dimension}/${dimension}`);
    }
    cards = [...images, ...images];
}


function shuffle(tab) {
    for (let i = tab.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tab[i], tab[j]] = [tab[j], tab[i]];
    }
}


function initGame() {
    generateCards();
    board.innerHTML = "";
    resultDisplay.textContent = "";
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedCount = 0;
    seconds = 0;

    movesDisplay.textContent = `Coups : ${moves}`;
    timerDisplay.textContent = `Temps : 00:00`;

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


function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Temps : ${formatTime(seconds)}`;
    }, 1000);
}


function formatTime(sec) {
    const min = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${min}:${s}`;
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
        movesDisplay.textContent = `Nb Coups : ${moves}`;
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
    if (matchedCount === cards.length) {
        clearInterval(timerInterval);
        resultDisplay.textContent = `Victoire ! Coups : ${moves} | Temps :${formatTime(seconds)}`;
    }
}


restartBtn.addEventListener('click', initGame);
initGame();
