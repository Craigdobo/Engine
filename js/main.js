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
            .add(["img/background.png", "img/buttons/home.png", "img/quitgame.png", "img/buttons/no.png", "img/buttons/yes.png"])
            .on("complete", assetLoad)
            .load();

        refresh();
    }
}

function assetLoad() {

    var background = new PIXI.Sprite(PIXI.loader.resources["img/background.png"].texture);
    background.scale.set(window.innerWidth / 1280, window.innerHeight / 720);
    background.position.set(0,0);

    var homeBtn = new PIXI.Sprite(PIXI.loader.resources["img/buttons/home.png"].texture);
    homeBtn.scale.set(0.5,0.5);
    homeBtn.position.set(window.innerWidth / 1.05, window.innerHeight / 75);
    homeBtn.interactive = true;
    homeBtn.buttonMode = true;

    homeBtn.mousedown = function (mouseData){
      homeBtn.scale.set(0.48,0.48);
      homeBtn.position.set(window.innerWidth / 1.05, window.innerHeight / 75);
      refresh();
    };

    homeBtn.mouseup = function (mouseData) {
    homeBtn.scale.set(0.5,0.5);
    homeBtn.position.set(window.innerWidth / 1.05, window.innerHeight / 75);
    stage.addChild(quitDialog, quitYes, quitNo);
    homeBtn.interactive = false;
    refresh();
    };

    var quitDialog = new PIXI.Sprite(PIXI.loader.resources["img/quitgame.png"].texture);
    quitDialog.scale.set(0.75,0.75);
    quitDialog.position.set(window.innerWidth / 3, window.innerHeight / 3);
    var quitYes = new PIXI.Sprite(PIXI.loader.resources["img/buttons/yes.png"].texture);
    quitYes.scale.set(0.5,0.5);
    quitYes.position.set(500,425);
    quitYes.interactive = true;
    quitYes.buttonMode = true;
    quitYes.mousedown = function (mouseData){
        quitYes.scale.set(0.48,0.48);
        quitYes.position.set(501,424);
        refresh();
    };
    quitYes.mouseup = function (mouseData){
        window.location.href = 'https://vegas.williamhill.com/en-gb/';
    };

    var quitNo = new PIXI.Sprite(PIXI.loader.resources["img/buttons/no.png"].texture);
    quitNo.scale.set(0.5,0.5);
    quitNo.position.set(750,425);
    quitNo.interactive = true;
    quitNo.buttonMode = true;
    quitNo.mousedown = function (mouseData){
        quitNo.scale.set(0.48,0.48);
        quitNo.position.set(751,424);
        refresh();
    };
    quitNo.mouseup = function (mouseData){
        stage.removeChild(quitDialog, quitYes, quitNo);
        homeBtn.interactive = true;
        refresh();
    };

    stage.addChild(background, homeBtn);
    refresh();

}

function refresh(){
    renderer.render(stage);
}