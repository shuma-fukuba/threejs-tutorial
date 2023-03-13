export class Game {
    
}

let ball = {
  x: 320,
  y: 240,
  radius: 10,
  speedX: 5,
  speedY: 5
}

let paddle = {
  x: 250,
  y: 460,
  width: 100,
  height: 10,
  speed: 10
}

let blockWidth = 50
let blockHeight = 20

export const startGame = () => {
  let canvas = document.getElementById('gameCanvas')
  let context = canvas.getContext('2d')

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)

  resetGame()
  setInterval(updateGame, 20)
}

export const resetGame = () => {
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
}
