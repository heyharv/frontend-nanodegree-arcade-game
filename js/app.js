//Enemy varialbles
var STAGE_WIDTH = 505;
var ENEMY_WIDTH = 70;
var ENEMY_HEIGHT = 42;
var COLLISION_DISTANCE = 60;

//Player variables
var START_X = 200;
var Y_TOP_BOUNDARY = 0;
var Y_BOTTOM_BOUNDARY = 415;
var X_LEFT_BOUNDARY = 0;
var X_RIGHT_BOUNDARY = 418;

var STEP = 41.5;

var PLAYER_WIDTH = 57;
var PLAYER_HEIGHT = 56;


// Enemies our player must avoid
function Enemy(x, y, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 200;
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, centerX, centerY, increaseSpeed, isThereCollision) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //puts the enemy on the canvas
    if(this.x >= STAGE_WIDTH) {
        this.x = -ENEMY_WIDTH;
    } else if (this.x <= -ENEMY_WIDTH) {
        this.x = STAGE_WIDTH;
    }
    this.x += this.speed * dt;

    this.centerX = function() {
        return this.x + ENEMY_WIDTH / 2;
    };
    this.centerY = function() {
        return this.y + ENEMY_HEIGHT / 2;
    };
    this.increaseSpeed = function() {
        this.speed = this.speed * 1.15;
    }

    //the isThereCollision and distance methods ensure that the collision occurs accurately, not too far or close
    this.isThereCollision = function(player) {
        return this.distance(player) < COLLISION_DISTANCE;
    }

    this.distance = function(player) {
        return Math.sqrt (
            Math.pow(this.centerX() - player.centerX(), 2) +
            Math.pow(this.centerY() - player.centerY(), 2)
        );
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player(x, y, sprite){
    this.x = x;
    this.y = y;
    this.initialPosition();
    this.sprite = 'images/char-pink-girl.png'; 
    captureKeyboardInput(this);
}

Player.prototype.update = function(centerX, centerY, reachesTop, checkBoundaries) {
    //put the player on the canvas
    this.centerX = function() {
        return this.x + PLAYER_WIDTH / 2;
    };
    this.centerY = function() {
        return this.y + PLAYER_HEIGHT / 2;
    };
    this.reachesTop = function() {
        return this.y <= Y_TOP_BOUNDARY;
    };
    //keep the player from falling off of the canvas
    this.checkBoundaries = function() {
        if (this.y <= Y_TOP_BOUNDARY) {
            this.y = Y_TOP_BOUNDARY;
        }
        if (this.y >= Y_BOTTOM_BOUNDARY) {
            this.y = Y_BOTTOM_BOUNDARY;
        }
        if (this.x <= X_LEFT_BOUNDARY) {
            this.x = X_LEFT_BOUNDARY;
        }
        if (this.x >= X_RIGHT_BOUNDARY) {
            this.x = X_RIGHT_BOUNDARY;
        }
    };
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//ensure that the arrow keys can be used to navigate the player
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up': 
            this.y -= STEP;
            break;
        case 'down':
            this.y += STEP;
            break;
        case 'left':
            this.x -= STEP;
            break;
        case 'right':
            this.x += STEP;
            break;
        default:
            return;
    }
    this.checkBoundaries();    
};
//put the player on a starting point on the canvas
Player.prototype.initialPosition = function() {
    this.x = START_X;
    this.y = Y_BOTTOM_BOUNDARY;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(10, 150), new Enemy(10, 239), new Enemy(10, 73)];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this. Oh! But I will!

//making the small change to this code block worked for me
function captureKeyboardInput(player) {
    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });
}
