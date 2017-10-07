class Cat {

	constructor(game, id, x, y){
		this.game = game
        this.orgX = x + this.game.rnd.integerInRange(-100,100)
        this.orgY = y + this.game.rnd.integerInRange(-100,100)
	    this.sprite = this.game.add.sprite(this.orgX, this.orgY, 'cats')
	    this.id = this.game.rnd.integerInRange(0,5)
	    if (this.id > 0) {
	    	this.id = 45 + (this.id-1)*3
	    	id = this.id
	    }
        this.sprite.frame = this.id 
        this.sprite.anchor.setTo(0.5, 0.5)
        //this.sprite.sendToBack()
        this.count = 1
        this.pickable = true
        this.name = "sock"
        
        this.sprite.angle = 0
//    	this.sprite.body.setSize(1,1,0,0);
		this.sprite.animations.add('down', [id+0,id+1,id+2], 10, true)
		this.sprite.animations.add('up', [id+36,id+37,id+38], 10, true)
		this.sprite.animations.add('left', [id+12,id+13,id+14], 10, true)
		this.sprite.animations.add('right', [id+24,id+25,id+26], 10, true)

		this.setDown()
	}

	setDown() {

		if (this.sprite.x > this.game.width/2) {
			if (this.game.rnd.integerInRange(0,1) != 0) {
				this.sprite.animations.play("right")
				this.dirX = 1
			}
			else {
				if (this.sprite.y > this.game.height/2) {
					this.sprite.animations.play("down")
					this.dirY = 1
				}
				else {
					this.sprite.animations.play("up")
					this.dirY = -1
				}
			}
		}
		else {
			this.dirX = -1
			if (this.game.rnd.integerInRange(0,1) != 0) {
				this.sprite.animations.play("left")
			}
			else {
				if (this.sprite.y > this.game.height/2) {
					this.sprite.animations.play("down")
					this.dirY = 1
				}
				else {
					this.sprite.animations.play("up")
					this.dirY = -1
				}
			}

		}			

	}

	update() {
		if (this.game.rnd.integerInRange(0,200) == 0) {
			this.dirX = 1 
			this.sprite.animations.play("right")
			if (this.game.rnd.integerInRange(0,1) == 0) {
				this.dirX = -1
				this.sprite.animations.play("left")
			}
			this.dirY = 1

			if (this.game.rnd.integerInRange(0,1) == 0) {
				this.dirY = -1
			}

		}
		if (this.game.rnd.integerInRange(0,2) == 0) {
			if (this.game.rnd.integerInRange(0,4) != 0) {
				if (this.dirX == 1) {
					this.sprite.x+=1
				}
				else {
					this.sprite.x-=1
				}
			}
			if (this.game.rnd.integerInRange(0,4) != 0) {
				if (this.dirY == 1) {
					this.sprite.y+=1
				}
				else {
					this.sprite.y-=1
				}
			}
		}

		if (this.sprite.x > this.game.width || this.sprite.x < 0 ||
			this.sprite.y > this.game.height || this.sprite.y < 0) {
			this.game.fail = true
		}

	}

    setSelectedSprite(spr) {
        if (this.game.canPick) {
            this.game.selectedSprite = spr
            this.game.canPickCountdown = this.game.canPickCountdownMax
            this.game.canPick = false
            this.game.hasSelectedSprite = true

        }
    }

    click() {
        if (this.pickable && (this.game.input.x > (this.sprite.x - this.sprite.width/2)) &&
            (this.game.input.x < (this.sprite.x + this.sprite.width/2)) &&
            (this.game.input.y > (this.sprite.y - this.sprite.height/2)) &&
            (this.game.input.y < (this.sprite.y + this.sprite.height/2))) {
            if (this.game.hasSelectedSprite == true) {

                    this.game.selectedSprite.sprite.x = this.game.input.x
                    this.game.selectedSprite.sprite.y = this.game.input.y
                    this.game.selectedSprite.sprite.angle = 0
                    this.game.selectedSprite = null
                    this.game.hasSelectedSprite = false
                    this.game.canPickCountdown = this.game.canPickCountdownMax
                    this.game.canPick = false

                
            }
            else if (this.pickable == true) {
                this.setSelectedSprite(this)
                
            }
            return true
        }
	}

}

export default Cat