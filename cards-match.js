var errors = 0;
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]


var cardSet;
var board = [];
var rows = 4;
var columns =5;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList)
    
    for(let i = 0; i < cardSet.length; i++) {
        let random = Math.floor(Math.random() * cardSet.length)

        let temp = cardSet[i]
        cardSet[i] = cardSet[random]
        cardSet[random] = temp
    }
}

function startGame() {
    for(let r = 0; r < rows; r++) {
        let row = []
        for(let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop()
            row.push(cardImg) //JS

            //Html
            const card = document.createElement('img')
            card.classList.add('card')
            card.src = cardImg + '.jpg'
            card.id = r.toString() + '-' + c.toString()
            card.addEventListener('click', selectCard)
            document.getElementById('board').append(card)
        }
        board.push(row)
    }

    setTimeout(hideCards, 1000)
}

function hideCards() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            document.getElementById(r.toString() + '-' + c.toString()).src = 'back.jpg'
        }
    }
}

function selectCard() {
    if(this.src.includes('back')) {
        if(!card1Selected) {
            card1Selected = this

            let coords = this.id.split('-')
            let row = coords[0]
            let col = coords[1]

            card1Selected.src = board[row][col] + '.jpg'
    
        } else if(!card2Selected && card1Selected !== this) {
            card2Selected = this

            let coords = this.id.split('-')
            let row = coords[0]
            let col = coords[1]

            card2Selected.src = board[row][col] + '.jpg'

            setTimeout(update, 1000)
        }
    }
}

function update() {
    if(card1Selected.src !== card2Selected.src) {
        card1Selected.src = 'back.jpg'
        card2Selected.src = 'back.jpg'
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    card1Selected = null
    card2Selected = null
}