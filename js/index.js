import platform from './img/platform.png'

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
    this.color = "purple";
    this.health = 200;
    this.lifes = 5;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

class Platform {
  constructor({x, y, image}) {
    this.position = {
      x,
      y
    };
    this.image = image;
    this.width = 200;
    this.height = 20;
  }
  draw() {
    c.drawImage (this.image, this.position.x, this.position.y)
  }
}

const image = new Image();
image.src = platform;

const player = new Player()
const platforms = [new Platform({x: 200, y: 100, image}), new Platform({x: 400, y:200, image})]

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach(platform => { 
    platform.draw()
  })
  

  if (keys.right.pressed && player.position.x < 600) {
    player.velocity.x = 3;
  } else if (keys.left.pressed && player.position.x > 50) {
    player.velocity.x = -3;
  } else { 
    player.velocity.x = 0

    if (keys.right.pressed) {
      scrollOffset += 3
      platforms.forEach(platform => { 
        platform.position.x -= 3
      })

    } else if (keys.left.pressed) {
      scrollOffset -= 3
      platforms.forEach(platform => { 
        platform.position.x += 3
      })
    }
  }
  //platform detection
  platforms.forEach(platform => { 
  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width
  ) {
    player.velocity.y = 0;
  } 
  })

  if (scrollOffset > 5000) {
    console.log('you win')
  }
}

animate();

addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      break;
    case 68:
      keys.right.pressed = true;
      break;
    case 83:
      break;
    case 87:
      player.velocity.y -= 15;
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      break;
    case 68:
      keys.right.pressed = false;
      break;
    case 83:
      break;
    case 87:
      break;
  }
});
