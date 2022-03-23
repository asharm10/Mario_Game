class preload extends Phaser.Scene{
    constructor(){
      super();
    }
    preload(){
        this.load.image('sky','Assets/sky.png');
        this.load.image('ground','Assets/ground.png');
        this.load.image('platform','Assets/platform.png');
        this.load.image('brick','Assets/tile-brick.png');
        this.load.image('buildings','Assets/building.png');
        this.load.image('greenplatfrom','Assets/green.png');
        this.load.image('fire','Assets/fire.png');
        this.load.image('spikes-floor','Assets/tile-spikes-floor.png');
        this.load.image('spikes-ceiling','Assets/tile-spikes-ceiling.png');
        this.load.image('castle','Assets/castle.png');
        this.load.image('coin','Assets/coin.png');
        this.load.audio("coin_s",'Assets/coin_sound.wav' );
        this.load.audio("jump_s",'Assets/jump_sound.wav');
        this.load.audio("die_s", 'Assets/die_sound.wav');

        this.load.atlas('mario', 
            'Assets/mario.png','Assets/sprites.json'
        );
    }

    create(){
        this.scene.start("Main");
    }
}