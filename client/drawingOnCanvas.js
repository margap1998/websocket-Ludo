import {ctx} from "/client/src.js";
let b = 40

export let green = 0;
export let red = 1;
export let blue = 2;
export let yellow = 3;
export function square(colorIn, colorOut, x,y){
    ctx.fillStyle = colorIn
    ctx.fillRect(x,y,b,b)
    ctx.fillStyle = colorOut
    ctx.strokeRect(x,y,b,b)

}

export function getPawnColor(id_color){
    switch (id_color) {
        case green:
            return  'lightgreen'; break;
        case red:
            return  'firebrick'; break;
        case blue:
            return  'lightblue'; break;
        case yellow:
            return  'khaki'; break;
        default:
            return 'yellowgreen'
    }
}

export function drawGreen(){
    square('green','black',13*b,3*b,b)
    square('green','black',13*b,2*b,b)
    square('green','black',12*b,3*b,b)
    square('green','black',12*b,2*b,b)
    for(let i = 0; i<5; i++){
        square('green','black',9*b,b+i*b,b)
        square('lightgrey','black',10*b,b+i*b,b)
        square('lightgrey','black',8*b,b+i*b,b)
    }
    square('green','black',10*b,0,b)
    square('lightgrey','black',9*b,0,b)
    square('lightgrey','black',8*b,0,b)

}
export function drawRed(){
    square('red','black',13*b,9*b,b)
    square('red','black',13*b,10*b,b)
    square('red','black',12*b,9*b,b)
    square('red','black',12*b,10*b,b)

    square('red','black',15*b,7*b,b)
    square('lightgrey','black',15*b,6*b,b)
    square('lightgrey','black',15*b,5*b,b)
    for(let i = 0; i<5; i++){
        square('red','black',10*b+i*b,6*b,b)
        square('lightgrey','black',10*b+i*b,7*b,b)
        square('lightgrey','black',10*b+i*b,5*b,b)
    }

}
export function drawYellow(){
    square('yellow','black',5*b,3*b,b)
    square('yellow','black',5*b,2*b,b)
    square('yellow','black',6*b,3*b,b)
    square('yellow','black',6*b,2*b,b)
    square('yellow','black',3*b,5*b,b)
    square('lightgrey','black',3*b,6*b,b)
    square('lightgrey','black',3*b,7*b,b)
    for(let i = 0; i<5; i++){
        square('yellow','black',8*b-i*b,6*b,b)
        square('lightgrey','black',8*b-i*b,7*b,b)
        square('lightgrey','black',8*b-i*b,5*b,b)
    }

}

export function drawBlue(){
    square('blue','black',6*b,9*b,b)
    square('blue','black',6*b,10*b,b)
    square('blue','black',5*b,9*b,b)
    square('blue','black',5*b,10*b,b)
    square('blue','black',8*b,12*b,b)
    square('lightgrey','black',9*b,12*b,b)
    square('lightgrey','black',10*b,12*b,b)
    for(let i = 0; i<5; i++){
        square('blue','black',9*b,7*b+i*b,b)
        square('lightgrey','black',10*b,7*b+i*b,b)
        square('lightgrey','black',8*b,7*b+i*b,b)
    }

}
export function draw() {
    drawGreen()
    drawRed()
    drawYellow()
    drawBlue()
}

export function drawPawn(color, x , y){
    ctx.beginPath()
    let cX = b/2 +Math.floor(x/40) * 40
    let cY = b/2 +Math.floor(y/40) * 40
    ctx.fillStyle = color
    ctx.strokeStyle = 'black'
    ctx.arc(cX,cY,b/2,0,2*Math.PI)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
}
