import { Collision } from "matter";
import { Scene, Scenes } from "phaser";
import { GameData } from "../GameData";
import Map from "../assets/map/Map";
import UI from "./UI";

export default class GamePlay extends Phaser.Scene {
  constructor() {
    super({
      key: "GamePlay",
    });
  }

  private d: Phaser.Input.Keyboard.Key;
  private a: Phaser.Input.Keyboard.Key;
  private e: Phaser.Input.Keyboard.Key;

  private map: Map[] = [null];

  private player: Phaser.Physics.Arcade.Sprite;

  private overlap: boolean = false;
  private isPressing: boolean = false;
  private up: boolean = true;
  private maxRight: boolean = false;
  private maxLeft: boolean = false;
  private played: boolean = false;


  private floor: integer = 0;

  private UI: UI;

  private centerX = 1920 / 2;
  private centerY = 1080 / 2;


  preload() 
  {
    //movement key
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.map = [new Map(),new Map(),new Map(),new Map(),new Map()];
    
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    this.player = this.physics.add.sprite(this.centerX - 96, this.centerY - 24 + 60, "playerSprite").setScale(3).setDepth(2);

    this.UI = <UI>this.scene.get("UI");

    this.events.emit("start");

    this.CreateAnimation();
    this.Createmaps();
  }

  update(time: number, delta: number): void {
    this.Movement();
    this.PlayerAnimations();
    this.BorderMask();

    for (var i = 0; i < this.map.length; i++) {
      if (i != this.floor) 
      {
        this.map[i].getImage().setAlpha(0);
        this.map[i].getColliders().forEach(coll =>{
          coll.setAlpha(0);
        })
      } 
      else 
      {
        this.map[i].getImage().setAlpha(1);
        this.map[i].getColliders().forEach(coll =>{
          //coll.setAlpha(1);
        })
      }
    }

    this.UI.events.on("selected", (opt: integer) => {
      if(!this.played)
      {
        this.ChangeRoom(opt);
        this.played=true;
      }
    });
    if(this.e.isUp)
    {
      this.played = false;
    }

    if(this.physics.overlap(this.player, this.map[this.floor].getColliders()))
    {
      this.overlap = true;
      this.events.emit("in", this.player);
    }
    else if(this.overlap)
    {
      this.overlap = false;
      this.events.emit("out");
    }

  }

  BorderMask()
  {
    if(this.map[this.floor].getImage().x == this.map[this.floor].getMax()[0])
    {
      this.maxRight = true;
    }
    else if(this.map[this.floor].getImage().x == this.map[this.floor].getMax()[1])
    {
      this.maxLeft = true;
    }
    else
    {
      this.maxLeft = false;
      this.maxRight = false;
    }

    if(this.map[this.floor].getImage().x <= this.map[this.floor].getMask()[0])
    {
      this.events.emit("hideWall");
    }
    else if(this.map[this.floor].getImage().x != this.map[this.floor].getMask()[0])
    {
      this.events.emit("showWall");
    }
    
    if(this.map[this.floor].getImage().x <= this.map[this.floor].getMask()[1])
    {
      this.events.emit("hideFloor");
    }
    else if(this.map[this.floor].getImage().x != this.map[this.floor].getMask()[1])
    {
      this.events.emit("showFloor");
    }
  }

  Movement() {
    if(Phaser.Input.Keyboard.JustDown(this.e))
    {
       console.log(this.map[this.floor].getImage().x)
       console.log(this.floor)
    }

    if (this.d.isDown && !this.maxLeft) {
      this.up = true;
      this.map[this.floor].MoveRight(6, 3);
      this.isPressing = true;
    } else if (this.a.isDown && !this.maxRight) {
      this.up = false;
      this.map[this.floor].MoveLeft(6, 3);
      this.isPressing = true;
    } else {
      this.isPressing = false;
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
    if (this.isPressing) {
      if (this.d.isDown) {
        this.player.play("walkRight", true);
      } else if (this.a.isDown) {
        this.player.play("walkLeft", true);
      }
    } else if (this.up) {
      this.player.play("idleUp", true);
    } else if (!this.up) {
      this.player.play("idleDown", true);
    }
  }

  ChangeRoom(opt: integer) 
  {
    if(opt == 0)
    {
      switch (this.floor) 
      {
        case 0:
          if(this.map[this.floor].getImage().x < -1200)
          {
            this.floor = 2;
          }
          else
          {
            this.floor = 1;
          }

          break;
        case 1:
          this.floor = 0;
          break;
        case 2:
          if(this.map[this.floor].getImage().x < -114)
          {
            this.floor = 3;
          }
          else
          {
            this.floor = 0;
          }
          break;
      
        default:
          break;
      }
    }

    console.log(this.maxLeft, this.maxRight)
  }

  Createmaps() 
  {
    this.map[0].createMap(this.scene.scene,-this.centerX - 6,-this.centerY + 54, "A");
    this.map[0].setCollider(this.scene.scene, this.centerX-6, this.centerY+54);
    this.map[0].setCollider(this.scene.scene, this.centerX+600, this.centerY-250);
    this.map[0].setBorder(-528,-1578)

    this.map[1].createMap(this.scene.scene,0, -48 + 63, "B");
    this.map[1].setCollider(this.scene.scene,this.centerX-50, this.centerY+100);
    this.map[1].setBorder(90,-324)

    this.map[2].createMap(this.scene.scene, 0, 0, "C");
    this.map[2].setCollider(this.scene.scene,this.centerX+200, this.centerY);
    this.map[2].setCollider(this.scene.scene,this.centerX-200, this.centerY+50);
    this.map[2].setBorder(1,-225)

    this.map[3].createMap(this.scene.scene, 0, 0, "D");
    this.map[3].setCollider(this.scene.scene,this.centerX, this.centerY);
    this.map[3].setCollider(this.scene.scene,-this.centerX, this.centerY);
    this.map[3].setBorder(-24,-492)

    this.map[4].createMap(this.scene.scene, 0, 0, "E");
    this.map[4].setCollider(this.scene.scene,this.centerX, this.centerY);
    this.map[4].setBorder(0,-228)
  }

  
}
