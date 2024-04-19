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

  private map: Map[] = [];

  private player: Phaser.Physics.Arcade.Sprite;

  private overlap: boolean = false;
  private isPressing: boolean = false;
  private up: boolean = true;
  private border: boolean = false;
  private maxRight: boolean = false;
  private maxLeft: boolean = false;


  private floor: integer = 0;

  private UI: UI;

  private canMoveBehind: boolean = true;
  private canMoveBeyond: boolean = true;

  private centerX = 1920 / 2;
  private centerY = 1080 / 2;

  init(data: UI) {
    //movement key
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.map = [
      new Map(),
      new Map(),
      new Map(),
      new Map(),
      new Map(),
      new Map(),
    ];
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    this.player = this.physics.add
      .sprite(this.centerX - 96, this.centerY - 24 + 60, "playerSprite")
      .setScale(3)
      .setDepth(2);

    this.UI = <UI>this.scene.get("UI");

    this.CreateAnimation();
    this.CreateMaps();
  }

  update(time: number, delta: number): void {
    this.Movement();
    this.PlayerAnimations();

    if(Phaser.Input.Keyboard.JustDown(this.e))
    {
      console.log(this.map[this.floor].getImage().x, this.map[this.floor].getImage().y)
    }

    if(this.map[this.floor].getImage().x == this.map[this.floor].getMax()[0])
    {
      this.maxLeft = true;
    }
    else if(this.map[this.floor].getImage().x == this.map[this.floor].getMax()[1])
    {
      this.maxRight = true;
    }
    else
    {
      this.maxLeft = false;
      
      this.maxRight = false;
    }

    for (var i = 0; i < this.map.length; i++) {
      if (i != this.floor) {
        this.map[i].getImage().setAlpha(0);
      } else {
        this.map[i].getImage().setAlpha(1);
      }
    }

    this.UI.events.on("selected", (opt: integer) => {
      this.ChangeRoom(opt);
    });

    if(this.physics.overlap(this.player, this.map[this.floor].getColliders()))
    {
      this.overlap = true;
      this.events.emit("in", this.player)
    }
    else if(this.overlap)
    {
      this.overlap = false;
      this.events.emit("out");
    }


  }

  Movement() {
    if (this.d.isDown && !this.maxRight) {
      this.up = true;
      this.map[this.floor].MoveRight(6, 3);
      this.isPressing = true;
    } else if (this.a.isDown && !this.maxLeft) {
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
        frameRate: 6,
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
        frameRate: 6,
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
        frameRate: 6,
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
        frameRate: 6,
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

  CreateMaps() {
    this.map[0].createMap(
      this.scene.scene,
      -this.centerX - 6,
      -this.centerY + 54,
      "A"
    );
    this.map[0].setCollider(
      this.scene.scene,
      this.centerX,
      this.centerY + 60,
    );
    this.map[0].setBorder(-504,-1584)


    /*
    this.map[1].setCollider(
      this.scene.scene,
      this.centerX - 625,
      this.centerY + 350,
      "borderLeft"
    );
    this.map[1].setCollider(
      this.scene.scene,
      this.centerX + 400,
      this.centerY - 180,
      "borderRight"
    );*/

    this.map[1].createMap(this.scene.scene, 0, -48 + 63, "B");

    this.map[2].createMap(this.scene.scene, 0, 0, "C");

    this.map[3].createMap(this.scene.scene, 0, 0, "D");

    this.map[4].createMap(this.scene.scene, 0, 0, "E");

    this.map[5].createMap(this.scene.scene, 0, 0, "F");

    this.map.forEach((element) => {
      element.getImage().setAlpha(0);
      element.getArrows().forEach((arr) => {
        arr.setAlpha(0);
      });
    });
  }

  ChangeRoom(opt: integer) {
    this.canMoveBehind = true;
    this.canMoveBeyond = true;
    if (opt == 0) {
      this.floor = 1;
    }
  }
}
