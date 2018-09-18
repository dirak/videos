var  stateMachine = {
	/*
	this state machine has all the seperate pieces,
	allowing you to attack while jumping and falling
	*/
	states: {
		STANDING: (player, cursors) => {
			//standing can jump or fall
			player.tint = 0xffffff
			if(cursors.up.isDown) {
				player.setVelocityY(-360)//initiate the jump
				stateMachine.jumping_state = stateMachine.states.JUMPING
			} else if(!player.body.touching.down) {
				stateMachine.jumping_state = stateMachine.states.FALLING
			}
		},
		FALLING: (player, cursors) => {
			// falling can go to only standing
			if(player.body.touching.down) {
				player.setVelocityY(0)
				stateMachine.jumping_state = stateMachine.states.STANDING
			} else if(player.body.velocity.y < 0) {
				player.body.velocity.y *= 0.3
			}
		},
		JUMPING: (player, cursors) => {
			// jumping can only go to falling
			if(cursors.up.isUp) {
				stateMachine.jumping_state = stateMachine.states.FALLING
			}
		},
		NOTATTACKING: (player, cusors) => {
			if(cursors.attack.isDown) {
				stateMachine.attacking_state = stateMachine.states.ATTACKING
			}
		},
		ATTACKING: (player, cursors) => {
			/* do attack stuff */
			player.tint = 0xff00ff
			if(stateMachine.attack_timer < 10) stateMachine.attack_timer++
			else {
				stateMachine.attack_timer = 0
				stateMachine.attacking_state = stateMachine.states.NOTATTACKING
			}
		}
	},

	jumping_state: null,
	attacking_state: null,

	attack_timer: 0,

	setState : () => {
		stateMachine.jumping_state = stateMachine.states.STANDING
		stateMachine.attacking_state = stateMachine.states.NOTATTACKING
	},

	updateState : (player, cursors) => {
		stateMachine.jumping_state(player, cursors)
		stateMachine.attacking_state(player, cursors)
	},
}