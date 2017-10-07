import Map from 'objects/Map'
import Cat from 'objects/Cat'

class Main extends Phaser.State {

	create() {

		this.game.stage.backgroundColor = '#7ec0ee'

		this.step = 0


		this.statusLabel = this.add.text(360, 10, '')
		this.statusLabel.visible = false
		this.timeLabel = this.add.text(20, 10, '')
		this.speed = 0

        this.gameover = false

        this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R)
    	this.rKey.onDown.add(this.restart, this)

		this.game.hasSelectedSprite = false
		this.game.selectedSprite = null
		this.game.canPick = true
		this.game.canPickCountdown = 0
		this.game.canPickCountdownMax = 10
		this.cats = []
		this.game.input.mouse.capture = true
		this.game.fail = false
		for(let i=0; i<1; i++) {
			this.cats.push(new Cat(this.game, 0, this.game.width/2, this.game.height/2))
		}

		this.gameoverLabel = this.add.text(this.game.world.width/2 - 300, this.game.world.height/2-60, '',{ fontSize: '40px', fill: '#000'})
		this.gameoverLabel.text = "        Don't lose any kittens!"



	}

	restart() {
		this.game.state.restart()
	}

	endgame() {
		this.gameover = true
		this.gameoverLabel.text = "You lost a kitten! You monster!\n\n              GAME OVER"
		this.gameoverLabel.visible = true

	}

	update() {
		this.step += 1

		if (this.step % 100 == 0) {
			this.gameoverLabel.visible = false
		}

		if (this.step % 200 == 0) {
			this.cats.push(new Cat(this.game, 0, this.game.width/2, this.game.height/2))
		}

		if (this.game.fail && !this.gameover) {
			this.endgame()
		}

		for(let i=0; i<this.cats.length; i++) {
			this.cats[i].update()
		}
		if (this.gameover) {
			return
		}

		if (this.game.canPickCountdown > 1) {
			this.game.canPickCountdown-= 1
		}
		else if (this.game.canPickCountdown == 1) {
			this.game.canPickCountdown == 0
			this.game.canPick = true
		}

		if (this.game.cookingCountdown > 1) {
			this.game.cookingCountdown -= 1
		}		
		if (this.game.hasSelectedSprite && this.step % 5 == 0) {
			this.game.selectedSprite.angle = this.game.rnd.integerInRange(-4, 4)
		}

		if (this.game.input.activePointer.leftButton.isDown && this.game.canPick) {
//			console.log("hasSelectedSprite" + this.game.hasSelectedSprite)
//			console.log("SelectedSprite" + this.game.selectedSprite)
			for(let i=0; i<this.cats.length; i++) {
				if (this.cats[i].click()) {
					i=this.cats.length
				}
			}

		}
		
		if  (this.game.hasSelectedSprite == true) {
			this.game.selectedSprite.sprite.x = this.game.input.x
			this.game.selectedSprite.sprite.y = this.game.input.y


		}		
		//this.timeUsed.setTime(this.game.time.totalElapsedSeconds());
		this.timeLabel.text = "Time: " + this.game.time.totalElapsedSeconds().toFixed(1) + "s"

		this.statusLabel.text = this.step
	}

	
	render() {
		//this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00")
		
	}
}

export default Main