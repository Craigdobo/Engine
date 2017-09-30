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
var H1;
var H2;
var H3;
var H4;
var H5;
var H6;
var reel1;
var reel2;
var reel3;
var reel4;
var reel5;
var reel6;
var reel7;
var reel8;
var reel9;
var reel10;
var reel11;
var reel12;
var reel13;
var reel14;
var reel15;
var reelcount = 0;
var reelarray = [];
var symb = [];
var rngNumber;

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
            "img/buttons/spin.png", "img/buttons/stakefield.png", "img/buttons/up.png", "img/buttons/down.png", "img/reel/Jelly_01.png",
            "img/reel/Jelly_02.png", "img/reel/Jelly_03.png", "img/reel/Jelly_04.png", "img/reel/Jelly_05.png", "img/reel/Jelly_06.png",
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
    spin.interactive = false;
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
        spin.interactive = true;
        refresh();
    };

    var spin = new PIXI.Sprite(PIXI.loader.resources["img/buttons/spin.png"].texture);
    spin.scale.set(renderer.width / 3000, renderer.width / 3000);
    spin.position.set(renderer.width / 1.2, renderer.height / 2.35);
    spin.interactive = true;
    spin.buttonMode = true;
    spin.mousedown = function (mouseData) {
        spin.scale.set(renderer.width / 3050, renderer.width / 3050);
        spin.position.set(renderer.width / 1.2, renderer.height / 2.349);
        refresh();
    };
    spin.mouseup = function (mouseData) {
        spin.scale.set(renderer.width / 3000, renderer.width / 3000);
        spin.position.set(renderer.width / 1.2, renderer.height / 2.35);
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

    H1 = PIXI.Texture.fromImage("img/reel/Jelly_01.png");
    H2 = PIXI.Texture.fromImage("img/reel/Jelly_02.png");
    H3 = PIXI.Texture.fromImage("img/reel/Jelly_03.png");
    H4 = PIXI.Texture.fromImage("img/reel/Jelly_04.png");
    H5 = PIXI.Texture.fromImage("img/reel/Jelly_05.png");
    H6 = PIXI.Texture.fromImage("img/reel/Jelly_06.png");
    symb = [H1, H2, H3, H4, H5, H6];
    reelSet();
    reel1 = new PIXI.Sprite(symb[reelarray[0]]);
    reel1.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel1.position.set(renderer.width / 5 , renderer.height / 4);

    reel2 = new PIXI.Sprite(symb[reelarray[1]]);
    reel2.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel2.position.set(renderer.width / 3.2 , renderer.height / 4);

    reel3 = new PIXI.Sprite(symb[reelarray[2]]);
    reel3.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel3.position.set(renderer.width / 2.3 , renderer.height / 4);

    reel4 = new PIXI.Sprite(symb[reelarray[3]]);
    reel4.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel4.position.set(renderer.width / 1.8 , renderer.height / 4);

    reel5 = new PIXI.Sprite(symb[reelarray[4]]);
    reel5.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel5.position.set(renderer.width / 1.5 , renderer.height / 4);

    reel6 = new PIXI.Sprite(symb[reelarray[5]]);
    reel6.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel6.position.set(renderer.width / 5 , renderer.height / 2.2);

    reel7 = new PIXI.Sprite(symb[reelarray[6]]);
    reel7.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel7.position.set(renderer.width / 3.2 , renderer.height / 2.2);

    reel8 = new PIXI.Sprite(symb[reelarray[7]]);
    reel8.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel8.position.set(renderer.width / 2.3 , renderer.height / 2.2);

    reel9 = new PIXI.Sprite(symb[reelarray[8]]);
    reel9.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel9.position.set(renderer.width / 1.8 , renderer.height / 2.2);

    reel10 = new PIXI.Sprite(symb[reelarray[9]]);
    reel10.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel10.position.set(renderer.width / 1.5 , renderer.height / 2.2);

    reel11 = new PIXI.Sprite(symb[reelarray[10]]);
    reel11.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel11.position.set(renderer.width / 5 , renderer.height / 1.5);

    reel12 = new PIXI.Sprite(symb[reelarray[11]]);
    reel12.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel12.position.set(renderer.width / 3.2 , renderer.height / 1.5);

    reel13 = new PIXI.Sprite(symb[reelarray[12]]);
    reel13.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel13.position.set(renderer.width / 2.3 , renderer.height / 1.5);

    reel14 = new PIXI.Sprite(symb[reelarray[13]]);
    reel14.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel14.position.set(renderer.width / 1.8 , renderer.height / 1.5);

    reel15 = new PIXI.Sprite(symb[reelarray[14]]);
    reel15.scale.set(renderer.width / 3500, renderer.width / 3500);
    reel15.position.set(renderer.width / 1.5 , renderer.height / 1.5);

    stage.addChild(background, homeBtn, spin, stake, up, down, reel1, reel2, reel3, reel4, reel5, reel6,  reel7, reel8, reel8, reel9, reel10, reel11, reel12, reel13, reel14, reel15);
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

    if (reelcount === 3){
        if(reel1.y >= renderer.height / 2.2){

            cancelAnimationFrame(spingame);
            reel1.setTexture(symb[reelarray[0]]);
            reel2.setTexture(symb[reelarray[1]]);
            reel3.setTexture(symb[reelarray[2]]);
            reel4.setTexture(symb[reelarray[3]]);
            reel5.setTexture(symb[reelarray[4]]);
            reelcount = 0;
            refresh();
        }
        else{
            reel1.setTexture(symb[reelarray[0]]);
            reel2.setTexture(symb[reelarray[1]]);
            reel3.setTexture(symb[reelarray[2]]);
            reel4.setTexture(symb[reelarray[3]]);
            reel5.setTexture(symb[reelarray[4]]);

            reel1.y += 10;
            reel2.y += 10;
            reel3.y += 10;
            reel4.y += 10;
            reel5.y += 10;
            requestAnimationFrame(spingame);
            refresh();
        }
    }

    else {

        if (reel1.y >= 600) {
            cancelAnimationFrame(spingame);
            reelSet();
            stage.removeChild(reel1, reel2, reel3);
            reel1.y = renderer.height / 4;
            reel2.y = renderer.height / 4;
            reel3.y = renderer.height / 4;
            reel4.y = renderer.height / 4;
            reel5.y = renderer.height / 4;
            stage.addChild(reel1, reel2, reel3);
            refresh();
            spingame();
            reelcount = reelcount + 1;
        }
        else {
            reel1.setTexture(symb[reelarray[0]]);
            reel2.setTexture(symb[reelarray[1]]);
            reel3.setTexture(symb[reelarray[2]]);
            reel4.setTexture(symb[reelarray[3]]);
            reel5.setTexture(symb[reelarray[4]]);

            reel1.y += 10;
            reel2.y += 10;
            reel3.y += 10;
            reel4.y += 10;
            reel5.y += 10;
            requestAnimationFrame(spingame);
            refresh();
        }
    }
}

function rng(){
   rngNumber = Math.floor((Math.random()*5));
}

function reelSet(){

    for (var i = 0; i < 15; i++) {

        rng();
        reelarray[i] = rngNumber;
        console.log(reelarray);
    }
}