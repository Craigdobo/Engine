/**
 * Created by cturner on 07/08/2017.
 */
var stage;
var balance = 200.00;
var balanceTxt;
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
var reelcount = 0;
var reel = [];
var reelarray = [];
var symb = [];
var rngNumber;
var rowNo;
var anispeed = 15;
var winlines = [[0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [0,1,7,3,4], [10,11,5,13,14], [0,1,2,8,9], [10,11,12,8,9],
                [0,6,12,8,4], [10,6,2,8,13], [0,1,7,13,14], [10,11,7,3,4]];
var winnings;

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

    balanceTxt = new PIXI.Text("£" + balance.toFixed(2),{fontFamily: "Arial", fill: 0xFFFFFF, fontSize: 40, align: 'left'});
    balanceTxt.anchor.set(0,0);
    balanceTxt.position.set(530,20);
    background.addChild(balanceTxt);

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
        balance = balance - availStakes[stakepos];
        console.log(balanceTxt.text);
        balanceUpdate();
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
    initreel();

    for (var i = 0 ; i < 15; i++) {

    reel[i] = new PIXI.Sprite(symb[reelarray[i]]);

    }

    reel[0].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[0].position.set(renderer.width / 5 , renderer.height / 5);

    reel[1].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[1].position.set(renderer.width / 3.2 , renderer.height / 5);

    reel[2].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[2].position.set(renderer.width / 2.3 , renderer.height / 5);

    reel[3].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[3].position.set(renderer.width / 1.8 , renderer.height / 5);

    reel[4].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[4].position.set(renderer.width / 1.5 , renderer.height / 5);

    reel[5].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[5].position.set(renderer.width / 5 , renderer.height / 2.2);

    reel[6].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[6].position.set(renderer.width / 3.2 , renderer.height / 2.2);

    reel[7].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[7].position.set(renderer.width / 2.3 , renderer.height / 2.2);

    reel[8].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[8].position.set(renderer.width / 1.8 , renderer.height / 2.2);

    reel[9].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[9].position.set(renderer.width / 1.5 , renderer.height / 2.2);

    reel[10].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[10].position.set(renderer.width / 5 , renderer.height / 1.4);

    reel[11].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[11].position.set(renderer.width / 3.2 , renderer.height / 1.4);

    reel[12].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[12].position.set(renderer.width / 2.3 , renderer.height / 1.4);

    reel[13].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[13].position.set(renderer.width / 1.8 , renderer.height / 1.4);

    reel[14].scale.set(renderer.width / 3500, renderer.width / 3500);
    reel[14].position.set(renderer.width / 1.5 , renderer.height / 1.4);

    stage.addChild(background, homeBtn, spin, stake, up, down);
    for (var i = 0 ; i < 15; i++){
        stage.addChild(reel[i]);
        refresh();
    }
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

    if (reelcount === 2){
        if((reel[0].y >= renderer.height / 5) && (reel[5].y >= renderer.height / 2.2) && (reel[10].y >= renderer.height / 1.5)){

            cancelAnimationFrame(spingame);
            reelcount = 0;
            console.log(reelarray);
            checkwinnings();
            balanceUpdate();
            refresh();
        }
        else{
            for (var i = 0; i < 15; i++){
                reel[i].y += anispeed;
            }

            requestAnimationFrame(spingame);
            refresh();
        }
    }

    else if (reel[0].y >= renderer.height / 1) {
            cancelAnimationFrame(spingame);
            rowNo = 5;
            reelSet();
            for (var i = 0; i < 5; i++) {
                reel[i].y = renderer.height / 5;
            }
            refresh();
            spingame();
            reelcount = reelcount + 1;
        }
        else if (reel[5].y >= renderer.height / 1) {
                cancelAnimationFrame(spingame);
                rowNo = 10;
                reelSet();
                for (var i = 5; i < 10; i++) {
                    reel[i].y = renderer.height / 5;
                }
                refresh();
                spingame();
            }
            else if (reel[10].y >= renderer.height / 1) {
                    cancelAnimationFrame(spingame);
                    rowNo = 15;
                    reelSet();
                    for (var i = 10; i < 15; i++) {
                        reel[i].y = renderer.height / 5;
                    }
                    refresh();
                    spingame();
                }

        else{
                for (var i = 0; i < 15; i++) {
                    reel[i].setTexture(symb[reelarray[i]]);

                    reel[i].y += anispeed;
                }
                requestAnimationFrame(spingame);
                refresh();
            }
}

function rng(){
   rngNumber = Math.floor((Math.random()*5));
}

function initreel(){
    for (var i = 0; i < 15; i++) {

        rng();
        reelarray[i] = rngNumber;
        console.log(reelarray);
    }

}

function reelSet(){

    for (var i = rowNo - 5; i < rowNo; i++) {

        rng();
        reelarray[i] = rngNumber;
    }
}

function checkwinnings(){
    winnings = 0.00;
    for (var i = 0; i < winlines.length ; i++){
        if ((reelarray[winlines[i][0]] === reelarray[winlines[i][1]]) && (reelarray[winlines[i][1]] === reelarray[winlines[i][2]]) && (reelarray[winlines[i][2]] !== reelarray[winlines[i][3]])){
            console.log("3 of a kind");
            winnings = winnings + (availStakes[stakepos] * 5);
        }
        else if ((reelarray[winlines[i][0]] === reelarray[winlines[i][1]]) && (reelarray[winlines[i][1]] === reelarray[winlines[i][2]]) && (reelarray[winlines[i][2]] === reelarray[winlines[i][3]])
            && (reelarray[winlines[i][3]] !== reelarray[winlines[i][4]])){
            console.log("4 of a kind");
            winnings  = winnings + (availStakes[stakepos] * 10);
        }
        else if ((reelarray[winlines[i][0]] === reelarray[winlines[i][1]]) && (reelarray[winlines[i][1]] === reelarray[winlines[i][2]])
                && (reelarray[winlines[i][2]] === reelarray[winlines[i][3]]) && (reelarray[winlines[i][3]] === reelarray[winlines[i][4]])){

            console.log("5 of a kind");
            winnings  = winnings + (availStakes[stakepos] * 20);

        }
        else{
            console.log("Better luck next time");
        }

    }
    balance = balance + winnings;
    console.log(balance);
    refresh();
}

function balanceUpdate(){
    balanceTxt.text = "£" + balance.toFixed(2);
}