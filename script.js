class Game {
  constructor () {
    const canvas = document.querySelector('#game-board')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }
    this.player = new Player(this, gameSize)

    const tick = () => {
      this.update()
      this.draw(screen, gameSize)
      requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
    console.log('update')
    this.player.update()
  }

  draw (screen, gameSize) {
    // screen.fillRect(20, 50, 50, 50)
    screen.clearRect(0, 0, gameSize.x, gameSize.y)
    drawRect(screen, this.player)
  }
}

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 20, y: 20 }
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
    this.keyboarder = Keyboarder
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
      console.log('left')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
      console.log('right')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
      this.center.y -= 2
      console.log('up')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
      this.center.y += 2
      console.log('down')
    }
  }
}

// XXXXXXXXXXXXXXXXX

function drawRect (screen, body) {
  screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
    body.size.x, body.size.y)
  }
// class Keyboarder {
//   constructor () {
//     // Records up/down state of each key that has ever been pressed.
//     const keyState = {}

//     // When key goes down, record that it is down.
//     window.addEventListener('keydown', function (e) {
//       keyState[e.keyCode] = true
//     })

//     // When key goes up, record that it is up.
//     window.addEventListener('keyup', function (e) {
//       keyState[e.keyCode] = false
//     })

//     // Returns true if passed key is currently down.  `keyCode` is a
//     // unique number that represents a particular key on the keyboard.
//     this.isDown = function (keyCode) {
//       return keyState[keyCode] === true
//     }

//     // Handy constants that give keyCodes human-readable names.
//     this.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 }
//   }
// }

const game = new Game()
