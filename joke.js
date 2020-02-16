class Game {
  constructor () {
    const canvas = document.querySelector('#game-board')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }
    this.size = gameSize.x
    this.player = new Player(this, gameSize)
    this.enemy = new Enemy(this, gameSize)
    this.keyboarder = Keyboarder
    this.enemyGrow = 1
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
    distance(this.player, this.enemy)
    if (colliding(this.player, this.enemy)) {
      console.log('colliding')
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
    drawCircle(screen, this.player)
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
    this.radius = 25
    this.center = { x: 50, y: 50}
    this.gameSize = gameSize
    this.moveX = 0
    this.velocity = 1.5

    // this.keyboarder = new Keyboarder
  }

  update () {
    // this.center.x = Math.floor(Math.random * this.gameSize.x)
    // this.center.x += Math.random() * this.velocity * posOrNeg()
    // this.center.y += Math.random() * this.velocity * posOrNeg()
    // this.center.x += this.velocity
    // if (this.center.x < 0 || this.center.x > this.gameSize.x) {
    //   this.center.x *= -1
    // }
    // if (this.center.y < 0 || this.center.y > this.gameSize.y) {
    //   this.center.y *= -1
    // }




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
    this.radius = 20
    this.center = { x: gameSize.x, y: gameSize.y }
    this.gameSize = gameSize
    this.keyboarder = Keyboarder
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && (this.center.x > (0 + this.radius * 2))) {
      this.center.x -= 2
      // console.log('left')
      // console.log (this.center)
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && (this.center.x < this.gameSize.x - this.radius)) {
      this.center.x += 2
      // console.log('right')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP) && (this.center.y > (0 + this.size.x / 2))) {
      this.center.y -= 2
      // console.log('up')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN) && (this.center.y < (this.gameSize.y - this.size.y / 2))) {
      this.center.y += 2
      // console.log('down')
    }
  }
}

// XXXXXXXXXXXXXXXXX

function distance (player, enemy) {
  let pos1 = Math.abs(player.center.x - enemy.center.x)
  let pos2 = Math.abs(player.center.y - enemy.center.y)
  let hypotenuse = Math.sqrt(pos1 ** 2 + pos2 ** 2)
  console.log(hypotenuse)
  return hypotenuse
}

function colliding (player, enemy) {
  if (distance (player, enemy) <= player.radius + enemy.radius)
    console.log('baby butt')// console.log(enemy.radius)
  // console.log('distance x: ' + distX)
  // console.log('distance y: ' + distY)
  
  // return !(
  //   b1 === b2 ||
  //     b1.center.x + b1.size.x / 2 < b2.center.x - b2.radius ||
  //     b1.center.y + b1.size.y / 2 < b2.center.y - b2.radius ||
  //     b1.center.x - b1.size.x / 2 > b2.center.x + b2.radius ||
  //     b1.center.y - b1.size.y / 2 > b2.center.y + b2.radius
  // )
}



function drawRect (screen, body) {
  screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
    body.size.x, body.size.y)
}

function drawCircle (screen, body) {
  screen.beginPath()
  screen.arc(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.radius, 0, Math.PI * 2, true)
  screen.stroke()
  // screen.fill()
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
  const headline = document.querySelector('#game-headline')
  const container = document.querySelector('.container')
  headline.innerHTML = ''
  const tagline = document.createElement('h1')
  tagline.innerHTML = 'NOW YOU ARE THE ABYSS'
  headline.appendChild(tagline)
}

function drawMessage (screen, message) {
  screen.font = '30px Arial'
  screen.fillText('message', 250, 250)
}
// function create

const game = new Game()
