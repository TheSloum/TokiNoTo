(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d"),


    width = 960,
    height = 850,
    player = { //définition du bloc joueur,  ne le dessine pas, mais définit sa localisation de base avec x et y et sa taille avec width height
        x: 25,
        y: 800,
        width: 30,
        height: 50,
        speed: 5, //puissance de saut
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
        color: 'gray'
    },
    hit = {
        x: 25,
        y: 800,
        width: 100,
        height: 50,
        color: 'red',
        texte: '-10'
    }
    
wrong = {
    x: 25,
    y: 800,
    width: 100,
    height: 50,
    color: 'red',
    texte: '-20'
}
nice = {
    x: 25,
    y: 800,
    width: 100,
    height: 50,
    color: 'lime',
    texte: '+10'
}
ennemi = [],

    trampolin = {
        x: 862,
        y: 90 + 640 + 40,
        width: 100,
        height: 20,
    }

switcher = [],
    keys = [],
    friction = .9,
    gravity = .4;
//variable de si l'ennemi 1 est touché
var boxes = [];
let stun = 0;// valeur pour voir si le joueur puet bouger (0 == le joueur peut bouger )
// dimensions
ennemi.push({
    x: 100,
    y: 130 + 40,
    width: 75,
    height: 75,
});
ennemi.push({
    x: 420,
    y: 300 + 40,
    width: 75,
    height: 75,
});
ennemi.push({
    x: 30,
    y: 2,
    width: 75,
    height: 75,
});
boxes.push({ // ???
    x: 0,
    y: 0,
    width: 10,
    height: height
});
boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50
});
boxes.push({
    x: width - 10,
    y: 0,
    width: 50,
    height: height
});

boxes.push({ //définit les boites plateformes
    x: 750,
    y: 90 + 660 + 40,
    width: 960 - 750,
    height: 80
});
boxes.push({
    x: 0,
    y: 90 + 550 + 40,
    width: 700,
    height: 30
});
boxes.push({
    x: 700,
    y: 90 + 40,
    width: 30,
    height: 90 + 350
});
boxes.push({
    x: 0,
    y: 90 + 40,
    width: 730,
    height: 30
});
boxes.push({
    x: 0,
    y: 470 + 40,
    width: 250,
    height: 30
});
boxes.push({
    x: 350,
    y: 570 + 40,
    width: 100,
    height: 70,
    color: 'cyan'
});
boxes.push({
    x: 0,
    y: 370 + 40,
    width: 80,
    height: 30
});
boxes.push({
    x: 190,
    y: 300 + 40,
    width: 230,
    height: 30
});
boxes.push({
    x: 0,
    y: 260 + 40,
    width: 80,
    height: 30
});
boxes.push({
    x: 190,
    y: 190 + 40,
    width: 200,
    height: 30
});
boxes.push({
    x: 390,
    y: 190 + 40,
    width: 30,
    height: 270
});
boxes.push({
    x: 480,
    y: 400 + 40,
    width: 250,
    height: 30
});
boxes.push({
    x: 550,
    y: 120 + 40,
    width: 30,
    height: 70
});
boxes.push({
    x: 630,
    y: 300 + 40,
    width: 70,
    height: 30,
    color: 'yellow',
});
boxes.push({
    x: 730,
    y: 500 + 40,
    width: 100,
    height: 30,
    color: 'magenta',
});
boxes.push({
    x: 120,
    y: 800 + 40,
    width: 50,
    height: 50,
    color: 'yellow'
});
boxes.push({
    x: 340,
    y: 800 + 40,
    width: 50,
    height: 50,
    color: 'yellow'

});
boxes.push({
    x: 560,
    y: 800 + 40,
    width: 50,
    height: 50,
    color: 'yellow'

});
boxes.push({
    x: 120,
    y: 80,
    width: 20,
    height: 70,
    color: 'yellow'

});
boxes.push({
    x: 240,
    y: 80,
    width: 20,
    height: 70,
    color: 'yellow'

});
boxes.push({
    x: 360,
    y: 80,
    width: 20,
    height: 70,
    color: 'yellow'

});
boxes.push({
    x: 480,
    y: 80,
    width: 20,
    height: 70,
    color: 'yellow'

});
boxes.push({
    x: 600,
    y: 80,
    width: 20,
    height: 70,
    color: 'yellow'

});
boxes.push({
    x: 710,
    y: 80,
    width: 20,
    height: 70,
    color: 'yellow'

});
switcher.push({
    x: 30,
    y: 600,
    width: 50,
    height: 50,
    color: 'cyan'
})
switcher.push({
    x: 330,
    y: 275,
    width: 50,
    height: 50,
    color: 'yellow'
})
switcher.push({
    x: 640,
    y: 380,
    width: 50,
    height: 50,
    color: 'magenta'
})
sworditem = {
    x: 640,
    y: 180,
    width: 50,
    height: 50,
}
win = {
    x: 0,
    y: 0,
    width: 100,
    height: 30,
}

let perso = 'gray';
img = new Image();
img.src = 'igray.png';


let swordhave = 0; //si on a l'épée
let slashcoold = 0; //variable de cooldown de l'épee
let slash = 0; //variable de temps où l'épée fera des dégats
canvas.width = width;
canvas.height = height;
let directionp = 1; //si -1 le joueur face à gauche si 1, il face à droite
function swordslash() { //gère les physiques de dash avec l'épée
    if (slashcoold == 0) {//si le cooldown est complété
        if (directionp == 1) {//si le joueur face la droite
            player.velX = +player.velX + 5;//booste le houeur vers la droite en ajoutant 5 à la vitesse vers la droite
        }
        if (directionp == -1) {
            player.velX = +player.velX - 5;//booste le houeur vers la gauche en ajoutant -5 à la vitesse vers la droite
        }
        slash = 1;//à partir de ce moment, l'épée fait des dégats
        player.velY = 0;//annule la vélocité verticale du joueur
        slashcoold = 1;

        setTimeout(() => {//après ce Timeout, l'action de mettre le slash à 0 sera exécutée 
            slash = 0;
        }, 200);
        setTimeout(() => {
            slashcoold = 0;
        }, 800);
    }

}

const sleep = (milliseconds) => {//définit la fonction sleep car elle n'existe pas nativement dans javascript
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
let textaff = 0;
async function affhit() {
    if (textaff == 0) {
        ctx.font = "100px Arial";
        for (a = 1; a < 51; a++) {
            textaff = a;
            await sleep(10).then(() => { })
        } textaff = 0;
    }
}
let textaffw = 0;
async function affwrong() {
    if (textaffw == 0) {
        ctx.font = "100px Arial";
        for (a = 1; a < 51; a++) {
            textaffw = a;
            await sleep(5).then(() => { })
        } textaffw = 0;
    }
}
let textaffn = 0;
async function affnice() {
    if (textaffn == 0) {
        ctx.font = "100px Arial";
        for (a = 1; a < 51; a++) {
            textaffn = a;
            await sleep(5).then(() => { })
        } textaffn = 0;
    }
}



let enmouvaxeb = 0;
let enmouv = 0;//variable de si l'ennemi bouge (est à 0 quand la fonction est terminée pour ne pas que la fonction soit lancée infiniment
async function ennemimouv(enemi, dist) { // mouvements des ennemi1 si on veut mettre plus d'ennemi1, ajouter un paramètre (ex: 'type ennemi'), même principe pour si on veut l'axe x ou y,  et a distance à parcourir ex: (ennemi, axe, dist) la fonction est async car il y a un sleep
    enmouv = 1;
    for (u = 0; u <= dist; u++) {

        await sleep(5).then(() => {//appel de la fonction sleep
            enemi.y = +enemi.y + 1;
        })
    }
    await sleep(500).then(() => { }) //fonction pour  attendrer 500ms dans la fonction (ui c chiant)
    for (u = 0; u <= dist; u++) {
        //ici on remplacerait 'ennemi1' par le paramètre pour d'autres ennemi1
        await sleep(5).then(() => {
            enemi.y = +enemi.y - 1;
        })

    }
    await sleep(500).then(() => { })
    enmouv = 0;


}
let pauses = 0;
async function ennemimouvx(enemi, dist) { // mouvements des ennemi1 si on veut mettre plus d'ennemi1, ajouter un paramètre (ex: 'type ennemi'), même principe pour si on veut l'axe x ou y,  et a distance à parcourir ex: (ennemi, axe, dist) la fonction est async car il y a un sleep
    enmouvaxe = 1;
    for (g = 0; g <= dist; g++) {

        await sleep(5).then(() => {//appel de la fonction sleep
            enemi.x = +enemi.x + 1;
        })
    }
    await sleep(500).then(() => { }) //fonction pour  attendrer 500ms dans la fonction (ui c chiant)
    for (g = 0; g <= dist; g++) {
        //ici on remplacerait 'ennemi1' par le paramètre pour d'autres ennemi1
        await sleep(5).then(() => {
            enemi.x = +enemi.x - 1;
        })

    }
    await sleep(500).then(() => { })
    enmouvaxe = 0;


}
async function ennemimouvxb(enemi, dist) { // mouvements des ennemi1 si on veut mettre plus d'ennemi1, ajouter un paramètre (ex: 'type ennemi'), même principe pour si on veut l'axe x ou y,  et a distance à parcourir ex: (ennemi, axe, dist) la fonction est async car il y a un sleep
    enmouvaxeb = 1;
    for (m = 0; m <= dist; m++) {

        await sleep(5).then(() => {//appel de la fonction sleep
            enemi.x = +enemi.x + 1;
        })
    }
    await sleep(500).then(() => { }) //fonction pour  attendrer 500ms dans la fonction (ui c chiant)
    for (m = 0; m <= dist; m++) {
        //ici on remplacerait 'ennemi1' par le paramètre pour d'autres ennemi1
        await sleep(5).then(() => {
            enemi.x = +enemi.x - 1;
        })

    }
    await sleep(500).then(() => { })
    enmouvaxeb = 0;

}
function itemGet(object, swordr) {
    var vX = (object.x + (object.width / 2)) - (swordr.x + (swordr.width / 2)),
        vY = (object.y + (object.height / 2)) - (swordr.y + (swordr.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (object.width / 2) + (swordr.width / 2),
        hHeights = (object.height / 2) + (swordr.height / 2);
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        swordhave = 1;
    }
}
let switching = 0;
async function switchCheck(object, switche) {
    var vX = (object.x + (object.width / 2)) - (switche.x + (switche.width / 2)),
        vY = (object.y + (object.height / 2)) - (switche.y + (switche.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (object.width / 2) + (switche.width / 2),
        hHeights = (object.height / 2) + (switche.height / 2);
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        switching = 1;
        [object.color, switche.color] = [switche.color, object.color];
        perso = object.color;
        await sleep(1000).then(() => {
            switching = 0;
        }) //pour échanger deux valeurs
    }
}
let platf = 0
async function platmouv(plateforme, dist) {
    platf = 1;
    for (p = 0; p <= dist; p++) {

        await sleep(5).then(() => {//appel de la fonction sleep
            plateforme.y = +plateforme.y - 0.5;
            if (platp == 1) { player.y = +player.y - 0.5; }
        })
    }
    await sleep(1000).then(() => { }) //fonction pour  attendrer 500ms dans la fonction (ui c chiant)
    for (p = 0; p <= dist; p++) {
        //ici on remplacerait 'ennemi1' par le paramètre pour d'autres ennemi1
        await sleep(5).then(() => {
            plateforme.y = +plateforme.y + 0.5;
            if (platp == 1) { player.y = +player.y + 0.5; }
        })

    }
    await sleep(1000).then(() => { })
    platf = 0;
}
let enmouvaxe = 0;
let coold = 0;
async function dmg(shapeA, shapeB) {
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2);
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {

        stun = 1;
        coold = 1;
        if (vX > 0) {
            player.velX = -2;
            player.velY = -5;
        } else {
            player.velX = 2;

            player.velY = -5;

        }
        temps = temps - 10;
        await sleep(800).then(() => {
            stun = 0;
        })
        await sleep(500).then(() => {
            coold = 0;
        })
    }


}
let couCool = 0;
async function mauvaiseCoul(shapeA, shapeB) {
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2);
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        if (shapeA.color != shapeB.color) {
            couCool = 1;
            temps = +temps - 20;
            if (textaffw == 0) {
                affwrong();
            }
            await sleep(200).then(() => { couCool = 0; })
        }

    }
}

function finchrono() {
    if (temps == 0) {
        pauses = 1;
    }
}

function update() {//ce qui boucle indéfiniment je pense
    // check keys

    if (temps == 0) {
        finchrono()

    }
    if (pauses == 0) {


        if (stun == 0) {
            if (keys[38] || keys[32] || keys[87]) {
                // up arrow or space
                if (!player.jumping && player.grounded) {
                    player.jumping = true;
                    player.grounded = false;
                    player.velY = -player.speed * 2;
                }
            }
            if (keys[39] || keys[68]) {
                // right arrow
                if (player.velX < 10) {
                    player.velX++;
                }
                directionp = 1; // direction -1 = gauche 1 = droite
            }
            if (keys[37] || keys[65]) {
                // left arrow
                if (player.velX > -10) {
                    player.velX--;

                }
                directionp = -1; // direction -1 = gauche 1 = droite

            }
            if (swordhave == 1) {
                if (keys[71]) {
                    swordslash()

                }
            }
        }

        player.velX *= friction;
        player.velY += gravity;



        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        player.grounded = false;

        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].color === undefined) {
                ctx.fillStyle = 'black';
            } else {
                ctx.fillStyle = boxes[i].color;

                if (couCool == 0) {

                    mauvaiseCoul(boxes[i], player);
                }

            }

            ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

            var dir = colCheck(player, boxes[i]);

            if (dir === "l") { //Ce if réfère à où le joueur se fait toucher à sa gauche
                player.velX *= -1;
                player.jumping = false;
            }
            else if (dir === "r") { //Ce if réfère à où le joueur se fait toucher à sa droite
                player.velX *= -1;
                player.jumping = false;
            }
            else if (dir === "b") { //Ce if réfère à où le joueur se fait toucher en bas
                player.grounded = true;
                player.jumping = false;
            } else if (dir === "t") {//Ce if réfère à où le joueur se fait toucher en haut
                player.velY *= -1;
            }

        }

        let platp = 0;
        if (player.grounded) {//checke si le joueur est sur le sol
            player.velY = 0;
        }
        platCheck(player, boxes[17]);
        player.x += player.velX;
        player.y += player.velY;

        ctx.fill();//dessine le joueur aux positions et tailles du perso

        if (swordhave == 0) {
            itemGet(player, sworditem);
            ctx.fillStyle = 'red';
            ctx.fillRect(sworditem.x, sworditem.y, sworditem.width, sworditem.height);//dessine le joueur aux positions et tailles du perso

        }

        if (slash == 1) {
            ctx.fillStyle = "red";
            ctx.fillRect(player.x + (player.width * directionp), player.y, player.width, player.height);//dessine l'épée aux positions et tailles du perso plus 50 vers là où il face que si slash = 1
        }
        for (i = 0; i < switcher.length; i++) {

            if (switching == 0) { switchCheck(player, switcher[i]); }
            ctx.fillStyle = switcher[i].color;
            ctx.fillRect(switcher[i].x, switcher[i].y, switcher[i].width, switcher[i].height);
            
        }


        for (var i = 0; i < ennemi.length; i++) {
            if (ennemi[i].x < 1000) {
                ctx.fillStyle = "lime";
                ctx.fillRect(ennemi[i].x, ennemi[i].y, ennemi[i].width, ennemi[i].height); //dessine l'ennemi  si il n'a pas été touché

                if (enmouv == 0) {
                    ennemimouv(ennemi[0], 250);

                }
                if (enmouvaxe == 0) {
                    ennemimouvx(ennemi[1], 120)
                }

                if (enmouvaxeb == 0) {
                    ennemimouvxb(ennemi[2], 625)
                }
                if (coold == 0) { dmg(ennemi[i], player); if (stun == 1) { affhit(); } }
            }
        }

        swordCheck(ennemi[0], player);
        swordCheck(ennemi[1], player);
        swordCheck(ennemi[2], player);



        if (platf == 0) {
            platmouv(boxes[17], 820);
        }
        ctx.fillStyle = "green";
        ctx.fillRect(trampolin.x, trampolin.y, trampolin.width, trampolin.height);


        trampoCheck(trampolin, player)

        ctx.fillStyle = "white";
        ctx.fillRect(win.x, win.y, win.width, win.height);
        wincheck(win, player);

        if (textaff != 0) {
            ctx.globalAlpha = (1 - (textaff / 50))

            ctx.fillStyle = "red";
            ctx.fillText(hit.texte, (+player.x - 25), (+player.y - textaff), hit.width, hit.height);
        }
        if (textaffw != 0) {
            ctx.globalAlpha = (1 - (textaffw / 50))

            ctx.fillStyle = "red";
            ctx.fillText(wrong.texte, (+player.x - 25), (+player.y - textaffw), wrong.width, wrong.height);
        }
        if (textaffn != 0) {
            ctx.globalAlpha = (1 - (textaffn / 50))

            ctx.fillStyle = "lime";
            ctx.fillText(nice.texte, (+player.x - 25), (+player.y - textaffn), nice.width, nice.height);
        }
        ctx.globalAlpha = 1



    }

    img.src = perso + '.png';
    ctx.drawImage(img, ((player.x) - (player.width / 3)), player.y, 50, 55);
    
    ctx.restore();



    requestAnimationFrame(update);

}

function swordCheck(shapeA, shapeB) { //checke si deux objets se touchent et replace le joueur
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - ((shapeB.x + (player.width * directionp)) + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights && slash == 1) {
        shapeA.x = 10000;
        temps = +temps + 10;
        affnice();
    }
}
function wincheck(shapeA, shapeB) { //checke si deux objets se touchent et replace le joueur
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights ) {
        console.log("win");
        alert("GAME OVER!");
        
    }
}
function trampoCheck(shapeA, shapeB) { //checke si deux objets se touchent et replace le joueur
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        player.velY = -15;

    }
}

function platCheck(shapeA, shapeB) { //checke si deux objets se touchent et replace le joueur
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = ((shapeA.y + 1) + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        platp = 1;
    } else { platp = 0; }
}
function colCheck(shapeA, shapeB) { //checke si deux objets se touchent et replace le joueur
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load", function () {

    update();




});


const departMinutes = 0.99;
let temps = departMinutes * 60;
const timerElement = document.getElementById("timer")

var timer = setInterval(() => {
    let minutes = parseInt(temps / 60, 10)
    let secondes = parseInt(temps % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes

    timerElement.innerText = `${minutes}:${secondes}`
    temps = temps <= 0 ? 0 : temps - 1
}, 1000)
