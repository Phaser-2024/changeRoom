export default class Map{
    private floor: Phaser.GameObjects.Image;
    private colliders: Phaser.Physics.Arcade.Image[] = [];
    private border: Phaser.Physics.Arcade.Image[] = [];
    private mask: integer[] = [];
    private types: Array<String> = [];
    private arrows: Phaser.GameObjects.Image[] = [];
    private down: boolean;

    private max: integer[] = [];

    private Mapx: integer;
    private Mapy: integer;

    private tag: string;

    createMap(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        this.Mapx = x;
        this.Mapy = y;
        this.floor = scene.add.image(x, y, texture).setOrigin(0, 0).setScale(3).setDepth(0).setAlpha(1);
        this.tag = texture;
    }

    setCollider(scene: Phaser.Scene, x:number, y:number)
    {
        this.colliders.push(scene.physics.add.image(x, y, "collider").setScale(1).setDepth(1).setAlpha(0));
        //this.arrows.push(scene.add.image(x + 12*3, y + 12*3, "arrow").setScale(3).setDepth(this.floor.depth).setOrigin(0, 0));


        // if(this.down)
        // {
        //     this.arrows.push(scene.add.image(x + 12*3, y + 12*3, "arrow").setScale(3).setDepth(this.floor.depth).setOrigin(0, 0));
        // }
        // else
        // {
        //     this.arrows.push(scene.add.image(x - 12*3, y - 12*3, "arrow").setScale(3).setDepth(this.floor.depth).setOrigin(1, 1));
        // }
    }

    setBorder(R:number, L:number, wall?: integer, floor?: integer)
    {
        this.max[0] = R;
        this.max[1]  = L;

        this.mask[0] = wall;
        this.mask[1] = floor;
    }

    getMask()
    {
        return this.mask;
    }

    setArrow(direction: boolean)
    {
        this.down = direction;
    }

    setTag(tag: string)
    {
        this.tag = tag;
    }

    MoveRight(x: number, y: number)
    {
        this.floor.x -= x;
        this.floor.y += y;
        this.colliders.forEach(element => {
            element.x -= x;
            element.y += y;
        });  
        // this.arrows.forEach(element => {
        //     element.x -= x;
        //     element.y += y;
        // }); 
    }

    MoveLeft(x: number, y: number)
    {
        this.floor.x += x;
        this.floor.y -= y;
        this.colliders.forEach(element => {
            element.x += x;
            element.y -= y;
        });  
        // this.arrows.forEach(element => {
        //     element.x += x;
        //     element.y -= y;
        // }); 
    }

    resetPosition()
    {
        this.floor.setPosition(this.Mapx, this.Mapy)
    }

    getColliders()
    {
        return this.colliders;
    }

    getTypes(){
        return this.types;
    }

    getImage()
    {
        return this.floor;
    }

    getArrows()
    {
        return this.arrows;
    }

    getMax()
    {
        return this.max;
    }

}