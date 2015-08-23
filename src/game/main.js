'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)  
        return false;
 
    for (var i = 0, l=this.length; i < l; i++) { 
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;     
        }           
    }       
    return true;
}  ; 

    var topMargin = 3;
    var leftMargin = 10;
    var player;
    var diamond;
    var map;
    var layer1;
    var tileSize = 48;

    var numberOfAnswers = 8;
    var numberOfRehersals = 8;
    var condition = 1;

    var State;
    var game;
    var Phaser;

     //  The score
    var scoreString = '';
    var score = 10;
    var scoreString = 'Score : ';
    var scoreText; 


    var state = new State(numberOfRehersals, numberOfAnswers, condition);



    function preload() {
        game.load.image('diamond', 'assets/diamond.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.image('tiles', 'assets/tiles.png');
        game.load.tilemap('mapa', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);
    }

    function create() {

        player = game.add.sprite(topMargin * 48 , leftMargin *  48, 'dude', 6);
        player.scale.set(0.9);
        player.anchor.set(-0.05);

        game.stage.backgroundColor = '#818282';
        scoreText = game.add.text(game.world.width - 200, 10, scoreString + state.score, { font: '32px Arial', fill: '#fff' });

        map = game.add.tilemap('mapa');
        map.addTilesetImage('tiles');
        layer1 = map.createLayer('mapa');
        
        map.setCollision(20, true, this.layer);

        var key = game.input.keyboard.addKey(Phaser.Keyboard.UP); 
        key.onDown.add(function(key)
        {
            updateGameData(key);
        }, this);

        key = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT); 
        key.onDown.add(function(key)
        {
            updateGameData(key);
        }, this);

    }

    function movePlayer(key){
        leaveTrail(player.x, player.y);
        if(key.keyCode === 38){
            player.y = player.y - tileSize;
        } 
        if(key.keyCode === 39){
            player.x = player.x + tileSize;
        }
    }

    function updateScore(){
        state.incrementScore();
        scoreText.text = scoreString + state.score;
    }

    function leaveTrail(x,y){
        var tile = map.getTile(0,0);
        map.putTile(tile, layer1.getTileX(x), layer1.getTileY(y), layer1);
    }

    function updateGameData(key){
        var answer = state.getCurrentAnswer();
        var rehersal = state.getCurrentRehersal();
        if(rehersal == numberOfRehersals){
            console.log('the game has ended');
        } else{
            if(answer <= 7){
                movePlayer(key);
                state.logKeyPress(key.event.keyIdentifier);
                state.nextAnswer();
            }
            if(answer==7){
                    leaveTrail(player.x, player.y);
                    var result = state.checkCondition1(rehersal, answer);
                    var result2 = state.checkCondition2(rehersal, answer);

                    result = state.checkCondition();
                    if(result){
                        showDiamond();
                        updateScore();
                    }else{
                        showBlackScreen();
                    }
                                        
                    console.log('Rehersal ' + rehersal);
                    console.log('Rehersal ended (condition1)  points? ' + result );
                    console.log('Rehersal ended (condition2)  points? ' + result2 );

                    game.time.events.add(Phaser.Timer.SECOND * 2, startNextRehersal, this);
                }
            console.log('Answer ' + state.getCurrentAnswer());
            }   

        }

    function showDiamond(){
        var x = player.x;
        var y = player.y;
        var diamond = game.add.sprite(x + 48 , y, 'diamond');
        diamond.anchor.set(-0.2);
    }

    function showBlackScreen(){
        layer1.alpha = 0.4;
        //layer1.visible = false;
        //player.visible = false;
        //game.stage.backgroundColor = '#000000';
    }

    function showScreen(){
        layer1.visible = true;
        player.visible = true;
        layer1.alpha = 1;
        game.stage.backgroundColor = '#818282';
    }

    function hideDiamond(){
        if(diamond){
            diamond.kill();
        }
    }    

    function startNextRehersal(){
        layer1.destroy(); 
        map = game.add.tilemap('mapa'); 
        map.addTilesetImage('tiles');
        layer1 = map.createLayer('mapa');

        //map = game.add.tilemap('mapa');
        //layer1 = map.createLayer('mapa');

        state.nextRehersal();
        state.resetAnswer();
        hideDiamond();
        player.x = topMargin*48;
        player.y = leftMargin*48;
    }

    function update() {

    }

