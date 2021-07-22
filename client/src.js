import {translateXY, translateXYtoGrid} from "/client/translateXY.js"
import {createLudoWS} from "/client/LudoWebsocket.js";
import {mainBoard} from "/client/Board.js";
const diceMsg = 1
const moveMsg = 2

export function openPage(){
    let query = getCookie("query")
    if (query !== ""){
        websocket = createLudoWS(query)
    }
}


function onLudoRegisterOpen(e){

}
function onLudoRegisterMessage(e){
    let view = new DataView(e.data);
    let td = new TextDecoder();
    let text = td.decode(e.data.slice(1))
    console.log('rcvd: ' + text)
    switch (view.getUint8(0)) {
        case 1:
            setCookie("query",text,0.25)
            document.getElementById("invitation").value = text
            break
        case 0:
            alert("Błąd")
            break
        case 4:
            alert("Nieprawidłowy numer kontrolny")
            break
        case 2:
            alert("Nazwa gry zajęta")
            break
        case 3:
            alert("Nazwa gry już nie istnieje")
            break
    }
    websocket.close()
    openPage()

}
function onLudoRegisterError(e){

}
function onLudoRegisterClose(e){

}


export function initReg(query){
    websocket = new WebSocket("ws://192.168.1.7:1337/websockets/ludoRegister"+query)
    websocket.binaryType = "arraybuffer"
    websocket.onclose = onLudoRegisterClose
    websocket.onerror = onLudoRegisterError
    websocket.onopen = onLudoRegisterOpen
    websocket.onmessage = onLudoRegisterMessage
    return websocket;
}



let websocket;
let b = 40
let can = document.getElementById("canvas_game")
export let ctx;
ctx = can.getContext('2d');

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function newGame(){
    if (websocket != null) websocket.close()
    let query = "?option=newgame&game="+document.getElementById("game").value+"&players="+document.getElementById("players").value
    initReg(query)
}
export function exists(){
    if (websocket != null) websocket.close()
    let query = document.getElementById("invitation").value;
    initReg(query)
}


export function clickCanvas(e){
    let square = translateXY(e.offsetX,e.offsetY);
    if(square!==1337){
        if(mainBoard !=null) mainBoard.click(square, websocket)
    }
}
function roll(){
    let msg = new Uint8Array([1,mainBoard.myID])
    document.getElementById("rolled").value = 'rzucono'
    websocket.send(msg.buffer)
}
function load() {
    openPage()
    if(mainBoard !=null) mainBoard.draw()
    can.onclick = clickCanvas
    document.getElementById("invitation_btn").onclick = exists
    document.getElementById("players_btn").onclick = newGame
    document.getElementById("roll_btn").onclick = roll
}

document.body.onload = load
