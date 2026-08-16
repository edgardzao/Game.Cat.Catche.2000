// JavaScript source code
var game = new Phaser.Game(800, 600, Phaser.CANVAS, null, {
    preload: preload,
    create: create,
    update: update
});

var player, cat, cursors, scoreText, score = 0;

function preload() {
    game.load.image('background', 'Assets/Images/background.png');
    game.load.image('player', 'Assets/Images/player.png');
    game.load.image('cat', 'Assets/Images/cat.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'background');

    player = game.add.sprite(400, 300, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);

    cat = game.add.sprite(game.world.randomX, game.world.randomY, 'cat');
    cat.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(cat);

    scoreText = game.add.text(20, 20, 'Pontuação: 0', { font: '24px Arial', fill: '#ffffff' });

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    var speed = 5;

    if (cursors.left.isDown) {
        player.x -= speed;
        player.scale.x = 1;
    }
    if (cursors.right.isDown) {
        player.x += speed;
        player.scale.x = -1;
    }
    if (cursors.up.isDown) player.y -= speed;
    if (cursors.down.isDown) player.y += speed;

    player.x = Phaser.Math.clamp(player.x, 20, game.width - 20);
    player.y = Phaser.Math.clamp(player.y, 20, game.height - 20);

    game.physics.arcade.overlap(player, cat, catHitHandler, null, this);
}

function catHitHandler(playerObj, catObj) {
    catObj.x = game.world.randomX;
    catObj.y = game.world.randomY;
    score++;
    scoreText.setText('Pontuação: ' + score);
}