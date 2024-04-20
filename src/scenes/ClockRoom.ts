export default class ClockRoom extends Phaser.Scene{
    constructor() {
        super({
          key: "ClockRoom",
        });
    }

        
    private d: Phaser.Input.Keyboard.Key;
    private a: Phaser.Input.Keyboard.Key;
    private w: Phaser.Input.Keyboard.Key;
    private s: Phaser.Input.Keyboard.Key;
    private e: Phaser.Input.Keyboard.Key;

    private room: Phaser.GameObjects.Image;
    private clockColl: Phaser.Physics.Arcade.Image;
    private player: Phaser.Physics.Arcade.Sprite;
    private clockMask: Phaser.GameObjects.Image;

    
    private cursor: Phaser.Types.Input.Keyboard.CursorKeys;

        
    private isPressing: boolean = false;
    private up: boolean = true;
    private canPlayerMove: Boolean = true;
    private overlap: boolean = false;


    private centerX = 1920 / 2;
    private centerY = 1080 / 2;
    
    preload()
    {      
        //movement key
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); 
        
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    create()
    {   
        this.events.emit("start");
        this.cameras.main.setBackgroundColor("#000000")
        this.CreateAnimation();

        this.room = this.add.image(0,0, "roomClock").setScale(3).setOrigin(0).setDepth(1);
        this.clockColl = this.physics.add.image(this.centerX-250, this.centerY-250, "collider").setAlpha(0);
        this.clockMask = this.add.image(+48*3, +24*3, "clockMask").setScale(3).setOrigin(0).setDepth(3).setAlpha(1);

        this.player = this.physics.add.sprite(this.centerX - 96, this.centerY - 24 + 60, "playerSprite").setScale(3).setDepth(2);
    }

    update()
    {   
        if(Phaser.Input.Keyboard.JustDown(this.e))
            {
               console.log(this.clockMask.x, this.clockMask.y)
            }
        
        if(this.physics.overlap(this.player, this.clockColl))
        {
            this.overlap = true;
            this.events.emit("clocking");
            this.ChangeRoomSize();
        }
        else if(this.overlap)
        {
            this.overlap = false;
            this.events.emit("out");
        }

        this.Movement();
        this.PlayerAnimations();
    }

    Movement() {
        if (this.canPlayerMove) {
          if (this.d.isDown) {
            this.player.x += 2;
            this.player.y -= 1;
            this.isPressing = true;
            this.player.flipX = false;
            this.up = true;
          } else if (this.a.isDown) {
            this.player.x -= 2;
            this.player.y += 1;
            this.isPressing = true;
            this.player.flipX = false;
            this.up = false;
          } else if (this.w.isDown) {
            this.player.x -= 2;
            this.player.y -= 1;
            this.isPressing = true;
            this.player.flipX = true;
            this.up = true;
          } else if (this.s.isDown) {
            this.player.x += 2;
            this.player.y += 1;
            this.isPressing = true;
            this.player.flipX = true;
            this.up = false;
          } else {
            this.isPressing = false;
          }
        }
    }

    CreateAnimation() {
        if (!this.anims.exists("walkRight")) {
          this.anims.create({
            key: "walkRight",
            frames: this.anims.generateFrameNumbers("playerSprite", {
              frames: [1, 2, 3, 4, 5, 6],
            }),
            frameRate: 4,
            yoyo: false,
            repeat: -1,
          });
        }
    
        if (!this.anims.exists("walkLeft")) {
          this.anims.create({
            key: "walkLeft",
            frames: this.anims.generateFrameNumbers("playerSprite", {
              frames: [8, 9, 10, 11, 12, 13],
            }),
            frameRate: 4,
            yoyo: false,
            repeat: -1,
          });
        }
    
        if (!this.anims.exists("walkUp")) {
          this.anims.create({
            key: "walkUp",
            frames: this.anims.generateFrameNumbers("playerSprite", {
              frames: [1, 2, 3, 4, 5, 6],
            }),
            frameRate: 4,
            yoyo: false,
            repeat: -1,
          });
        }
    
        if (!this.anims.exists("idleUp")) {
          this.anims.create({
            key: "idleUp",
            frames: this.anims.generateFrameNumbers("playerSprite", {
              frames: [0],
            }),
            frameRate: 4,
            yoyo: false,
            repeat: -1,
          });
        }
    
        if (!this.anims.exists("idleDown")) {
          this.anims.create({
            key: "idleDown",
            frames: this.anims.generateFrameNumbers("playerSprite", {
              frames: [7],
            }),
            frameRate: 4,
            yoyo: false,
            repeat: -1,
          });
        }
      }

    PlayerAnimations() {
    if (this.isPressing && this.canPlayerMove) {
        if (this.d.isDown) {
        this.player.play("walkRight", true);
        } else if (this.a.isDown) {
        this.player.play("walkLeft", true);
        } else if(this.w.isDown){
        this.player.play("walkRight", true);
        } else if(this.s.isDown){
        this.player.play("walkLeft", true);
        }
    } else if (this.up) {
        this.player.play("idleUp", true);
    } else if (!this.up) {
        this.player.play("idleDown", true);
    }
    }


    ChangeRoomSize()
    {
        if(this.cursor.left.isDown && this.clockMask.x > -6)
        {
            this.clockMask.x -= 6;
            this.clockMask.y -=3;
        }
        else if(this.cursor.right.isDown && this.clockMask.x < 280)
        {
            this.clockMask.x += 6;
            this.clockMask.y += 3;
        }
        if(this.clockMask.x > 280)
        {
            this.PuzzleSolved();
        }
    }

    PuzzleSolved()
    {
        this.clockColl.destroy();
        this.room.setTexture("roomClock-solved");
    }

}