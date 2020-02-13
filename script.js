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
    // this.enemy.update()
  }

  draw (screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y)
    drawRect(screen, this.player)
    // drawRect(screen, this.enemy)
  }
}

class Enemy {
  constructor (game, gameSize) {
    this.game = game
    this.center = center
    this.size = { x: 15, y: 15 }
    this.patrolX = 0
    this.speedX = 0.3
  }

  update () {
    if (this.patrolX < 0 || this.patrolX > 30) {
      this.speedX = -this.speedX
    }
  }
  // if (Math.random() > 0.995 && !this.game.)
}

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 400, y: 400 }
    this.center = { x: gameSize.x / 2, y: gameSize.y / 2 }
    this.gameSize = gameSize
    this.keyboarder = Keyboarder
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && (this.center.x > (0 + this.size.x / 2))) {
      this.center.x -= 2
      console.log('left')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && (this.center.x < this.gameSize.x - this.size.x / 2)) {
      this.center.x += 2
      console.log('right')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP) && (this.center.y > (0 + this.size.x / 2))) {
      this.center.y -= 2
      console.log('up')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN) && (this.center.y < (this.gameSize.y - this.size.y / 2))) {
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

// function drawCircle (screen, body) {
//   screen.arc(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.radius, 0, Math.PI * 2, true)
// }

// function create 

const game = new Game()

