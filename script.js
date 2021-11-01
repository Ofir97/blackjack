let cards = [] //array representing all player cards
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

let messageElement = document.getElementById("message-el");
let cardsElement = document.querySelector("#cards-el");
let sumElement = document.querySelector("#sum-el");
let playerElement = document.getElementById("player-el")

let player = {
    name: 'Ofir',
    chips: 120,
}

renderChipMessage()

function startGame() {
    messageElement.removeAttribute('class')
    console.log(messageElement)
    if (player.chips === 0) {
        alert('no more money!')
        location.reload()
        return
    }

    if (!isAlive || hasBlackJack) {
        player.chips -= 10
        renderChipMessage()
        isAlive = true
        hasBlackJack = false
        sum = 0
        cards = []
        newCard()
        newCard()
        renderGame();
    }
}

function renderGame() {
    sumElement.textContent = "Sum: " + sum;
    cardsElement.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++)
        cardsElement.textContent += cards[i] + " "
    if (sum < 21) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        messageElement.setAttribute("class", "blackjack-msg")
        console.log(messageElement)
        hasBlackJack = true
        player.chips+= 100
        renderChipMessage()
    } else {
        message = "Sorry, You're out of the game!"
        messageElement.setAttribute("class", "bad-msg")
        console.log(messageElement)
        isAlive = false
    }

    messageElement.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = generateRandomCard()
        cards.push(card)
        sum += card;
        renderGame();
    }
}

//returns random number between 1 and 11
// A -> 11
// J, Q, K -> 10
function generateRandomCard() {
    let card = Math.floor(Math.random() * 13 + 1) //return rnd number between 1 and 13
    if (card === 1) // A
        return 11
    if (card > 10) // J / Q / K
        return 10

    return card
}

function renderChipMessage() {
    playerElement.textContent = player.name + ": $" + player.chips
}
