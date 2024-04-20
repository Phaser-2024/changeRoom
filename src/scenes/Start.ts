export default class Start extends Phaser.Scene{
    constructor() {
        super({
          key: "Start",
        });
    }

    private player: Phaser.GameObjects.Sprite;
    private map: Phaser.GameObjects.Image;
    private coverBox: Phaser.GameObjects.Rectangle;
    private tween: Phaser.Tweens.Tween;

    private complete: boolean = false;

    //dialogue
    private dialogGroup: Phaser.GameObjects.Group;
    private dialogText: Phaser.GameObjects.Text;
    private dialogBox: Phaser.GameObjects.Rectangle;
    private currentText: string = '';
    private fullText: string = '';
    private index: number = 0;
    private number : number;
    private dialogueTesto:string[];
    
    private centerX = 1920 / 2;
    private centerY = 1080 / 2;

    preload()
    {   }

    create()
    {   
        this.events.emit("start");
        this.cameras.main.setBackgroundColor("#000000");

        this.coverBox = this.add.rectangle(0, 0, 1920, 1080, 0x000000, 0).setOrigin(0);


        this.player = this.add.sprite(this.centerX - 96, this.centerY - 24 + 60, "playerSpriteStart").setScale(3).setDepth(2);

        //create the animation
        if (!this.anims.exists("wakeUp")) {
            this.anims.create({
              key: "wakeUp",
              frames: this.anims.generateFrameNumbers("playerSpriteStart", {
                frames: [0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,2,2,2,1,1,0,1,2,3,4,5,6,7,8,9,
                    10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
              }),
              frameRate: 6,
              yoyo: false,
              repeat: 0,
            });
          }

        this.player.play("wakeUp");

        this.map = this.add.image(6, 12, "B").setScale(3).setDepth(1).setOrigin(0).setAlpha(1);

        //dialogue
        
        this.number=0;
        this.dialogueTesto = ["Dove... sono?"];
   
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
      this.dialogBox.setFillStyle(0x000000).setDepth(this.coverBox.depth+1);
   
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
        this.dialogText.setColor("#ffffff").setDepth(this.dialogBox.depth+1);
   
       // Aggiunge il testo della casella di dialogo al gruppo
       this.dialogGroup.add(this.dialogText);
       this.input.keyboard.on('keydown-SPACE', this.advanceDialog, this);
       this.input.keyboard.on("keydown-ENTER", this.advanceDialog, this);
       // Avvia il primo dialogoW
    }

    update()
    {   
        if(!this.complete)
        {   
            this.player.on("animationcomplete-wakeUp", () => {
                this.complete = true;
                this.player.destroy();
                this.map.destroy();
                this.events.emit("stop");
                this.coverBox.setAlpha(1);

                this.time.delayedCall(1000*1.5, () =>{this.startDialog(this.dialogueTesto[0]);}, [], this);
                    
                this.scene.stop("Start");
                this.scene.start("GamePlay").moveBelow("UI", "GamePlay");
            });
        }

    }

    //dialogue
    startDialog(text: string) {
        // Mostra il testo nella casella di dialogo
        this.fullText = text;
        this.index = 0;
        this.currentText = '';
        this.dialogText.setText('');
    
        // Avvia l'effetto di scrittura
        this.time.addEvent({
            delay: 120,
            callback: this.animateText,
            callbackScope: this,
            loop: true
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
      this.dialogText.setText('');
      this.dialogGroup.setVisible(false);
    }
    
    
    
    advanceDialog() {
        // Avanza nel dialogo o chiude la casella di dialogo se è l'ultimo messaggio
        console.log(this.number+""+ this.dialogueTesto.length)
        if (this.fullText === this.dialogueTesto[this.number]&&this.number < this.dialogueTesto.length-1) {
          this.number++;
          this.startDialog(this.dialogueTesto[this.number]);
      } else {
          this.dialogText.setText('');
      }
    }

}