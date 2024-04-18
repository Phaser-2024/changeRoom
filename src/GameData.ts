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
    { name: "levelMask", path: "assets/map/level_mask.png" },
    
    //map
    { name: "A", path: "assets/map/map_fragment/A.png" },
    { name: "B", path: "assets/map/map_fragment/B.png" },
    { name: "C", path: "assets/map/map_fragment/C.png" },
    { name: "D", path: "assets/map/map_fragment/D.png" },
    { name: "E", path: "assets/map/map_fragment/E.png" },
    { name: "F", path: "assets/map/map_fragment/F.png" },


    { name: "player", path: "assets/images/player.png" },
    { name: "collider", path: "assets/tilemap/coll.png" },
    { name: "boxInterract", path: "assets/interactiveBox/boxInterr.png" },
    { name: "decor", path: "assets/interactiveBox/decoration.png" },
    { name: "arrow", path: "assets/map/arrow.png" },
    
    { name: "isacc", path: "assets/player/isacco.png" },
    
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
