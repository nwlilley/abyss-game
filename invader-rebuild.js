console.log("Clinton's Example")

class Game {
  constructor () {
    const canvas = document.querySelector('#game-board')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.clientWidth, y: canvas.height }
    this.bodies = []

    this.bodies = this.bodies.concat(new Player(this, gameSize))

    const tick = () => {
      this.update
      this.draw
      requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
    const notCollidingWithAnything = (b1) => {
      return this.bodies.filter(function (b2) { return notCollidingWithAnything(b1, b2) }).length === 0
    }
    this.bodies = this.bodies.filter(notCollidingWithAnything)
    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update()
    }
  }

  draw (screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y)
    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(screen, this.bodies[i])
    }
  }

  invadersBelow (invader) {
    return this.bodies.filter(function (b) {
      return b instanceof Invader &&
        Math.abs(invader.center.x - b.center.x) < b.size.x &&
        b.center.y > invader.center.y
    }).length > 0
  }

  addBody (body) {
    this.bodies.push(body)
  }
}

class Invader {
  constructor (game, center) {
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

    if (Math.random() > 0.995 && !this.game.invadersBelow(this)) {
      let bullet = new Bullet ({ x: this.center.x, y: this.center.y + this.size.y / 2}), { x: Math.random() - 0.5, y: 2})
      this.game.addBody(bullet)
    }
    this.center
  }

}

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 15, y: 15 }
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
    this.keyboarder = new Keyboarder()
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
    }
  }
}

window.addEventListener('load', function () {
  new Game()
})
