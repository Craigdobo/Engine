/**
 * Created by cturner on 07/08/2017.
 */
var stage;
var renderer;
var initStake;
var availStakes = [0.20,0.40,0.60,0.80,1,2,5,10,20,50,100,200];
var stakepos = 5;
var up;
var down;
var H1
var H1Spin;
var reel1;
var reel2;
var reel3;

function init() {
    {

        renderer = PIXI.autoDetectRenderer(1680, 1050);
        document.body.appendChild(renderer.view);
        renderer.backgroundColor = 0xffffff;
        stage = new PIXI.Container();

        renderer.autoResize = true;
        renderer.resize(window.innerWidth, window.innerHeight);

        window.addEventListener("resize", function (event) {
            scaleToWindow(renderer.view);
        });

        PIXI.loader
            .add(["img/background.png", "img/buttons/home.png", "img/quitgame.png", "img/buttons/no.png", "img/buttons/yes.png",
            "img/buttons/spin.png", "img/buttons/stakefield.png", "img/buttons/up.png", "img/buttons/down.png", "img/reel/Jelly_03.png",
            "img/reel/red_spin.png"])
            .on("complete", assetLoad)
            .load();

        refresh();
    }
}

function assetLoad() {

    var background = new PIXI.Sprite(PIXI.loader.resources["img/background.png"].texture);
    background.scale.set(renderer.width / 1280, renderer.height / 720);
    background.position.set(0,0);

    var homeBtn = new PIXI.Sprite(PIXI.loader.resources["img/buttons/home.png"].texture);
    homeBtn.scale.set(renderer.width / 2800, renderer.width / 2800);
    homeBtn.position.set(renderer.width / 1.08, renderer.height / 130);
    homeBtn.interactive = true;
    homeBtn.buttonMode = true;

    homeBtn.mousedown = function (mouseData){
      homeBtn.scale.set(renderer.width / 2750, renderer.width / 2750);
      homeBtn.position.set(renderer.width / 1.078, renderer.height / 110);
      refresh();
    };

    homeBtn.mouseup = function (mouseData) {
    homeBtn.scale.set(renderer.width / 2800, renderer.width / 2800);
    homeBtn.position.set(renderer.width / 1.08, renderer.height / 130);
    stage.addChild(quitDialog, quitYes, quitNo);
    homeBtn.interactive = false;
    up.interactive = false;
    down.interactive = false;
    refresh();
    };

    var quitDialog = new PIXI.Sprite(PIXI.loader.resources["img/quitgame.png"].texture);
    quitDialog.scale.set(renderer.width / 2000, renderer.width / 2000);
    quitDialog.position.set(renderer.width / 3.2, renderer.height / 5);
    var quitYes = new PIXI.Sprite(PIXI.loader.resources["img/buttons/yes.png"].texture);
    quitYes.scale.set(renderer.width / 2500, renderer.width / 2500);
    quitYes.position.set(renderer.width / 2.4, renderer.height / 2);
    quitYes.interactive = true;
    quitYes.buttonMode = true;
    quitYes.mousedown = function (mouseData){
        quitYes.scale.set(renderer.width / 2550, renderer.width / 2550);
        quitYes.position.set(renderer.width / 2.398, renderer.height / 1.99);
        refresh();
    };
    quitYes.mouseup = function (mouseData){
        window.location.href = 'https://vegas.williamhill.com/en-gb/';
    };

    var quitNo = new PIXI.Sprite(PIXI.loader.resources["img/buttons/no.png"].texture);
    quitNo.scale.set(renderer.width / 2500, renderer.width / 2500);
    quitNo.position.set(renderer.width / 1.8, renderer.height / 2);
    quitNo.interactive = true;
    quitNo.buttonMode = true;
    quitNo.mousedown = function (mouseData){
        quitNo.scale.set(renderer.width / 2550, renderer.width / 2550);
        quitNo.position.set(renderer.width / 1.798, renderer.height / 1.99);
        refresh();
    };
    quitNo.mouseup = function (mouseData){
        stage.removeChild(quitDialog, quitYes, quitNo);
        homeBtn.interactive = true;
        up.interactive = true;
        down.interactive = true;
        refresh();
    };

    var spin = new PIXI.Sprite(PIXI.loader.resources["img/buttons/spin.png"].texture);
    spin.scale.set(renderer.width / 3000, renderer.width / 3000);
    spin.position.set(renderer.width / 1.2, renderer.height / 2.2);
    spin.interactive = true;
    spin.buttonMode = true;
    spin.mousedown = function (mouseData) {
        spin.scale.set(renderer.width / 3050, renderer.width / 3050);
        spin.position.set(renderer.width / 1.2, renderer.height / 2.19);
        refresh();
    };
    spin.mouseup = function (mouseData) {
        spin.scale.set(renderer.width / 3000, renderer.width / 3000);
        spin.position.set(renderer.width / 1.2, renderer.height / 2.2);
        spingame();
        refresh();
    };

    var stake = new PIXI.Sprite(PIXI.loader.resources["img/buttons/stakefield.png"].texture);
    stake.scale.set(renderer.width / 3500, renderer.width / 3500);
    stake.position.set(renderer.width / 50 , renderer.height / 2);
    initStake = new PIXI.Text("£" + availStakes[stakepos].toString(),{fontFamily: "Arial", fill: 0xFFFFFF, fontSize: 70, align: 'left'});
    initStake.anchor.set(0.5,0.5);
    initStake.position.set(122,125);
    stake.addChild(initStake);

    up = new PIXI.Sprite(PIXI.loader.resources["img/buttons/up.png"].texture);
    up.scale.set(renderer.width / 3500, renderer.width / 3500);
    up.position.set(renderer.width / 35 , renderer.height / 2.5);
    up.interactive = true;
    up.buttonMode = true;
    up.mousedown = function (mouseData){
        up.scale.set(renderer.width / 3550, renderer.width / 3550);
        up.position.set(renderer.width / 35 , renderer.height / 2.5);
        refresh();
    };
    up.mouseup = function (mouseData){
        up.scale.set(renderer.width / 3500, renderer.width / 3500);
        up.position.set(renderer.width / 34.95 , renderer.height / 2.49);
        increaseStake();
    };

    down = new PIXI.Sprite(PIXI.loader.resources["img/buttons/down.png"].texture);
    down.scale.set(renderer.width / 3500, renderer.width / 3500);
    down.position.set(renderer.width / 35 , renderer.height / 1.55);
    down.interactive = true;
    down.buttonMode = true;
    down.mousedown = function (mouseData){
        down.scale.set(renderer.width / 3550, renderer.width / 3550);
        down.position.set(renderer.width / 34.95 , renderer.height / 1.54);
        refresh();
    };
    down.mouseup = function (mouseData) {
        down.scale.set(renderer.width / 3500, renderer.width / 3500);
        down.position.set(renderer.width / 35 , renderer.height / 1.55);
        decreaseStake();
    };

    H1 = PIXI.Texture.fromImage("img/reel/Jelly_03.png");
    H1Spin = PIXI.Texture.fromImage("img/reel/red_spin.png");
    reel1 = new PIXI.Sprite(H1);
    reel1.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel1.position.set(renderer.width / 3 , renderer.height / 2.2);

    reel2 = new PIXI.Sprite(H1);
    reel2.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel2.position.set(renderer.width / 2.2 , renderer.height / 2.2);

    reel3 = new PIXI.Sprite(H1);
    reel3.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel3.position.set(renderer.width / 1.74 , renderer.height / 2.2);

    stage.addChild(background, homeBtn, spin, stake, up, down, reel1, reel2, reel3);
    refresh();
}

function refresh(){
    renderer.render(stage);
}

function increaseStake(){

    if (stakepos >= availStakes.length){
        up.interactive = false;
        down.interactive = true;
    }
    else{
        stakepos = stakepos + 1;
        stake = availStakes[stakepos];
        initStake.text = "£" + availStakes[stakepos].toString();
        down.interactive = true;
        if(stakepos >= 11){
            up.interactive = false;
        }
        else{
            up.interactive = true;
        }
        refresh();
    }
}

function decreaseStake(){
    if (stakepos < 1){
        down.interactive = false;
        up.interactive = true;
    }
    else{
        stakepos = stakepos - 1;
        stake = availStakes[stakepos];
        initStake.text = "£" + availStakes[stakepos].toString();
        up.interactive = true;
        if(stakepos <= 0){
            down.interactive = false;
        }
        else{
            down.interactive = true;
        }
        refresh();
    }
}

function spingame(){

    reel1.setTexture(H1Spin);
    reel2.setTexture(H1Spin);
    reel3.setTexture(H1Spin);

    reel1.y +=8;
    reel2.y +=8;
    reel3.y +=8;
    requestAnimationFrame(spingame);
    refresh();
}
