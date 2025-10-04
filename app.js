let num = Math.floor(Math.random() * 232 - 1);

async function getWord() {
    const response = await fetch("words.json");
    const data = await response.json(); 
    realWord = data.fiveLetterWords[num].toUpperCase();
}

const playAgain = document.querySelector(`.playAgain`);
const title = document.querySelector(`.title`);
const guessWord = document.querySelector(`.guessWord`);
const doneMenu = document.querySelector(`.doneMenu`);
const doneMenuBG = document.querySelector(`.backgorund`);
const rows = document.querySelectorAll(`.rows`);
let index = 0;
let row = 0;
let isDone = true;

playAgain.addEventListener('click', () => {
    window.location.reload();
});

function isWon(letters, realWord) {
    let won = false;
        for(let i = 0; i <= realWord.length - 1; i++) {
            if(letters[i].style.backgroundColor == `green`) {
                won = true;
            } else {
                return won = false;
            }
        }
    return won;
}

function checking(letters, realWord) {
    realWord = realWord.split('');

    for (let i = 0; i < realWord.length; i++) {
        if (realWord[i] === letters[i].textContent) {
            letters[i].style.backgroundColor = `green`;
            realWord[i] = null;
        }
    }

    for (let i = 0; i < realWord.length; i++) {
        if (letters[i].style.backgroundColor === `green`) continue;

        let idx = realWord.indexOf(letters[i].textContent);
        if (idx !== -1) {
            letters[i].style.backgroundColor = "yellow";
            realWord[idx] = null;
        } else {
            letters[i].style.backgroundColor = `grey`;
        }
    }
}

function newRow() {
    rows[row].style.animation = `animate 0.3s linear`;
    row++;
    index = 0;
}

document.addEventListener('keydown', async e => {
    await getWord();
    
    let pressedKey = e.key;
    let letters = rows[row].querySelectorAll('.letter');

    if(!isDone) {
        return;
    }

    if(pressedKey == 'Enter' && index == letters.length && row <= rows.length - 1) {
        checking(letters, realWord);

        if(isWon(letters, realWord)) {
            doneMenuBG.style.display = "block";
            doneMenu.style.display = "block";
            title.innerHTML = `You Won!`;
            guessWord.innerHTML = `${realWord}`;
            isDone = false;
            return;
        }    

        if(row == rows.length - 1) {
            doneMenuBG.style.display = "block";
            doneMenu.style.display = "block";
            title.innerHTML = `You Lose!`;
            guessWord.innerHTML = `${realWord}`;
            isDone = false;
            return;
        }
        newRow();
    }

    if(pressedKey == 'Backspace') {
        if(index) {
            index--;
            letters[index].textContent = ``;
        }
        return;
    }

    if(index == letters.length) {
        return;
    }

    if(/^[a-zA-Z]$/.test(e.key)) {
        pressedKey = pressedKey.toUpperCase();
        letters[index].textContent = pressedKey;
        index++
    }
})

const exit = document.querySelector('.exit');
exit.addEventListener('click', () => {
    window.location.href = "https://github.com/dashboard";
})