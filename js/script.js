function load() {
    var app;
    var container;
    var player;
    var grid;
    var bunny;
    var bunnies = [];
    var pi = 0;
    var keys = {};
    var keysDiv;
    app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0x303030,
        forceCanvas: true,
        resolution: window.devicePixelRatio || 1,
        antialiasing: true,
        transparent: false,
        preserveDrawingBuffer: true, // This is very important for us !
        autoDensity: true
    });
    document.body.appendChild(app.view);
    var grid = new PixiJSGrid(800).drawGrid();
    container = new PIXI.Container();
    app.stage.addChild(container);
    app.stage.addChild(grid);
    //container.addChild(grid);
    var mylist = document.getElementsByClassName('mine2');
    var mylist2 = document.getElementsByClassName('mine');
    for (var i = 0; i < 50; i++) {
        var xtmp = Math.floor(i / 25) * 25;
        var ytmp = Math.floor(i / 25) * 25;
        bunnies.push(createMotif(xtmp, ytmp, '/modeles/belle-epoque.png'));
        app.stage.addChild(bunnies[i]);
    }
    for (var i = 0; i < mylist.length; i++) {
        mylist[i].addEventListener("click", folderclick);
    };

}


// PAINTING THE MODELS : 
//var mug = document.getElementsByClassName("canvas");
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.id = "Paint";
var originalPixels = null;
var currentPixels = null;

function HexToRGB(Hex) {
    var Long = parseInt(Hex.replace(/^#/, ""), 16);
    return {
        R: (Long >>> 16) & 0xff,
        G: (Long >>> 8) & 0xff,
        B: Long & 0xff
    };
}

function changeMugsColor() {
    for (var ii = 0; ii < mug.length; ii++) {
        changeColor(mug[ii]);
    }
}

function changeColor(amug) {
    if (!originalPixels) return; // Check if image has loaded
    var newColor = HexToRGB(document.getElementById("color").value);

    for (var I = 0, L = originalPixels.data.length; I < L; I += 4) {
        if (currentPixels.data[I + 3] > 0) {
            currentPixels.data[I] = originalPixels.data[I] / 255 * newColor.R;
            currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * newColor.G;
            currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * newColor.B;
        }
    }

    ctx.putImageData(currentPixels, 0, 0);
    amug.src = canvas.toDataURL("image/png");


}

function getPixels(img) {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
    originalPixels = ctx.getImageData(0, 0, img.width, img.height);
    currentPixels = ctx.getImageData(0, 0, img.width, img.height);

    img.onload = null;
}