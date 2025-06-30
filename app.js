let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn")
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");

let turn = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const resetGame = () => {
    turn = true;
    enableBox();
    msgContainer.classList.add("hide");
}

const showWinner = (winner) => {
    message.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();
}

const showDraw = () => {
    message.innerText = "Game is a Draw!";
    msgContainer.classList.remove("hide");
    disableBox();
};

const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winPatterns) {
        let posValue1 = boxes[pattern[0]].innerText;
        let posValue2 = boxes[pattern[1]].innerText;
        let posValue3 = boxes[pattern[2]].innerText;
        if (posValue1 !== "" && posValue2 != "" && posValue3 != "") {
            if (posValue1 === posValue2 && posValue2 === posValue3) {
                showWinner(posValue1);
                winnerFound = true;
                return;
            }
        }
    }
    
    // If no winner found, check for draw
    let allFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }

    if (!winnerFound && allFilled) {
        showDraw();
    }
}

boxes.forEach((value) => {
    value.addEventListener("click", () => {
        if (value.innerText !== "") return;
        if (turn) {
            value.innerText = "X";
            turn = false;
        } else {
            value.innerText = "O";
            turn = true;
        }
        checkWinner();
    });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);