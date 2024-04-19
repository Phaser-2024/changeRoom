import BoxInterract from "../assets/interactiveBox/BoxInterract";
import { GameData } from "../GameData";
import GamePlay from "./GamePlay";

export default class UI extends Phaser.Scene{
    constructor() {
        super({
          key: "UI",
        });
    }

    private gamePlay: GamePlay;

    private changeRoomBox: BoxInterract[] = [];
    private levelMask: Phaser.GameObjects.Image[] = [];
    private wallMask : Phaser.GameObjects.Image[] = [];

    private e: Phaser.Input.Keyboard.Key; 

    private centerX = 1920/2;
    private centerY = 1080/2;

    preload()
    {
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.changeRoomBox= [new BoxInterract, new BoxInterract]
        //console.log(this.changeRoomBox
    }

    create()
    {
        this.levelMask[0] = this.add.image(0, 0, "levelMaskLeft").setOrigin(0, 0).setScale(3).setAlpha(1).setDepth(4);
        this.levelMask[1] = this.add.image(0, 0, "levelMaskRight").setOrigin(0, 0).setScale(3).setAlpha(1).setDepth(4);
        this.wallMask[0] = this.add.image(0, 8*3, "wallMaskLeft").setOrigin(0, 0).setScale(3).setAlpha(1).setDepth(4);
        this.wallMask[1] = this.add.image(0, 8*3, "wallMaskRight").setOrigin(0, 0).setScale(3).setAlpha(1).setDepth(4);

        this.changeRoomBox[0].BoxInterract(this.scene.scene, this.centerX-600, this.centerY, 10, 0);
        this.changeRoomBox[1].BoxInterract(this.scene.scene, this.centerX+600, this.centerY, 10, 0);
        this.changeRoomBox[0].getDecor().flipY = true;
        
        this.changeRoomBox.forEach(element => {
            element.setTitleText("Change Room?");
            element.setOptions("Yes", "No")
        });

        this.gamePlay = <GamePlay>this.scene.get("GamePlay");
    }

    update(time: number, delta: number): void
    {   
        this.gamePlay.events.on("in", (player: Phaser.Physics.Arcade.Sprite) => {this.ShowBoxes(player, this.changeRoomBox)} );
        this.gamePlay.events.on("out", () => {this.HideBoxes(this.changeRoomBox)});
        this.gamePlay.events.on("hideWall", () => {this.wallMask[1].setAlpha(0)});
        this.gamePlay.events.on("hideFloor", () => {this.levelMask[1].setAlpha(0); console.log()});
        this.gamePlay.events.on("showWall", () => {this.wallMask[1].setAlpha(1)});
        this.gamePlay.events.on("showFloor", () => {this.levelMask[1].setAlpha(1)});
    }

    HideBoxes(interactionBox: BoxInterract[])
    {
        interactionBox.forEach(box => {
            box.setAlpha(0);
            box.setSelector(0);
        })
    }

    ShowBoxes(player: Phaser.Physics.Arcade.Sprite, interactionBox: BoxInterract[])
    {
        var box: integer = 0;

        if(player.anims.currentAnim.key == "walkLeft" && interactionBox[1].getDecor().alpha == 0)
        {
            interactionBox[0].setAlpha(1);
        }
        else if(player.anims.currentAnim.key == "walkRight" && interactionBox[0].getDecor().alpha == 0)
        {
            interactionBox[1].setAlpha(1);
        }

        if(interactionBox[0].getDecor().alpha == 1)
        {
            box = 0;
        }
        else if(interactionBox[1].getDecor().alpha == 1)
        {
            box = 1;
        }

        this.events.emit("selected", interactionBox[box].selection())
        

    }

}