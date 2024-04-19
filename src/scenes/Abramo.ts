import { Collision } from "matter";
import { Scene, Scenes } from "phaser";
import { GameData } from "../GameData";
import Map from "../assets/map/Map";
import UI from "./UI";

export default class GamePlay extends Phaser.Scene {
  constructor() {
    super({
      key: "Abramo",
    });
  }

  private d: Phaser.Input.Keyboard.Key;
  private a: Phaser.Input.Keyboard.Key;
  private w: Phaser.Input.Keyboard.Key;
  private s: Phaser.Input.Keyboard.Key;

  private map: Map[] = [];
  private levelMask: Phaser.GameObjects.Image;
  private rectangle: Phaser.GameObjects.Image;
  private triggerArea: Phaser.Physics.Arcade.Image;

  private player: Phaser.Physics.Arcade.Sprite;
  private abramo: Phaser.Physics.Arcade.Sprite;

  private canPlayerMove: Boolean = true;
  private canAbramoMove: Boolean = true;

  private overlap: boolean = false;
  private isPressing: boolean = false;

  private centerX = 1920 / 2;
  private centerY = 1080 / 2;

  //---- DIALOGHI ----
  private dialogGroup: Phaser.GameObjects.Group;
  private dialogText: Phaser.GameObjects.Text;
  private dialogBox: Phaser.GameObjects.Rectangle;
  private currentText: string = "";
  private fullText: string = "";
  private index: number = 0;
  private number: number;
  private testo_dialogo: string[];

  init(data: UI) {
    //movement key
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.map = [new Map(), new Map(), new Map()];
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    this.player = this.physics.add
      .sprite(this.centerX - 96, this.centerY - 24, "playerSprite")
      .setScale(3)
      .setDepth(2);

    this.CreateAnimation();

    this.rectangle = this.add
      .image(this.centerX, this.centerY, "roomA").setScale(3)
    //   .setStrokeStyle(3, 0xffffff);
    this.player.setCollideWorldBounds(true);
    // this.physics.world.setBounds(
    //   this.rectangle.x - this.rectangle.width / 2,
    //   this.rectangle.y - this.rectangle.height / 2,
    //   this.rectangle.width,
    //   this.rectangle.height
    // );
    this.physics.add.collider(this.player, null, null, null, this);

    //abramo
    this.abramo = this.physics.add
      .sprite(this.centerX + 200, this.centerY - 150, "AbramoSprite")
      .setScale(3)
      .setDepth(2)
      .setFrame(0);

    this.triggerArea = this.physics.add
      .image(this.centerX + (this.centerX * 35) / 100, this.centerY, "coll")
      .setScale(17)
      .setAlpha(0);
    this.physics.add.collider(this.triggerArea, null, null, null, this);

    //--- DIALOGHI ---
    this.number = 0;

    this.testo_dialogo = [
      "Ecco sono qui, Signore. Grazie per la tua provvidenza",
      "Cosa stai blaterando Insipido?",
      "Signore, cosa sta dicendo?",
      "Chi è lei? Perché mi chiama Signore?",
      "Dio mi aveva promesso che sarebbe intervenuto",
      "Intervenuto in cosa?",
      "Egli mi aveva detto: Prendi tuo figlio, il tuo unico figlio, quello che ami, Isacco, e va' nel paese di Moriah. Offrilo là in olocausto su un monte che io ti indichero'.",
      "Dio? Chi è Dio?",
      "Dio è l'essere supremo e il creatore dell'Universo",
      "E come fai a saperlo?",
      "Me lo ha detto",
      "Hai delle prove?",
      "Ho sentito delle voci, aveva detto che sarebbe intervenuto",
      "E dov'è quest'essere supremo adesso?",
      "Io.... Non......",
    ];

    this.dialogGroup = this.add.group();

    // Crea la casella di dialogo
    this.dialogBox = this.add.rectangle(
      this.centerX,
      this.centerY + 400,
      800,
      200,
      0x000000,
      0.8
    );
    this.dialogBox.setOrigin(0.5, 0.5);
    this.dialogBox.setStrokeStyle(2, 0xffffff);
    this.dialogBox.setFillStyle(0x000000);

    // Aggiunge la casella di dialogo al gruppo
    this.dialogGroup.add(this.dialogBox);

    // Crea il testo della casella di dialogo
    this.dialogText = this.add
      .text(this.dialogBox.x, this.dialogBox.y, "")
      .setFontFamily("GothPixels")
      .setFontSize("32px");
    this.dialogText.setWordWrapWidth(750);
    this.dialogText.setAlign("center");
    this.dialogText.setOrigin(0.5, 0.5);
    this.dialogText.setColor("#ffffff");

    // Aggiunge il testo della casella di dialogo al gruppo
    this.dialogGroup.add(this.dialogText);
    this.input.keyboard.on("keydown-SPACE", this.advanceDialog, this);
    this.input.keyboard.on("keydown-ENTER", this.advanceDialog, this);
    // Avvia il primo dialogoW
  }

  update(time: number, delta: number): void {
    this.Movement();
    this.PlayerAnimations();

    if (this.physics.overlap(this.player, this.triggerArea)) {
      this.overlap = true;

      this.dialogo();
      this.triggerArea.destroy();
    }

    if (this.canPlayerMove) {
      this.abramoMovement();
    }
  }

  Movement() {
    if (this.canPlayerMove) {
      if (this.d.isDown) {
        this.player.x += 6;
        this.player.y -= 3;
        this.isPressing = true;
      } else if (this.a.isDown) {
        this.player.x -= 6;
        this.player.y += 3;
        this.isPressing = true;
      } else if (this.w.isDown) {
        this.player.x -= 6;
        this.player.y -= 3;
        this.isPressing = true;
      } else if (this.s.isDown) {
        this.player.x += 6;
        this.player.y += 3;
        this.isPressing = true;
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
          frames: [0, 1, 2, 3, 4, 5],
        }),
        frameRate: 6,
        yoyo: false,
        repeat: -1,
      });
    }
    if (!this.anims.exists("walkRightAbramo")) {
      this.anims.create({
        key: "walkRightAbramo",
        frames: this.anims.generateFrameNumbers("AbramoSprite", {
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
          frames: [6, 7, 8, 9, 10, 11],
        }),
        frameRate: 6,
        yoyo: false,
        repeat: -1,
      });
    }

    if (!this.anims.exists("walkLeftAbramo")) {
      this.anims.create({
        key: "walkLeftAbramo",
        frames: this.anims.generateFrameNumbers("AbramoSprite", {
          frames: [8, 9, 10, 11, 12, 13],
        }),
        frameRate: 6,
        yoyo: false,
        repeat: -1,
      });
    }

    if (!this.anims.exists("walkUp")) {
      this.anims.create({
        key: "walkUp",
        frames: this.anims.generateFrameNumbers("playerSprite", {
          frames: [0, 1, 2, 3, 4, 5],
        }),
        frameRate: 6,
        yoyo: false,
        repeat: -1,
      });
    }

    if (!this.anims.exists("idle")) {
      this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("playerSprite", {
          frames: [5],
        }),
        frameRate: 6,
        yoyo: false,
        repeat: -1,
      });
    }
  }

  PlayerAnimations() {
    if (this.isPressing && this.canPlayerMove) {
      if (this.d.isDown) {
        this.player.flipX = false;
        this.player.play("walkRight", true);
      } else if (this.a.isDown) {
        this.player.flipX = false;
        this.player.play("walkLeft", true);
      } else if(this.w.isDown){
        this.player.play("walkRight", true);
        this.player.flipX = true;
      } else if(this.s.isDown){
        this.player.play("walkLeft", true);
        this.player.flipX = true;
      }
    } else {
      this.player.play("idle", true);
    }
  }

  abramoMovement() {
    if (this.abramo.x < 1400 && this.canAbramoMove) {
      this.abramo.x += 1.8;
      this.abramo.y += 0.9;
      this.abramo.flipX = true;
      this.abramo.play("walkLeftAbramo", true)
      this.canAbramoMove = true;
    } else if (this.abramo.x > 1000) {
      this.abramo.x -= 1.8;
      this.abramo.y -= 0.9;
      this.abramo.play("walkRightAbramo", true)
      this.abramo.flipX = true;
      this.canAbramoMove = false;
    } else if (this.abramo.x < 1000) {
      this.canAbramoMove = true;
    }
  }

  dialogo() {
    this.canPlayerMove = false;
    this.abramo.flipX = false;
    this.abramo.setFrame(7);
    this.abramo.stop()
    this.startDialog(this.testo_dialogo[0]);
  }

  //-----------------------------------------------
  //--- DIALOGHI ---
  startDialog(text: string) {
    // Mostra il testo nella casella di dialogo
    this.fullText = text;
    this.index = 0;
    this.currentText = "";
    this.dialogText.setText("");

    // Avvia l'effetto di scrittura
    this.time.addEvent({
      delay: 50,
      callback: this.animateText,
      callbackScope: this,
      loop: true,
    });
  }

  animateText() {
    if (this.index < this.fullText.length) {
      this.currentText += this.fullText[this.index];
      this.dialogText.setText(this.currentText);
      this.index++;
    } else {
      // Stoppa l'effetto di scrittura quando il testo è stato completamente visualizzato
      this.time.removeAllEvents();
    }
  }

  clearDialog() {
    this.dialogText.setText("");
    this.dialogGroup.setVisible(false);
  }

  advanceDialog() {
    // Avanza nel dialogo o chiude la casella di dialogo se è l'ultimo messaggio
    if (
      this.fullText === this.testo_dialogo[this.number] &&
      this.number < this.testo_dialogo.length - 1
    ) {
      this.number++;
      this.startDialog(this.testo_dialogo[this.number]);
    } else {
      this.dialogText.setText("");
      this.dialogGroup.destroy();
      this.dialogBox.destroy(); //rimuovere il box quando è finito
      this.canPlayerMove = true;
    }
  }
}
