var  stateMachine = {
	/*
	this state machine has all the seperate pieces, but you can't attack while falling
	*/
	states: {
		STANDING: (player, cursors) => {
			player.tint = 0xffffff
			if(cursors.up.isDown) {
				player.setVelocityY(-360)
				stateMachine.current_state = stateMachine.states.JUMPING
			}
		},
		FALLING: (player, cursors) => {
			// falling can go to only standing
			if(player.body.touching.down) {
				player.setVelocityY(0)
				stateMachine.current_state = stateMachine.states.STANDING
			} else if(player.body.velocity.y < 0) {
				player.body.velocity.y *= 0.3
			}
		},
		JUMPING: (player, cursors) => {
			// jumping can only go to falling
			if(cursors.up.isUp) {
				stateMachine.current_state = stateMachine.states.FALLING
			}
		},
	},

	current_state: null,

	setState : () => {
		stateMachine.current_state = stateMachine.states.STANDING
	},
	updateState : (player, cursors) => {
		stateMachine.current_state(player, cursors)
	},
}