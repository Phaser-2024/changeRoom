export default class Map{
    private floor: Phaser.GameObjects.Image;
    private colliders: Phaser.Physics.Arcade.Image[] = [];
    private arrows: Phaser.GameObjects.Image[] = [];
    private down: boolean;

    private Mapx: integer;
    private Mapy: integer;

    createMap(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        this.Mapx = x;
        this.Mapy = y;
        this.floor = scene.add.image(x, y, texture).setOrigin(0, 0).setScale(3).setDepth(0).setAlpha(1);
    }

    setCollider(scene: Phaser.Scene, x:number, y:number)
    {
        this.colliders.push(scene.physics.add.image(x, y, "collider").setScale(1).setDepth(1).setAlpha(0));
        //this.arrows.push(scene.add.image(x + 12*3, y + 12*3, "arrow").setScale(3).setDepth(this.floor.depth).setOrigin(0, 0));


        if(this.down)
        {
            this.arrows.push(scene.add.image(x + 12*3, y + 12*3, "arrow").setScale(3).setDepth(this.floor.depth).setOrigin(0, 0));
        }
        else
        {
            this.arrows.push(scene.add.image(x - 12*3, y - 12*3, "arrow").setScale(3).setDepth(this.floor.depth).setOrigin(1, 1));
        }
    }

    setArrow(direction: boolean)
    {
        this.down = direction;
    }

    MoveRight(x: number, y: number)
    {
        this.floor.x -= x;
        this.floor.y += y;
        this.colliders.forEach(element => {
            element.x -= x;
            element.y += y;
        });  
        this.arrows.forEach(element => {
            element.x -= x;
            element.y += y;
        }); 
    }

    MoveLeft(x: number, y: number)
    {
        this.floor.x += x;
        this.floor.y -= y;
        this.colliders.forEach(element => {
            element.x += x;
            element.y -= y;
        });  
        this.arrows.forEach(element => {
            element.x += x;
            element.y -= y;
        }); 
    }

    resetPosition()
    {
        this.floor.setPosition(this.Mapx, this.Mapy)
    }

    getColliders()
    {
        return this.colliders;
    }

    getImage()
    {
        return this.floor;
    }

    getArrows()
    {
        return this.arrows;
    }

}