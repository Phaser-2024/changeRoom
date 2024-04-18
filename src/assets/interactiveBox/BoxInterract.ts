import { GameObjects, Input, Scene } from "phaser";
import { GameData } from "../../GameData";

export default class BoxInterract{
    private container: Phaser.GameObjects.Image;
    private decoration: Phaser.GameObjects.Image;
    private options: Phaser.GameObjects.Text[] = [null];
    private titleTxt: Phaser.GameObjects.Text;
    private selectorBox: Phaser.GameObjects.Rectangle;
    private scene: Phaser.Scene;
    private selector: integer = 0;

    private cursor: Phaser.Types.Input.Keyboard.CursorKeys;

    
    private e: Phaser.Input.Keyboard.Key;

    BoxInterract(scene: Phaser.Scene, x: integer, y: integer, depth: integer, alpha?: integer)
    {
        this.scene = scene;
        this.container = scene.add.image(x, y, "boxInterract").setOrigin(.5).setScale(3).setDepth(depth).setAlpha(0);
        this.decoration = scene.add.image(this.container.x, this.container.y, "decor").setOrigin(.5).setScale(3).setDepth(this.container.depth+1).setAlpha(alpha);

        this.setTitleText("");
        this.setOptions("");
    }


    setTitleText(txt: string)
    {
        const height = this.container.y-(this.container.height-this.container.height/2-15)*3;

        this.titleTxt = this.getScene().add.text(this.container.x, height, txt).setFontFamily("GothPixels").setFontSize(39).setAlpha(0).setOrigin(.5, 0).setDepth(this.container.depth+1);
    
        if(this.getDecor().flipY)
        {
            this.titleTxt.setPosition(this.container.x, this.container.y+(this.container.height-this.container.height/2-30)*3)
        }
    
    }

    setOptions(txt1?: string, txt2?: string, txt3?: string, txt4?: string, txt5?: string)
    {   
        const optionsHeight = this.container.y-(this.container.height-this.container.height/2-15)*3 + 72; //provvisorio

        this.options = [
            this.getScene().add.text(this.container.x, optionsHeight, txt1),
            this.getScene().add.text(this.container.x, optionsHeight, txt2),
            this.getScene().add.text(this.container.x, optionsHeight, txt3),
            this.getScene().add.text(this.container.x, optionsHeight, txt4),
            this.getScene().add.text(this.container.x, optionsHeight, txt5)
        ];

        var i: integer;
        for(i=0; i<this.options.length; i++)
        {
            this.options[i].setFontFamily("GothPixels").setFontSize(30).setAlpha(0).setOrigin(.5, 0).setDepth(this.container.depth+1).setStroke("#000000", 12);
            if(i>0)
            {
                this.options[i].setPosition(this.options[i].x, this.options[i-1].y + this.options[i].height + 30);
            }
        }

        //selector
        this.selectorBox = this.getScene().add.rectangle(this.container.x, this.options[0].y, this.container.width*3-46, this.options[0].height, 0xffffff).setAlpha(0).setDepth(this.options[0].depth-1).setOrigin(.5, 0);

    }

    //setter
    setSelector(value: integer)
    {
        this.selector = value;
    }

    //getter
    getContainer()
    {
        return this.container;
    }

    getScene()
    {
        return this.scene;
    }

    getDecor()
    {
        return this.decoration;
    }

    getOptions()
    {
        return this.options;
    }

    getSelection()
    {
        return this.selector;
    }

    //
    setAlpha(value:integer)
    {
        this.decoration.setAlpha(value);
        this.selectorBox.setAlpha(value);
        this.titleTxt.setAlpha(value);
        this.options.forEach(item => {
            item.setAlpha(value);
        });
    }

    selection()
    {
        this.cursor = this.getScene().input.keyboard.createCursorKeys();
        this.e = this.getScene().input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);


        if (this.selector >= 0 && Phaser.Input.Keyboard.JustDown(this.cursor.right) && this.selector < this.options.length-1||
        this.selector >= 0 && Phaser.Input.Keyboard.JustDown(this.cursor.down) && this.selector < this.options.length-1)
        {
            if(this.options[this.selector+1].text.length > 0)
            {
                this.selector++;
                console.log(this.selector)
            }
        }
        else if(this.selector > 0 && Phaser.Input.Keyboard.JustDown(this.cursor.left) && this.selector < this.options.length||
        this.selector > 0 && Phaser.Input.Keyboard.JustDown(this.cursor.up) && this.selector < this.options.length)
        {
            this.selector--;
            console.log(this.selector)

        }

        if(Phaser.Input.Keyboard.JustDown(this.e))
        {
            return this.selector;
        }

        this.selectorBox.setPosition(this.container.x, this.options[this.selector].y)
    }



}