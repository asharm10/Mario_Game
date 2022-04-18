var currentCoins;
var player;
var platforms;
var cursors;
var hazards;
var cams;
var castle;
var coins;
var text;
var jump_S;
var die_S;
var coin_S;
var bricks;
class main extends Phaser.Scene {

    constructor() {
      super("Main");
    }
    
    create() {

        this.add.image(400, 300, 'sky').setScrollFactor(0);
        this.add.image(0,510,'buildings').setScrollFactor(0.4).setOrigin(0,1).setScale(0.8);
        this.add.image(800,510,'buildings').setScrollFactor(0.4).setOrigin(0,1).setScale(0.8);

        bricks = this.physics.add.staticGroup();
        bricks.create(50,380,'brick').setScale(0.1).refreshBody();
        bricks.create(50,470,'brick').setScale(0.1).refreshBody();

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'greenplatfrom').setScale(3.7).refreshBody();
        platforms.create(1200, 568, 'greenplatfrom').setScale(3.7).refreshBody();
        platforms.create(400*6, 568, 'greenplatfrom').setScale(3.7).refreshBody();
        platforms.create(400, 568, 'ground').setScale(.1).refreshBody();
        platforms.create(400*3, 568, 'ground').setScale(.1).refreshBody();
        platforms.create(400*5, 568, 'ground').setScale(.1).refreshBody();

        hazards=this.physics.add.staticGroup();
        coins=this.physics.add.group();

        var position = 600;
        for (let i =0;i<3;i++){
            platforms.create(position,400,'ground').setScale(.025).refreshBody();
            hazards.create(position-45,470,'spikes-floor').setScale(.2).refreshBody();
            hazards.create(position+45,470,'spikes-floor').setScale(.2).refreshBody();
            var width = position-80;
            for(let j = 0; j<4;j++){    
                coins.create(width,300,'coin').setScale(.1)
                width+=50
            }
            position += 500
        }
        var position = 850;
        for (let i =0;i<3;i++){
            platforms.create(position,270,'ground').setScale(.025).refreshBody();
            hazards.create(position-23,240,'fire').setScale(0.04).refreshBody();
            hazards.create(position+23,240,'fire').setScale(.04).refreshBody();
            var width = position-80;
            for(let j = 0; j<2;j++){    
                coins.create(width,0,'coin').setScale(.1)
                width+=150
            }
            width = position-80;
            for (let j=0;j<4;j++){
                coins.create(width,400,'coin').setScale(.1)
                width+=50
            }
            position += 500
        }
        hazards.create(850+500-35,330,'spikes-ceiling').setScale(.19).refreshBody();
        hazards.create(850+500+35,330,'spikes-ceiling').setScale(.19).refreshBody();

        castle = this.physics.add.staticGroup();
        castle.create(800*3-120,360,'castle').setScale(.8)

        player = this.physics.add.sprite(150, 300, 'mario').setScale(3);

        player.setBounce(0.2);
        //this.player.setCollideWorldBounds(true);
        jump_S = this.sound.add("jump_s",{loop:false});
        coin_S = this.sound.add("coin_s",{loop:false});
        die_S =this.sound.add("die_s",{loop:false});

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mario', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'mario', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mario', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        cams = this.cameras.main.setBounds(0,0,800*3,600).startFollow(player);
        currentCoins = 0;
        text = this.add.text(10, 10, 'Score: ' + currentCoins, { font: '32px Courier', fill: '#000000' }).setScrollFactor(0);

        this.physics.add.overlap(player, coins, coinFunction);
        this.physics.add.collider(
            player,
            hazards,
            killFunction,
            null,
            this
        );
        this.physics.add.collider(
            player,
            castle,
            finishFunction,
            null,
            this
        );
        

        function coinFunction (player, coin)
        {   
            //  Hide the coins
            coins.killAndHide(coin);

            coin.body.enable = false;

            currentCoins = currentCoins+1;
            coin_S.play()
        }

        function killFunction(player,hazards)
        {
           
            player.body.enable = false;
            die_S.play();
            this.add.text(200, 100, "Game Over\n\nYour score: " + currentCoins + "\n\nWait for the restart",  { fontFamily: 'Helsinki', fontSize: 30, color: '#ff0000'}).setScrollFactor(0);
            this.time.delayedCall(2000, function() {
                this.scene.restart();
              }, [], this);
        }
        function finishFunction(player,castle){

            player.body.enable = false;
            this.add.text(300,50, 'This is the end Point!\n\nYour Score:' + currentCoins+"\n\nWait for the restart", { font: '32px Courier', fill: '#000000' }).setScrollFactor(0);
            this.time.delayedCall(5000, function() {
                this.scene.restart();
              }, [], this);

        }
    }

    update() {

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player,bricks);
        this.physics.add.collider(coins,platforms);

        cursors = this.input.keyboard.createCursorKeys();
        text.setText('Score: ' + currentCoins);
    
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
    
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
    
            player.anims.play('right', true); 
        }
        else
        {
            player.setVelocityX(0);
    
            player.anims.play('turn');
            

        }
    
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-300);
            jump_S.play();
        }

    }
    
}
