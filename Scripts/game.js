window.onload = function(){
    let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 350 },
                debug: false
            }
        },
        scene: [preload, main]
    };
    const game = new Phaser.Game(config);
}

