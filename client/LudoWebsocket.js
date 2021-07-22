import {initBoard, mainBoard} from "/client/Board.js";

const noGame = 0;
const newState = 1;
const cnFail = 2;
const diceOK = 3;
const winner = 4;
const IDKWhat = 5;
const who = 6;

export function onLudoOpen(e){

}
function getColor(id_color){
    switch (id_color) {
        case 0:
            return  'zielonego'; break;
        case 1:
            return  'czerwonego'; break;
        case 2:
            return  'niebieskiego'; break;
        case 3:
            return  'żółtego'; break;
        default:
            return 'jakiegoś'
    }
}
export function onLudoMessage(e){
    let dv = new DataView(e.data)
    switch (dv.getUint8(0)) {
        case noGame:
            alert("Nie ma takiej gry")
            break
        case newState:
            console.log(e.data)
            if(mainBoard == null) {
                let id = dv.getUint8(dv.byteLength-1)
                initBoard(dv.getUint8(1),id)
            }
            mainBoard.updateState(e.data.slice(1,-1))
            mainBoard.draw()
            break
        case cnFail:
            alert("Nie powiodło się uwierzytelnienie")
            break
        case diceOK:
            document.getElementById("dice").value = dv.getUint8(1)
            document.getElementById("rolled").value = 'rzucono'
            break
        case winner:
            alert(`Miejsce ${dv.getUint8(2)}. dla ${getColor(dv.getUint8(1))}`)
            break
        case who:
            document.getElementById("who").value = getColor(dv.getUint8(1))
            if(dv.getUint8(1) === mainBoard.myID){
                document.getElementById("rolled").value = 'nie rzucono'
            }else {
                document.getElementById("rolled").value = 'rzucono'
            }
            break
        case IDKWhat:
            alert("Unknown message type")
            break
        default:
            alert("Unsupported message type")
    }

}
export function onLudoError(e){

}
export function onLudoClose(e){

}
export function createLudoWS(query){
    let websocket = new WebSocket("ws://192.168.1.7:1337/websockets/ludo"+query)
    websocket.binaryType = "arraybuffer"
    websocket.onclose = onLudoClose
    websocket.onerror = onLudoError
    websocket.onopen = onLudoOpen
    websocket.onmessage = onLudoMessage
    return websocket
}
