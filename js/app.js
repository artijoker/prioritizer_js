const newGameBtnId = document.getElementById("new-game-btn");
const stopBtnId = document.getElementById("stop-btn");
const columnsId = document.getElementById("columns");
const fieldId = document.getElementById("field");
const scoreId = document.getElementById("score");

const height = window.innerHeight - 100;
const borderPX = 1;
const maxLength = height - borderPX;
const columns = createColumns(8);

var isGameOn = false;
var score = 0;

function createColumns(quantity) {
    let columns = [];
    for (let index = 0; index < quantity; index++) {
        let id = "column-" + (index + 1);
        let column = new Column(id, maxLength, getStatusGame, increaseScore, gameOver);
        columns.push(column);
    }
    return columns;
}

function getStatusGame() {
    return isGameOn;
}

function toggleGameState() {
    isGameOn = !isGameOn;
    renderButtons();
}

function increaseScore(value) {
    score = score + value;
    scoreId.textContent = "Cчет: " + score;
};

function gameOver() {
    if (getStatusGame()) {
        alert(`Игра оконченна. Вас счет ${score}.`);
        toggleGameState();
    }

}

function render() {
    fieldId.style.height = height + "px";
    fieldId.style.border = "black " + borderPX + "px solid";
    scoreId.textContent = "Cчет: 0";

    renderButtons();

    columns.forEach(column => {
        columnsId.append(column.getView());
    });
}

function renderButtons() {
    newGameBtnId.disabled = isGameOn;
    stopBtnId.disabled = !isGameOn;
}

newGameBtnId.addEventListener(
    'click',
    () => {
        toggleGameState();
        columns.forEach(column => column.start());
    }
)

stopBtnId.addEventListener(
    'click',
    () => {
        columns.forEach(column => column.stop());
        gameOver();
    }
)

render();