import { Display, Textures } from "phaser";

export default class Menu extends Phaser.Scene {

    constructor() {
      super({
        key: "Menu",
      });
  
    }

    private menuImages : Phaser.GameObjects.Image[] = [null];
    private menuText : Phaser.GameObjects.Text[] = [null];

    preload() 
    { }

    create() 
    {
      const centerX = this.game.canvas.width/2;
      const centerY = this.game.canvas.height/2;

      this.cameras.main.setBackgroundColor("#000000"); 

      //particles

      //Images
      this.add.rectangle(centerX, centerY, 1920, 1080, 0x000000, .5);
      this.menuImages = [
        this.add.image(centerX, centerY, "top_left"),
        this.add.image(centerX, centerY, "top"),
        this.add.image(centerX, centerY, "top_right"),
        this.add.image(centerX, centerY, "candleholder"),
        this.add.image(centerX, centerY, "bottom_left"),
        this.add.image(centerX, centerY, "bottom_right")
      ];

      this.menuImages.forEach((element) => {
        element.setScale(3);
      })

      //Text
      this.menuText = [
        this.add.text(centerX, centerY-10, "Start"),
        this.add.text(centerX, centerY+140, "Load"),
        this.add.text(centerX, centerY+290, "Exit")
      ]

      this.menuText.forEach(element => {
        element.setOrigin(.5).setFontFamily("GothPixels").setFontSize(48).setInteractive({cursor : "pointer"}); 
      });


    }
  
    update(time: number, delta: number): void 
    {
      let start = this.menuText[0];
      let load = this.menuText[1];
      let exit = this.menuText[2];

      this.menuText.forEach(element => {

        element.on("pointerover", () => 
        {
          element.setTint(0xfff88f);
        })

        element.on("pointerout", () => 
        {
          element.clearTint();
        })
      });

      exit.on("pointerdown", () => 
      {
        window.close(); 
      });

      start.on("pointerdown", () =>
      {
        this.scene.stop("Menu");
        this.scene.start("UI").bringToTop;
        this.scene.start("GamePlay");

      })

    }
  
  }