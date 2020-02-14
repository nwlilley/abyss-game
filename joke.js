class Game {
  constructor () {
    const canvas = document.querySelector('#game-board')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }
    this.size = gameSize.x
    this.player = new Player(this, gameSize)
    this.enemy = new Enemy(this, gameSize)
    this.keyboarder = Keyboarder
    this.enemyGrow = 3
    // this.bodies = []
    // this.bodies = this.bodies.concat(spawn(this))
    // this.bodies = this.bodies.concat(new Player(this, gameSize))

    const tick = () => {
      this.update()
      this.draw(screen, gameSize)
      requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
    this.player.update()
    this.enemy.update()
    if (colliding (this.player, this.enemy)) {
      console.log("colliding")
      addMessage()
    }

    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.enemy.radius += this.enemyGrow
      
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.enemy.radius += this.enemyGrow
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
      this.enemy.radius += this.enemyGrow
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
      this.enemy.radius += this.enemyGrow
    }

  }
  

  draw (screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y)
    drawRect(screen, this.player)
  
    drawCircle(screen, this.enemy)


    // for (let i = 0; i < this.bodies.length; i++) {
    //   drawRect(screen, this.bodies[i])
    // }
  }

  // addBody (body) {
  //   this.bodies.push(body)
  // }
}

class Enemy {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 50, y: 50 }
    this.radius = this.size.x / 2
    this.center = { x: this.size.x, y: this.size.y }
    this.gameSize = gameSize
    this.moveX = 0
    // this.velocity = 10

    // this.keyboarder = new Keyboarder
  }

  update () {
    // this.center.x = Math.floor(Math.random * this.gameSize.x)
    // this.center.x += Math.random() * this.velocity * posOrNeg()
    // this.center.y += Math.random() * this.velocity * posOrNeg()
    // this.radius += this.velocity
    if (this.center.x < 0 || this.center.x > this.gameSize.x) {
      this.center.x *= -1
      }
    if (this.center.y < 0 || this.center.y> this.gameSize.y) {
      this.center.y *= -1
    }
  

    
    
    // console.log(this.center.x)
    // this.moveX += this.speedX
    // console.log(this.moveX)

    
    // this.center.x = Math.floor(Math.random * this.gameSize.x)
    // this.center.x += this.speedX
    // this.moveX += this.speedX
  }
}


// function spawn (game) {
//   const enemies = []
//   for (let i = 0; i < 1; i++) {
//     const x = Math.random() * 500
//     const y = Math.random() * 500
//     enemies.push(new Enemy(game, { x: x, y: y }))
//   }
//   return enemies
// }

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 40, y: 40 }
    this.center = { x: gameSize.x - this.size.x, y: gameSize.y - this.size.y }
    this.gameSize = gameSize
    this.keyboarder = Keyboarder
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && (this.center.x > (0 + this.size.x / 2))) {
      this.center.x -= 3
      console.log('left')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && (this.center.x < this.gameSize.x - this.size.x / 2)) {
      this.center.x += 3
      console.log('right')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP) && (this.center.y > (0 + this.size.x / 2))) {
      this.center.y -= 3
      console.log('up')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN) && (this.center.y < (this.gameSize.y - this.size.y / 2))) {
      this.center.y += 3
      console.log('down')
    }
  }
}

// XXXXXXXXXXXXXXXXX

function colliding (b1, b2) {
  return !(
    b1 === b2 ||
      b1.center.x + b1.size.x / 2 < b2.center.x - b2.radius ||
      b1.center.y + b1.size.y / 2 < b2.center.y - b2.radius ||
      b1.center.x - b1.size.x / 2 > b2.center.x + b2.radius ||
      b1.center.y - b1.size.y / 2 > b2.center.y + b2.radius
  )
}

function drawRect (screen, body) {
  screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
    body.size.x, body.size.y)
}

function drawCircle (screen, body) {
  screen.arc(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.radius, 0, Math.PI * 2, true)
  screen.fill()
}

function getRandInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function posOrNeg () {
  if ((getRandInt(1, 100) % 2) === 0) {
    return 1
  } else {
    return -1
  }
}

function addMessage () {
  let headline = document.querySelector('#game-headline')
  let container = document.querySelector('.container')
  headline.innerHTML = ""
  let tagline = document.createElement('h1')
  tagline.innerHTML = 'NOW YOU ARE THE ABYSS'
  headline.appendChild(tagline)
}

function drawMessage (screen, message) {
  screen.font = "30px Arial"
  screen.fillText("message", 250, 250)
}
// function create

const game = new Game()
