//import Canvas2Image from "canvas2image-2";



function takeshot() {
    html2canvas(document.querySelector('canvas'), {
        onrendered: function(canvas) {
            // document.body.appendChild(canvas);
            return Canvas2Image.converttoPNG(canvas, 400, 450);
        }
    })
}

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        let newPosition = this.data.getLocalPosition(this.parent);
        if (keys["17"] == false) {
            newPosition.x = Math.floor(newPosition.x / 50) * 50;
            newPosition.y = Math.floor(newPosition.y / 50) * 50;
            console.log("the x & y positions " + newPosition.x + "STOP" + newPosition.y);
            // We have as human beings the capability to think hard about any solution !    
            if (removeDuplicate(newPosition.x, newPosition.y)) {
                let bunny = createMotif(newPosition.x, newPosition.y);
                app.stage.addChild(bunny);
                bunnies.push(bunny);
            }
            var n = bunnies.includes(bunny);
        } else {
            newPosition.x = Math.floor(newPosition.x / 50) * 50;
            newPosition.y = Math.floor(newPosition.y / 50) * 50;
            if (removeDuplicate(newPosition.x, newPosition.y)) {
                this.x = newPosition.x;
                this.y = newPosition.y;
            }
        }
    }

}

function removeDuplicate(x, y) {
    for (const element of bunnies) {
        if (x == element.x && y == element.y) {
            return false
        }
    }
    return true;
}

function keyup(e) {
    /*while(window.event.ctrlKey){
        const newPosition = this.data.getLocalPosition(this.parent);
        newPosition.x = Math.floor(newPosition.x / 100 );
        newPosition.y = Math.floor(newPosition.y / 100 );
        createMotif(newPosition.x,newPosition.y);  
    }*/
    keys[e.keyCode] = true;
}

function keydownStart(event) {
    this.data = event.data;
    this.click = true;
}

function keydownEnd(event) {
    this.data = event.data;
    this.click = false;
}

function keydown(e) {
    keys[e.keyCode] = false;
    //if (!keys["17"]) {
    //onDragMove()
}

function gameLoop(delta) {
    keysDiv.innerHTML = JSON.stringify(keys);
}

function takeshot() {

    html2canvas(document.querySelector('canvas'), {
        onrendered: function(canvas) {
            // document.body.appendChild(canvas);

            return Canvas2Image.saveAsPNG(canvas, 800, 600);
        }
    })
}

function createMotif(x, y) {
    var bunny = new PIXI.Sprite.from("modeles/moselle.png");
    bunny.height = 50;
    bunny.width = 50;
    bunny.anchor.set(0.0);
    bunny.x = x;
    bunny.y = y;
    bunny.interactive = true;
    bunny.buttonMode = true;
    app.stage.addChild(bunny);
    window.addEventListener("keyup", keyup);
    window.addEventListener("keydown", keydown);
    window.addEventListener("keydownstart", keydownStart);
    window.addEventListener("keydownend", keydownEnd);
    app.ticker.add(gameLoop);
    keysDiv = document.querySelector("#keys");
    bunny
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove)
        .on('keyup', keyup)
        .on('keydown', keydown)
        .on('keydownstart', keydownStart)
        .on('keydownend', keydownEnd)
        .on('pointerdownkey', keydownStart)
        .on('pointerupkey', keydownEnd);
    return bunny;
}

function generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
    });
}