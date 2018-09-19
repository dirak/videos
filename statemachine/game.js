var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
			preload: preload,
			create: create,
			update: update
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y : 700},
			debug: false
		}
	}
};

var game = new Phaser.Game(config);
var player;
var cursors;
var platforms;
var txt;
var state;

function preload () {
	this.load.image('bg', '/../assets/bg.png')
	this.load.image('platform','/../assets/platform.png')
	this.load.image('ball', '/../assets/ball.png')
	this.load.image('flag', '/../assets/flag.png')
}

function create () {
	this.add.image(0, 0, 'bg').setOrigin(0)

	player = this.physics.add.sprite(100, 500, 'ball')
	//player.setBounce(0.2)
	player.setCollideWorldBounds(true)

	platforms = this.physics.add.staticGroup()
	objective = this.physics.add.staticGroup()

	platforms.create(400, 568, 'platform').setScale(2).refreshBody()
	platforms.create(334, 468, 'platform')
	platforms.create(50, 398, 'platform')
	platforms.create(500, 348, 'platform')
	platforms.create(200, 258, 'platform').setScale(0.5).refreshBody()
	platforms.create(250, 200, 'platform').setScale(0.5).refreshBody()
	platforms.create(300, 140, 'platform').setScale(0.5).refreshBody()
	platforms.create(500, 60, 'platform')

	objective.create(640, 20, 'flag').setScale(0.5).refreshBody()
	//platforms.create(200, 248, 'platform')

	this.physics.add.collider(player, platforms)
	
	cursors = {
		up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
		down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
		left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
		right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
		attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
		good_state: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
		bad_state: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
		primitive_state: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
	};
	stateMachine = primitiveStateMachine
	setup()

	txt = this.add.text(40, 140, 
		stateMachine.current_state.name, {
			fontSize: '32px',
			fill: '#000'
		});
	
	state = this.add.text(40, 100, 
		stateMachine.name, {
			fontSize: '32px',
			fill: '#000'
		});
}

function update () {
	if (cursors.left.isDown) {
			player.setVelocityX(-160);
	}
	else if (cursors.right.isDown) {
			player.setVelocityX(160);
	}
	else {
			player.setVelocityX(0);
	}
	
	if(cursors.good_state.isDown) {
		stateMachine = goodStateMachine
		setup()
		state.setText(stateMachine.name)
	} else if(cursors.bad_state.isDown) {
		stateMachine = badStateMachine
		setup()
		state.setText(stateMachine.name)
	} else if(cursors.primitive_state.isDown) {
		stateMachine = primitiveStateMachine
		setup()
		state.setText(stateMachine.name)
	}

	stateMachine.updateState(player, cursors)
	txt.setText(stateMachine.current_state.name)
}

function setup() {
	stateMachine.setState()
	player.setPosition(700, 500)

}