
function draw () {
  const canvas = document.querySelector('#game-board')
  const screen = canvas.getContext('2d')
  screen.fillStyle = 'rgb(200, 0, 0)'
  screen.fillRect(30, 90, 70, 70)
  screen.fillStyle = 'rgba(190, 20, 89, .7)'
  screen.fillRect(40, 150, 70, 70)

  // screen.fillStyle = 'rgb(240, 240, 240)'
  screen.beginPath()
  screen.moveTo(20, 200)
  screen.lineTo(100, 225)
  screen.lineTo(50, 30)
  screen.closePath()
  screen.fill()

  screen.moveTo(30, 300)
  screen.lineTo(150, 300)
  screen.lineTo(75, 350)
  screen.closePath()
  screen.stroke()

  screen.beginPath()
  screen.arc(300, 600, 50, 0, Math.PI * 2, true)
  screen.fill()

  screen.rect(400, 200, 50, 50)
  screen.stroke()
}

draw()

class User {
  constructor (email, name) {
    this.hair = "brown"
    this.stinks = "true"
    this.email = email
    this.name = name
  }

  hello () {
    console.log(`Hello, ${this.name}`)
  }

  goodbye () {
    console.log(`Goodbye, ${this.name}`)
  }
}

let userOne = new User('nerd@nerd.com', 'Ding Dong')

// the'new' keyword
//   - creates a new empty object {}
//   - sets the value of 'this' to be the new empty object
//   - calls the constructor method

// 'this'
// 1. The this keyword is used to point to the instance of an object from its own constructor and methods (when used inside function or class scope.)

// 2. The this keyword also keeps track of execution context also often referred to by some as the lexical scope or lexical environment. Think of lexical scope as location in memory allocated for all local variables to that scope.

// 3. The link to the execution context can change: for example using this inside an arrow function is not the same as using this in an ES-style function. Arrow functions are not constructors and cannot be used to instantiate an object. So they don’t even have their own this context. But they do have this. So what does it point to? It is likely to be the parent context just outside of it.

// 4. The link to execution context is also established when this is referred by a callback function, even if that function was defined inside an object’s constructor (when function or class is used as an object constructor.)
