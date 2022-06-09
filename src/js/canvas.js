import platform from "../img/platform.png";
import platformSmallTall from "../img/platformSmallTall.png";
import hills from "../img/hills.png";
import background from "../img/background.png";

import spriteStandRight from "../img/spriteStandRight.png";
import spriteStandLeft from "../img/spriteStandLeft.png";
import spriteRunRight from "../img/spriteRunRight.png";
import spriteRunLeft from "../img/spriteRunLeft.png";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 1.5;

class Player {
  constructor() {
    this.speed = 5;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 65;
    this.height = 150;
    this.health = 200;
    this.lifes = 5;

    this.frames = 0;
    this.sprites = {
      stand: {
        right: createImage(spriteStandRight),
        left: createImage(spriteStandLeft),
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: createImage(spriteRunRight),
        left: createImage(spriteRunLeft),
        cropWidth: 341,
        width: 127.875,
      },
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 177;
  }
  draw() {
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.frames++;
    if (
      (this.frames > 59 && this.currentSprite === this.sprites.stand.right) ||
      (this.frames > 59 && this.currentSprite === this.sprites.stand.left)
    )
      this.frames = 0;
    else if (
      (this.frames > 28 && this.currentSprite === this.sprites.run.right) ||
      (this.frames > 28 && this.currentSprite === this.sprites.run.left)
    )
      this.frames = 0;

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

let platformImage = createImage(platform);
let platformSmallTallImage = createImage(platformSmallTall);

let player = new Player();
let platforms = [];
let genericObjects = [];

let lasttKey = "";
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

function init() {
  platformImage = createImage(platform);

  player = new Player();
  platforms = [
    new Platform({
      x: 0,
      y: 230,
      image: platformSmallTallImage,
    }),
    new Platform({
      x: platformSmallTallImage.width - platformSmallTallImage.width / 2,
      y: 230,
      image: platformSmallTallImage,
    }),
    new Platform({
      x: 0,
      y: 350,
      image: platformSmallTallImage,
    }),
    new Platform({
      x: platformSmallTallImage.width - platformSmallTallImage.width / 2,
      y: 350,
      image: platformSmallTallImage,
    }),
    new Platform({
      x: platformSmallTallImage.width - 2,
      y: 350,
      image: platformSmallTallImage,
    }),
    new Platform({
      x:
        platformImage.width * 4 +
        300 -
        2 +
        platformImage.width -
        platformSmallTallImage.width / 2,
      y: 170,
      image: platformSmallTallImage,
    }),
    new Platform({
      x:
        platformImage.width * 4 +
        300 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({
      x:
        platformImage.width * 10 +
        1100 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({ x: -1, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 5 + 600,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 6 + 800,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 7 + 1000,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 9 + 1000,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 10 + 1300,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 13 + 1600,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 15 + 1800,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 17 + 2000,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 20 + 2300,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 14 + 2400,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 15 + 2600,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 16 + 2800,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 17 + 3000,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 18 + 3200,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 19 + 3400,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 20 + 3600,
      y: 470,
      image: platformImage,
    }),
  ];

  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background),
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills),
    }),
  ];

  scrollOffset = 0;
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((GenericObject) => {
    GenericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 600) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 50) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericObjects.forEach((GenericObject) => {
        GenericObject.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericObjects.forEach((GenericObject) => {
        GenericObject.position.x += player.speed * 0.66;
      });
    }
  }

  //platform detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  if (
    keys.right.pressed &&
    lasttKey === "right" &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.frames = 1;
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    keys.left.pressed &&
    lasttKey === "left" &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.frames = 1;
    player.currentSprite = player.sprites.run.left;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    !keys.left.pressed &&
    lasttKey === "left" &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.frames = 1;
    player.currentSprite = player.sprites.stand.left;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  }else if (
    !keys.right.pressed &&
    lasttKey === "right" &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.frames = 1;
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  }

  //win condition
  if (scrollOffset > 5000) {
    console.log("You Win");
  }

  //lose condition
  if (player.position.y > canvas.height) {
    console.log("You Lose");
    init();
  }
}

init();
animate();

addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      lasttKey = "left";
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      lasttKey = "right";
      break;
    case 83:
      console.log("down");
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 25;
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
