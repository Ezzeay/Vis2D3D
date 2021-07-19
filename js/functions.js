//mport Canvas2Image from "canvas2image-2";





function takeshot() {
    html2canvas(document.getElementsByClassName('canvas'), {

        onrendered: function(canvas) {

            return Canvas2Image.converttoPNG(canvas, 400, 450);
        }
    })
}

function tooltip(event) {
    this.data = event.data;
    this.id = event.data.pointerId;
    console.log(this.data);
    var newPosition = this.data.getLocalPosition(this.parent);
    $('.rightClick').removeClass('showing');
    $('.rightClick').removeClass('.buttons');
    newPosition.x = Math.floor(newPosition.x / 25) * 25;
    newPosition.y = Math.floor(newPosition.y / 25) * 25;
    var n = $('.rightClick').clone(false);
    $('.rightClick').fadeOut(350);
    //console.log($('.rightClick').parent().removeClass('showing'));
    setTimeout(function() {
        $('.rightClick').css({
            top: Math.floor(newPosition.y / 50) * 50 - 300 // Y
                ,
            left: Math.floor(newPosition.x / 50) * 50 + 650 // Y
                ,
        }).fadeIn(100).addClass('showing');
    }, 600);
    $('.rightClick .delete').click(function() {
        DeleteStuff(newPosition.x, newPosition.y);
        $('.rightClick').removeClass('showing').fadeOut(400);
        $('.rightClick').removeClass('showing');
    });
    $('.rightClick .rotate').click(function() {
        rotateMotif(newPosition.x, newPosition.y);
        $('.rightClick').removeClass('showing').fadeOut(400);
        $('.rightClick').removeClass('showing');

    });
    setTimeout(function() {
        $('.rightClick').removeClass('showing').fadeOut(400);
        //$('.rightClick').closest().removeChild();
        console.log($('.rightClick').closest());
        console.log($('.rightClick').closest().remove());
        $('.rightClick').removeClass('showing');
        $('.rightClick').removeClass('buttons').fadeOut(400);
        //console.log($('.rightClick').removeClass('rightClick showing'));
    }, 6000);

}

function gameLoop(delta) {
    keysDiv.innerHTML = JSON.stringify(keys);
}

function createMotif(x, y, string) {
    var bunny = new PIXI.Sprite.from(string);
    bunny.name = string;
    bunny.height = 50;
    bunny.width = 50;
    bunny.anchor.set(0.5);
    bunny.x = x;
    bunny.y = y;
    bunny.visibility = true;
    bunny.interactive = true;
    window.addEventListener("keyup", keyup);
    window.addEventListener("keydown", keydown);
    window.addEventListener("keydownstart", keydownStart);
    window.addEventListener("keydownend", keydownEnd);
    keysDiv = document.querySelector("#keys");
    bunny
        .on("click", tooltip)
        .on("mouseup", tooltipoff)
        .on("mouseover", bunnyhigh)
        .on('pointerup', onDragEnd)
        .on('pointerdown', onDragStart)
        .on('pointermove', onDragMove)
        .on('pointerdownkey', keydownStart)
        .on('pointerupkey', keydownEnd)
        .on("mousedown", tooltipon)
    return bunny;
}



function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.mousePressPoint = [];
    this.mousePressPoint[0] = this.data.getLocalPosition(this.parent).x;
    this.mousePressPoint[1] = this.data.getLocalPosition(this.parent).y;
    this.dragging = true;
}

function onDragEnd() {
    this.dragging = false;
    this.data = null;
}

function tooltipon(event) {
    this.data = event.data;
    this.tooltip = false;
}

function tooltipoff(event) {
    this.data = null;
    this.tooltip = true;
}

function onDragMove() {
    //
    if (this.dragging) {

        var position = this.data.getLocalPosition(this.parent);
        this.position.x = (position.x);
        this.position.y = (position.y);
        this.position.x = Math.floor(this.position.x / 25) * 25;
        this.position.y = Math.floor(this.position.y / 25) * 25;
        const string = getName(this.position.x, this.position.y);

        if (!removeDuplicate(this.position.x, this.position.y)) {
            if (keys["17"] == false) {
                console.log(keys);
                this.position.x = Math.floor(this.position.x / 25) * 25;
                this.position.y = Math.floor(this.position.y / 25) * 25;
                if (!removeDuplicate(this.position.x, this.position.y)) {
                    var newbunny = createMotif(this.position.x, this.position.y, string);
                    console.log(newbunny);
                    bunnies.push(newbunny);
                    app.stage.addChild(newbunny);
                    if (removeDuplicate(this.position.x, this.position.y)) {
                        DeleteStuff(this.position.x, this.position.y);
                    };
                }

                var n = bunnies.includes(this.bunny);
            } else {
                this.x = this.position.x;
                this.y = this.position.y;

            }
        }
    }
}

function removeDuplicate(x, y) {
    x = Math.floor(x / 25) * 25;
    y = Math.floor(y / 25) * 25;
    for (const element of bunnies) {
        if (x == element.x && y == element.y) {
            return false;
        }
    }
    return true;
}

function getName(x, y) {
    x = Math.floor(x / 25) * 25;
    y = Math.floor(y / 25) * 25;
    for (const element of bunnies) {
        if (x == element.x && y == element.y) {
            return element.name;
        }
    }
}

function DeleteStuff(x, y) {
    x = Math.floor(x / 25) * 25;
    y = Math.floor(y / 25) * 25;
    for (var step = 0; step < bunnies.length; step++) {
        if (bunnies[step].x == x && bunnies[step].y == y) {
            app.stage.removeChild(bunnies[step]);
            bunnies[step].destroy();
            bunnies.splice(step, 1);
        }
    }
}

function keyup(e) {
    keys[e.keyCode] = true;
}





function rotateMotif(x, y) {
    x = Math.floor(x / 25) * 25;
    y = Math.floor(y / 25) * 25;

    for (var step = 0; step < bunnies.length; step++) {

        if (bunnies[step].x == x && bunnies[step].y == y) {
            bunnies[step].rotation += Math.PI * 2 * 0.125;
        }
    }

}

function keydownStart(event) {
    this.data = event.dataset;
}

function keydownEnd(event) {
    this.data = event.data;
}

function bunnyhigh(event) {
    this.data = event.data;
    var colorMatrix = new PIXI.filters.ColorMatrixFilter();
    event.target.filters = [colorMatrix];
    colorMatrix.blackAndWhite(0);
    timer = setTimeout(function() {
        colorMatrix.reset();
    }, 300);
}




function keydown(e) {
    keys[e.keyCode] = false;
    //if (!keys["17"]) {
    //onDragMove()
}



function takeshot() {
    html2canvas(document.querySelector('canvas'), {
        onrendered: function(canvas) {
            console.log(document.querySelector('canvas'));

            return Canvas2Image.saveAsPNG(canvas, 800, 600);
        }
    });
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




function updateMotif(delta) {
    for (var i = 0; i < bunnies.length; i++) {
        app.stage.addChild(bunnies[i]);
    }
}

function folderclick() {

    var targList = document.getElementsByClassName("mine");
    if (targList) {
        for (var x = 0; x < targList.length; x++) {
            if (targList[x].style.visibility == "hidden") {
                targList[x].style.visibility = "visible";
            } else {
                targList[x].style.visibility = 'hidden';
            }
        }
    }
}

function loadpic() {
    var mylist = document.getElementsByClassName('mine2');
    var mylist2 = document.getElementsByClassName('mine');
    var id = 0;
    try {
        if (id == 3) {
            id = 0;
            let string = list[Math.floor(id)].img_src;
            bunnies.push(createMotif(25, 25, string));
            app.stage.addChild(bunnies[bunnies.length - 1]);
            id++;
        }
        if (id < 3) {
            let string = list[Math.floor(id)].img_src;
            bunnies.push(createMotif(25, 25, string));
            app.stage.addChild(bunnies[bunnies.length - 1]);
            id++;
        }
    } catch (e) {
        console.log("YO", e);
    }
}

function addClickHandler(elem, arg1, arg2) {
    id = arg2;
    elem.addEventListener('click', function(e) {
        try {
            if (id == 3) {
                id = 0;
                let string = list[Math.floor(id)].img_src;
                bunnies.push(createMotif(25, 25, string));
                app.stage.addChild(bunnies[bunnies.length - 1]);
                id++;
            }
            if (id < 3) {
                let string = list[Math.floor(id)].img_src;
                bunnies.push(createMotif(25, 25, string));
                app.stage.addChild(bunnies[bunnies.length - 1]);
                id++;
            }
        } catch (e) {
            console.log("YO", e);
        };


    }, false);
}





function start() {

    window.onload = load;
    if (window.addEventListener) {
        window.addEventListener('load', load);
    } else if (window.attachEvent) { window.attachEvent('onload', load); }

    //window.addEventListener('load', load);
}

function loadimage() {
    var ctx = document.getElementById('painting');
    console.log(ctx);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img1 = new Image();
        img1.src = 'modeles/echoppe.png';
        img1.onload = function() {
            //draw background image
            ctx.drawimage(img1, 0, 0);
            //draw a box over the top
            ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
            ctx.fillRect(0, 0, 500, 500);
        };
    }
}