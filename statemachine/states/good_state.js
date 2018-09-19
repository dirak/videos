var  goodStateMachine = {
	/*
	this state machine has all the seperate pieces,
	allowing you to attack while jumping and falling
	*/
	states: {
		STANDING: (player, cursors) => {
			//standing can jump or fall
			player.tint = 0xffffff
			if(!player.body.touching.down) {
				stateMachine.current_state = stateMachine.states.FALLING
			} else if(cursors.up.isDown) {
				player.setVelocityY(-360)//initiate the jump
				stateMachine.current_state = stateMachine.states.JUMPING
			}if(cursors.attack.isDown) {
				stateMachine.current_state = stateMachine.states.ATTACKING
				stateMachine.attack_timer = stateMachine.max_attack_time
			}
		},
		FALLING: (player, cursors) => {
			// falling can go to only standing
			player.tint = 0xffffff
			if(player.body.touching.down) {
				player.setVelocityY(0)
				stateMachine.current_state = stateMachine.states.STANDING
			} else if(player.body.velocity.y < 0) {
				player.body.velocity.y *= 0.3
			}
			if(cursors.attack.isDown) {
				stateMachine.current_state = stateMachine.states.FALLATTACKING
				stateMachine.attack_timer = stateMachine.max_attack_time
			}
		},
		JUMPING: (player, cursors) => {
			// jumping can only go to falling
			player.tint = 0xffffff
			if(cursors.up.isUp) {
				stateMachine.current_state = stateMachine.states.FALLING
			} else if(cursors.attack.isDown) {
				stateMachine.current_state = stateMachine.states.JUMPATTACKING
				stateMachine.attack_timer = stateMachine.max_attack_time
			}
		},
		ATTACKING: (player, cursors) => {
			/* do attack stuff */
			player.tint = 0xff00ff
			if(stateMachine.attack_timer == 0) {
				stateMachine.current_state = stateMachine.states.STANDING

			}
		},
		FALLATTACKING: (player, cursors) => {
			/* do attack stuff */
			player.tint = 0xff00ff
			if(stateMachine.attack_timer == 0) stateMachine.current_state = stateMachine.states.FALLING
			//we're attacking from here on out
			if(player.body.touching.down) {
				player.setVelocityY(0)
				stateMachine.current_state = stateMachine.states.ATTACKING
			} else if(player.body.velocity.y < 0) {
				player.body.velocity.y *= 0.3
			} 
		},
		JUMPATTACKING: (player, cursors) => {
			/* do attack stuff */
			player.tint = 0xff00ff
			if(stateMachine.attack_timerattack_timer == 0) stateMachine.current_state = stateMachine.states.JUMPING
			//we're still attacking from here on out
			else if(cursors.up.isUp) {
				stateMachine.current_state = stateMachine.states.FALLATTACKING
			}
		},
	},

	current_state: null,
	attack_timer: 0,
	name: "Final Version",
	max_attack_time: 15,

	setState : () => {
		stateMachine.current_state = stateMachine.states.STANDING
	},

	updateState : (player, cursors) => {
		if(stateMachine.attack_timer > 0) stateMachine.attack_timer --
		stateMachine.current_state(player, cursors)
	},
}