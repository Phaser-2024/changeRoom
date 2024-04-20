export let GameData: gameData = {
  globals: {
    gameWidth: 1920,
    gameHeight: 1080,
    bgColor: "#ffffff",
    debug: true
  },

  preloader: {
    bgColor: "ffffff",
    image: "logo",
    imageX: 1920 / 2,
    imageY: 1080 / 2,
    loadingText: "Caricamento...",
    loadingTextFont: "roboto",
    loadingTextComplete: "Tappa/clicca per iniziare!!",
    loadingTextY: 700,
    loadingBarColor: 0xff0000,
    loadingBarY: 630,
  },

  spritesheets: [
    {	
      name: "playerSprite",
      path: "assets/player/player-sheet.png",
      width: 64,
      height: 64,
      frames: 14
    },

    {	
      name: "playerSpriteStart",
      path: "assets/player/startAnim.png",
      width: 64,
      height: 64,
      frames: 32
    },

    {	
      name: "AbramoSprite",
      path: "assets/NPCs/Abramo_n_Isacco/Abramo-sheet.png",
      width: 64,
      height: 64,
      frames: 14
    }
],

  images: [

    { name: "phaser", path: "assets/images/logo-phaser.png" },
    { name: "intro-bg", path: "assets/images/intro-bg.jpg" },

    //Menu
    { name: "top_left", path: "assets/images/Menu/topL.png" },
    { name: "top", path: "assets/images/Menu/top.png" },
    { name: "top_right", path: "assets/images/Menu/topR.png" },
    { name: "bottom_left", path: "assets/images/Menu/bottomL.png" },
    { name: "bottom_right", path: "assets/images/Menu/bottomR.png" },
    { name: "candleholder", path: "assets/images/Menu/candleholder.png" },

    //gameplay
    //ui
    { name: "collider", path: "assets/tilemap/coll.png" },
    { name: "boxInterract", path: "assets/interactiveBox/boxInterr.png" },
    { name: "decor", path: "assets/interactiveBox/decoration.png" },
    { name: "arrow", path: "assets/map/arrow.png" },
    { name: "levelMaskLeft", path: "assets/map/levelLeft_mask.png" },
    { name: "levelMaskRight", path: "assets/map/levelRight_mask.png" },
    { name: "wallMaskLeft", path: "assets/map/wallLeft_mask.png" },
    { name: "wallMaskRight", path: "assets/map/wallRight_mask.png" },
    { name: "gameMask", path: "assets/images/gameMask.png" },
    { name: "gameMask2", path: "assets/images/gameMask2.png" },
    { name: "clockMask", path: "assets/map/map_fragment/room/roomClock-_mask.png" },
    { name: "clock", path: "assets/interactiveBox/clock.png" },


    //map
    { name: "A", path: "assets/map/map_fragment/A.png" },
    { name: "B", path: "assets/map/map_fragment/B.png" },
    { name: "C", path: "assets/map/map_fragment/C.png" },
    { name: "D", path: "assets/map/map_fragment/D.png" },
    { name: "E", path: "assets/map/map_fragment/E.png" },
    { name: "F", path: "assets/map/map_fragment/F.png" },



    //player
    { name: "player", path: "assets/images/player.png" },

   
    //NPC n Room
    { name: "isacc", path: "assets/NPCs/Abramo_n_Isacco/isacco.png" },
    {name: "roomA", path: "assets/map/map_fragment/room/roomA2.png"},
    {name: "roomA2", path: "assets/map/map_fragment/room/roomA.png"},
    {name: "roomClock", path: "assets/map/map_fragment/room/roomClock.png"},
    {name: "roomClock-solved", path: "assets/map/map_fragment/room/roomClock_solved.png"}
  ],

  tilemaps: [
  ],

  atlas: [],
  sounds: [
    /*{
    name: "music",
    paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
    volume: 1,
    loop: true,
    frame: 1,
  }*/
  ],

  videos: [

    // { name: "video", path: "/assets/video/video.mp4" },

  ],
  audios: [

    /*{
    name: "sfx",
    jsonpath: "assets/sounds/sfx.json",
    paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
    instances: 10,
  }*/
  ],

  scripts: [],
  fonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }],
  bitmapfonts: [],
};
