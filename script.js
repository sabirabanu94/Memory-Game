document.addEventListener('DOMContentLoaded', function() {
    const AllCards = [{
            "Name": "AS",
            "Source": "Assets/AS.png"
        },
        {
            "Name": "2S",
            "Source": "Assets/2S.png"
        },
        {
            "Name": "3S",
            "Source": "Assets/3S.png"
        },
        {
            "Name": "4S",
            "Source": "Assets/4S.png"
        },
        {
            "Name": "5S",
            "Source": "Assets/5S.png"
        },
        {
            "Name": "6S",
            "Source": "Assets/6S.png"
        },
        {
            "Name": "7S",
            "Source": "Assets/7S.png"
        },
        {
            "Name": "8S",
            "Source": "Assets/8S.png"
        },
        {
            "Name": "9S",
            "Source": "Assets/9S.png"
        },
        {
            "Name": "10S",
            "Source": "Assets/10S.png"
        },
        {
            "Name": "JS",
            "Source": "Assets/JS.png"
        },
        {
            "Name": "QS",
            "Source": "Assets/QS.png"
        },
        {
            "Name": "KS",
            "Source": "Assets/KS.png"
        },
        {
            "Name": "AC",
            "Source": "Assets/AC.png"
        },
        {
            "Name": "2C",
            "Source": "Assets/2C.png"
        },
        {
            "Name": "3C",
            "Source": "Assets/3C.png"
        },
        {
            "Name": "4C",
            "Source": "Assets/4C.png"
        },
        {
            "Name": "5C",
            "Source": "Assets/5C.png"
        },
        {
            "Name": "6C",
            "Source": "Assets/6C.png"
        },
        {
            "Name": "7C",
            "Source": "Assets/7C.png"
        },
        {
            "Name": "8C",
            "Source": "Assets/8C.png"
        },
        {
            "Name": "9C",
            "Source": "Assets/9C.png"
        },
        {
            "Name": "10C",
            "Source": "Assets/10C.png"
        },
        {
            "Name": "JC",
            "Source": "Assets/JC.png"
        },
        {
            "Name": "QC",
            "Source": "Assets/QC.png"
        },
        {
            "Name": "KC",
            "Source": "Assets/KC.png"
        },
        {
            "Name": "AH",
            "Source": "Assets/AH.png"
        },
        {
            "Name": "2H",
            "Source": "Assets/2H.png"
        },
        {
            "Name": "3H",
            "Source": "Assets/3H.png"
        },
        {
            "Name": "4H",
            "Source": "Assets/4H.png"
        },
        {
            "Name": "5H",
            "Source": "Assets/5H.png"
        },
        {
            "Name": "6H",
            "Source": "Assets/6H.png"
        },
        {
            "Name": "7H",
            "Source": "Assets/7H.png"
        },
        {
            "Name": "8H",
            "Source": "Assets/8H.png"
        },
        {
            "Name": "9H",
            "Source": "Assets/9H.png"
        },
        {
            "Name": "10H",
            "Source": "Assets/10H.png"
        },
        {
            "Name": "JH",
            "Source": "Assets/JH.png"
        },
        {
            "Name": "QH",
            "Source": "Assets/QH.png"
        },
        {
            "Name": "KH",
            "Source": "Assets/KH.png"
        },
        {
            "Name": "AD",
            "Source": "Assets/AD.png"
        },
        {
            "Name": "2D",
            "Source": "Assets/2D.png"
        },
        {
            "Name": "3D",
            "Source": "Assets/3D.png"
        },
        {
            "Name": "4D",
            "Source": "Assets/4D.png"
        },
        {
            "Name": "5D",
            "Source": "Assets/5D.png"
        },
        {
            "Name": "6D",
            "Source": "Assets/6D.png"
        },
        {
            "Name": "7D",
            "Source": "Assets/7D.png"
        },
        {
            "Name": "8D",
            "Source": "Assets/8D.png"
        },
        {
            "Name": "9D",
            "Source": "Assets/9D.png"
        },
        {
            "Name": "10D",
            "Source": "Assets/10D.png"
        },
        {
            "Name": "JD",
            "Source": "Assets/JD.png"
        },
        {
            "Name": "QD",
            "Source": "Assets/QD.png"
        },
        {
            "Name": "KD",
            "Source": "Assets/KD.png"
        }
    ]

    console.log(AllCards.length);


    let GameDeck = [];
    let firstCard = null,
        secondCard = null;
    let lockBoard = false;
    let timerInterval;

    const GameBox = document.getElementById('game');
    const timerElement = document.getElementById('timer');
    const startGameBtn = document.getElementById('startGame');
    const difficultySelect = document.getElementById('difficulty');
    const stopgameBtn = document.getElementById('stopGame');

    //stop game event

    stopgameBtn.addEventListener('click', function() {
        clearGameBoard();
    });
    // Start game event
    startGameBtn.addEventListener('click', function() {
        const difficulty = difficultySelect.value;
        console.log(difficultySelect.value);

        if (difficulty === "Easy") {
            numPairs = 10;
        } else if (difficulty === "Hard") {
            numPairs = 20;
        }

        if (numPairs == 20) {
            const gameBoard = document.getElementById('game');
            gameBoard.style.gridTemplateColumns = 'repeat(8, 120px)';
            gameBoard.style.width = '80%';
        } else {
            const gameBoard = document.getElementById('game');
            gameBoard.style.gridTemplateColumns = 'repeat(5, 120px)';
            gameBoard.style.width = '50%';
        }
        startGame(numPairs);
    });

    // Start the game
    function startGame(numPairs) {
        // clearGameBoard();
        GameDeck = ShuffleCards(AllCards).slice(0, numPairs);
        GameDeck = GameDeck.flatMap(card => [card, card]);
        GameDeck = ShuffleCards(GameDeck);
        displayCards(GameDeck);
        startTimer();
    }

    function ShuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }

    // Display cards on the game board
    function displayCards(deck) {
        deck.forEach((card, i) => createCardElement(i, card));
    }

    // Create card elements dynamically
    function createCardElement(i, card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'SingleCard';
        cardElement.dataset.name = card.Name;

        const front = document.createElement('img');
        front.className = 'MainCard';
        front.src = card.Source;

        const back = document.createElement('img');
        back.className = 'BackSide';
        back.src = 'Assets/Art of Play - Wonder Emporium.jpeg';

        cardElement.appendChild(front);
        cardElement.appendChild(back);
        GameBox.appendChild(cardElement);

        cardElement.addEventListener('click', flipCard);
    }

    // Flip card with 3D effect
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkMatch();
    }

    function checkMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    // Reset board state
    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // Clear game board for new game
    function clearGameBoard() {
        GameBox.innerHTML = '';
        resetTimer();
    }

    function startTimer() {
        let seconds = 0;
        let minutes = 0;

        timerInterval = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }

            const timeString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timerElement.textContent = `Time: ${timeString}`;
        }, 1000);
    }

    // Reset the timer when a new game is started
    function resetTimer() {
        clearInterval(timerInterval);
        timerElement.textContent = 'Time: 00:00';
    }

});