class Game {
  constructor () {
    const canvas = document.querySelector('#game-board')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }
    this.size = gameSize.x
    this.player = new Player(this, gameSize)
    this.enemy = new Enemy(this, gameSize)
    this.keyboarder = Keyboarder
    this.enemyGrow = .5
    this.updatedRadius = this.enemy.radius
  

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
    // distance(this.player, this.enemy)
    if (distance(this.player, this.enemy)) {
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
    this.updatedRadius = 
    this.center = { x: 50, y: 50}
    this.gameSize = gameSize
    this.patrolX = 0
    this.patrolY = 0 
    this.speedX = 2
    this.speedY = 2

    // this.keyboarder = new Keyboarder
  }
  
  update () {
    if (this.patrolX < 0 || this.patrolX > this.gameSize.x - this.radius) {
      this.speedX = -this.speedX
      this.speedY = -(Math.random() * this.speedY)
    }
    
    if (this.patrolY < 0 || this.patrolY > this.gameSize.y - this.size.y) {
      this.speedY = -this.speedY
      this.speedX = -(Math.random() * this.speedX)
    }
    this.center.x += this.speedX
    this.center.y += this.speedY
    this.patrolX += this.speedX
    }
  }

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
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && (this.center.x > (this.radius * 2))) {
      this.center.x -= 2
      // console.log('left')
      // console.log (this.center)
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && (this.center.x < this.gameSize.x)) {
      this.center.x += 2
      // console.log('right')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP) && (this.center.y > (0 + this.size.x))) {
      this.center.y -= 2
      // console.log('up')
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN) && (this.center.y < (this.gameSize.y))) {
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
  // console.log(hypotenuse )
  if (hypotenuse <= player.radius + enemy.radius) {
    console.log("colliding")
    return true
  }
}

function colliding (player, enemy) {
  if (distance (player, enemy) <= player.radius + enemy.radius)
    console.log('baby butt')
    return true
    // console.log(enemy.radius)
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
