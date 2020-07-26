class Game {
  constructor () {
    this.canvas = document.querySelector('#game-board')
    this.screen = this.canvas.getContext('2d')
    this.gameSize = { x: this.canvas.width, y: this.canvas.height }
    this.gameOver = false
    this.size = this.gameSize.x
    this.player = new Player(this, this.gameSize)
    this.enemy = new Enemy(this, this.gameSize)
    this.keyboarder = Keyboarder
    this.enemyGrow = 0.5
    // this.updatedRadius = this.enemy.radius

    const tick = () => {
      this.update()
      if (!this.gameOver) {
        this.draw(this.screen, this.gameSize)
        requestAnimationFrame(tick)
      } else {
        cancelAnimationFrame(tick)
        this.gameOverMessage()
        this.restart()
      }
    }
    tick()
  }

  update () {
    this.player.update()
    this.enemy.update()
    // distance(this.player, this.enemy)
    if (distance(this.player, this.enemy)) {
      this.gameOver = true
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
  }

  gameOverMessage () {
    // this.player.move = () => { } // prevents the player from drawing over the overlay if arrow keys are pressed
    this.screen.fillStyle = 'rgb(0, 0, 0)'
    this.screen.fillRect(0, 0, this.gameSize.x, this.gameSize.y)
    this.screen.fillStyle = 'rgba(255,255,255,1)'
    this.screen.font = '5rem sans-serif'
    this.screen.textAlign = 'center'
    const textStart = 250
    // this.screen.fillText(`You Scored: ${this.score}`, textStart, 150)
    this.screen.fillText('NOW YOU', textStart, 180)
    this.screen.fillText('ARE', textStart, 260)
    this.screen.fillText('THE ABYSS', textStart, 340)
    this.screen.font = '1.5rem sans-serif'
    this.screen.fillText('Press enter to play again', textStart, 420)
  }

  restart () {
    const callBack = (event) => {
      if (event.key === 'Enter') {
        window.removeEventListener('keydown', callBack)
        new Game()
      }
    }
    window.addEventListener('keydown', callBack)
  }
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
    this.speedX = 3
    this.speedY = 2

    // this.keyboarder = new Keyboarder
  }
  
  update () {
    if (this.patrolX + this.speedX < (this.radius - (this.size.x/2)) || this.patrolX + this.speedX > this.gameSize.x - (this.size.x + (this.radius - (this.size.x/2)))) {
      console.log('Radius: ' + this.radius)
      console.log('PatrolX: ' + this.patrolX)
      this.speedX = -this.speedX
      this.speedY = -(Math.random() * this.speedY ) 
    } 

    if (this.patrolY < (this.radius - (this.size.y / 2)) || this.patrolY > this.gameSize.y - (this.size.y + (this.radius - (this.size.y / 2)))) {
    // if (this.patrolY < 0 || this.patrolY > this.gameSize.y - this.size.y) {
      this.speedY = -this.speedY
      this.speedX = -(Math.random() * this.speedX)
    }

    this.center.x += this.speedX
    this.center.y += this.speedY
    // what this???
    this.patrolX += this.speedX 
    this.patrolY += this.speedY

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
    // console.log("colliding")
    return true
  }
}

function drawCircle (screen, body) {
  screen.beginPath()
  screen.arc(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.radius, 0, Math.PI * 2, true)
  screen.stroke()
  screen.fillStyle = 'black'
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
  this.screen.font = '30px Arial'
  this.screen.fillText('message', 250, 250)
}
// function create

const game = new Game()
