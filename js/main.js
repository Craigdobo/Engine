/**
 * Created by cturner on 07/08/2017.
 */
var stage;
var renderer;
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
            "img/buttons/spin.png", "img/buttons/stakefield.png", "img/buttons/up.png", "img/buttons/down.png"])
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
        refresh();
    };

    var spin = new PIXI.Sprite(PIXI.loader.resources["img/buttons/spin.png"].texture);
    spin.scale.set(renderer.width / 3000, renderer.width / 3000);
    spin.position.set(renderer.width / 1.2, renderer.height / 2.2);
    spin.interactive = true;
    spin.buttonMode = true;

    var stake = new PIXI.Sprite(PIXI.loader.resources["img/buttons/stakefield.png"].texture);
    stake.scale.set(renderer.width / 3500, renderer.width / 3500);
    stake.position.set(renderer.width / 50 , renderer.height / 2);

    var up = new PIXI.Sprite(PIXI.loader.resources["img/buttons/up.png"].texture);
    up.scale.set(renderer.width / 3500, renderer.width / 3500);
    up.position.set(renderer.width / 35 , renderer.height / 2.5);

    var down = new PIXI.Sprite(PIXI.loader.resources["img/buttons/down.png"].texture);
    down.scale.set(renderer.width / 3500, renderer.width / 3500);
    down.position.set(renderer.width / 35 , renderer.height / 1.55);

    stage.addChild(background, homeBtn, spin, stake, up, down);
    refresh();

}

function refresh(){
    renderer.render(stage);
}