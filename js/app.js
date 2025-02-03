/*-------------------------------- Constants --------------------------------*/

const randomColor = Math.floor(Math.random() * 4) + 1

/*-------------------------------- Variables --------------------------------*/

let gameSequence = []
let userSequence = []

/*------------------------ Cached Element References ------------------------*/

const greenBtnEl = document.querySelector('#greenBtn')
const redBtnEl = document.querySelector('#redBtn')
const yellowBtnEl = document.querySelector('#yellowBtn')
const blueBtnEl = document.querySelector('#blueBtn')

/*-------------------------------- Functions --------------------------------*/

const addSequence = () => {
    gameSequence.push(randomColor)
}

const nextLevel = () => {
    addSequence
}

const init = () => {

}

init()

/*----------------------------- Event Listeners -----------------------------*/

