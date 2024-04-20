import BoxInterract from "../assets/interactiveBox/BoxInterract";
import { GameData } from "../GameData";
import GamePlay from "./GamePlay";
import Abramo from "./Abramo";
import Start from "./Start";
import ClockRoom from "./ClockRoom";

export default class UI extends Phaser.Scene{
    constructor() {
        super({
          key: "UI",
        });
    }

    private gameMask: Phaser.GameObjects.Image;

    private gamePlay: GamePlay;
    private Abramo_Isacco: Abramo;
    private Start: Start;
    private Clock: ClockRoom;

    private changeRoomBox: BoxInterract[] = [];
    private TalkerBox: BoxInterract[] = [];
    private ClockBox: BoxInterract;
    private levelMask: Phaser.GameObjects.Image[] = [];
    private wallMask : Phaser.GameObjects.Image[] = [];

    private e: Phaser.Input.Keyboard.Key; 

    private canSelect: boolean = true;


    

    private centerX = 1920/2;
    private centerY = 1080/2;

    preload()
    {
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.changeRoomBox= [new BoxInterract, new BoxInterract]
        this.TalkerBox= [new BoxInterract, new BoxInterract]
        this.ClockBox = new BoxInterract;
        //console.log(this.changeRoomBox
    }

    create()
    {
        this.gameMask = this.add.image(0, 0, "gameMask2").setScale(3).setOrigin(0).setDepth(10).setAlpha(0);

        

        this.levelMask[0] = this.add.image(0, 0, "levelMaskLeft").setOrigin(0, 0).setScale(3).setAlpha(0).setDepth(4);
        this.levelMask[1] = this.add.image(0, 0, "levelMaskRight").setOrigin(0, 0).setScale(3).setAlpha(0).setDepth(4);
        this.wallMask[0] = this.add.image(0, 8*3, "wallMaskLeft").setOrigin(0, 0).setScale(3).setAlpha(0).setDepth(4);
        this.wallMask[1] = this.add.image(0, 8*3, "wallMaskRight").setOrigin(0, 0).setScale(3).setAlpha(0).setDepth(4);

        this.changeRoomBox[0].BoxInterract(this.scene.scene, this.centerX-600, this.centerY, 5, 0);
        this.changeRoomBox[1].BoxInterract(this.scene.scene, this.centerX+600, this.centerY, 5, 0);
        this.changeRoomBox[0].getDecor().flipY = true;

        
        this.TalkerBox[0].BoxInterract(this.scene.scene, this.centerX-600, this.centerY, 5, 0);
        this.TalkerBox[1].BoxInterract(this.scene.scene, this.centerX+600, this.centerY, 5, 0);
        this.TalkerBox[0].getDecor().flipY = true;
        this.TalkerBox[1].getDecor().flipY = true;

        this.ClockBox.BoxInterract(this.scene.scene, this.centerX-600, this.centerY, 5, 0)
        
        this.changeRoomBox.forEach(element => {
            element.setTitleText("Change Room?");
            element.setOptions("Yes", "No")
        });

        this.gamePlay = <GamePlay>this.scene.get("GamePlay");
        this.Abramo_Isacco = <Abramo>this.scene.get("Abramo");
        this.Start = <Start>this.scene.get("Start");
        this.Clock = <ClockRoom>this.scene.get("ClockRoom");
    }

    update(time: number, delta: number): void
    {  
        this.gamePlay.events.on("start", () => {
            this.gameMask.setAlpha(1);
            this.levelMask[0].setAlpha(1);
            this.levelMask[1].setAlpha(1);
            this.wallMask[0].setAlpha(1);
            this.wallMask[1].setAlpha(1);
        })

        this.Abramo_Isacco.events.on("start", () => {
            this.gameMask.setAlpha(1);
        })

        this.Start.events.on("start", () => {
            this.gameMask.setAlpha(1);
            this.levelMask[0].setAlpha(1);
            this.levelMask[1].setAlpha(1);
            this.wallMask[0].setAlpha(1);
            this.wallMask[1].setAlpha(1);
        })

        this.Start.events.on("stop", () => {
            this.levelMask[0].setAlpha(0);
            this.levelMask[1].setAlpha(0);
            this.wallMask[0].setAlpha(0);
            this.wallMask[1].setAlpha(0);
        })

        this.Clock.events.on("start", () => {
            this.gameMask.setAlpha(1);
        })

        this.Clock.events.on("clocking", () => {
            this.ClockBox.getDecor().setAlpha(1);
            this.ClockBox.getContainer().setTexture("clock");
        })
        
        this.Clock.events.on("out", () => {
            
            this.ClockBox.getDecor().setAlpha(0);
        })

        //GamePlay
        this.gamePlay.events.on("in", (player: Phaser.Physics.Arcade.Sprite) => {this.ShowBoxes(player, this.changeRoomBox); this.canSelect = true} );
        this.gamePlay.events.on("out", () => {this.HideBoxes(this.changeRoomBox); this.canSelect = false});

        this.gamePlay.events.on("hideWall", () => {this.wallMask[1].setAlpha(0)});
        this.gamePlay.events.on("hideFloor", () => {this.levelMask[1].setAlpha(0); console.log()});
        this.gamePlay.events.on("showWall", () => {this.wallMask[1].setAlpha(1)});
        this.gamePlay.events.on("showFloor", () => {this.levelMask[1].setAlpha(1)});

        //Abramo n Isacco
        this.Abramo_Isacco.events.on("dialogue", (talker: integer) => {
            console.log(talker);
            
            if(talker%2 == 0)
            {
                this.TalkerBox[0].getDecor().setAlpha(0);
                this.TalkerBox[1].getDecor().setAlpha(1);
            }
            else
            {
                this.TalkerBox[0].getDecor().setAlpha(1);
                this.TalkerBox[1].getDecor().setAlpha(0);
            }
            
            
        })

        
        this.Abramo_Isacco.events.on("hide", () => {
            this.TalkerBox[0].getDecor().setAlpha(0);
            this.TalkerBox[1].getDecor().setAlpha(0);
        })
        
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

        interactionBox[box].selection();

    }

    

}