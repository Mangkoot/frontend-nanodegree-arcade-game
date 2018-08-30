// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
 this.x += this.speed * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 600) {
        this.x = -100;
    }
 //when off canvas, reset position of enemy to move across again
    if (this.x > 600) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 400);
    }
    // Restart after hitting an enemy
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 300;
        player.y = 380;
        document.getElementById("ouch").style.display="block";
        document.getElementById('ouch').innerHTML="OUCH!!!";
        setTimeout(function(){
        document.getElementById('ouch').innerHTML="";
    }, 500); 
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';  
};

//Boundaries in the game
    let bounds = {
        x_max: 400,
        y_max : 380,
        x_min: 0,
        y_min : -30    
    };
    
Player.prototype.update = function() {
// Switch: https://www.w3schools.com/js/js_switch.asp
    switch(this.x) {
    case this.x > bounds.x_max:
        this.x = bounds.x_max;
        break;
    case this.y > bounds.y_max:
        this.y = bounds.y_max;
        break;
    case this.x > bounds.x_min:
        this.x = bounds.x_min;
        break;
    case this.y > bounds.y_min:
        this.y = bounds.y_min;
        break;
     }
     if (this.x > bounds.x_max) {
        this.x = bounds.x_max;
     }
    if (this.x < bounds.x_min) {
        this.x = bounds.x_min;
     } 
     if (this.y > bounds.y_max) {
        this.y = bounds.y_max;
     }
     if (this.y < bounds.y_min) {
        this.y = bounds.y_min;
     }
     //If player hits the goal he/she will restart
    if (this.y < 0) {
        this.x = 400;
        this.y = 380;
       document.getElementById("goal").style.display="block";
       document.getElementById('goal').innerHTML="YAYYYYYY!";
       setTimeout(function(){
       document.getElementById('goal').innerHTML="";
    }, 1000); 
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyDirection) {
    switch (keyDirection) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemyPlacement = [50, 150, 220];
let player = new Player(400, 360, 50);
let enemy;

enemyPlacement.forEach(function(placement) {
    enemy = new Enemy(0, placement, 100 + Math.floor(Math.random() * 300));
    allEnemies.push(enemy);
    });

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
