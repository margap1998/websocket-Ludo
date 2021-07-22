import {draw, drawPawn, getPawnColor} from "/client/drawingOnCanvas.js";
import {translateGridToX, translateGridToY, translateSquare} from "/client/translateXY.js";

function getPosition(player, offset){
    let r = -1    
    if(offset <= 48){
        r = (offset - 1 + player.boardStart)%48
    }else if(offset < 54){
        r = offset - 1 + (player.id * (5))
    }
    return r
}
const inBlocks = 0xFF
export class Player{
    constructor(id){
        this.pawns = [(id+1)*100,(id+1)*100+1,(id+1)*100+2,(id+1)*100+3]
        this.id = id
        this.boardStart = 12*id
    }
    updatePawns( slice ){
        let dv = new DataView(slice)
        for (let i = 0; i < this.pawns.length; i++) {
            this.pawns[i] = dv.getUint8(i)
            if (dv.getUint8(i) === inBlocks){
                this.pawns[i] = (this.id+1)*100 + i
            }
        }
    }
}
export class Board{
    constructor(numPlayers, id){
        this.myID = id
        this.whoseTurn = 0xFF
        this.length = 48
        this.board = new Uint8Array(68)
        this.board.fill(0XFF,0)
        this.players = new Array(numPlayers)
        for (let i =0; i<numPlayers; i++){this.players[i] = new Player(i)}
    }
    updateState(newState){
        this.board.fill(0XFF,0)
        let dv = new DataView(newState);
        let a = 0
        let num = dv.getUint8(a)
        a++
        for(let i = 0; i<num; i++){
            this.players[i].updatePawns(newState.slice(a,a+4))
            a+=4
        }
        this.whoseTurn = dv.getUint8(a)
    }
    draw(){
        draw()
        this.players.forEach((pl)=>{
            console.log(pl)
            pl.pawns.forEach((sq)=>{
                let pos = getPosition(pl,sq)
                if (pos === -1) pos = sq
                let grid = translateSquare(pos)
                drawPawn(getPawnColor(pl.id),translateGridToX(grid),translateGridToY(grid))
                if (pos<68){
                    this.board[pos] = pl.id
                }
            })
        })
    }
    click(pos, ws){
        if (pos < 68){
            let pl = this.myID
            if (pl !== 0xFF){
                for (let i =0; i<4; i++){
                    let sq = getPosition(this.players[pl],this.players[pl].pawns[i])
                    if(sq==pos){
                        let msg = new Uint8Array([2,i])
                        ws.send(msg.buffer)
                        break
                    }
                }
            }
        }else{
            let color = Math.floor(pos/100) - 1
            let pawn = Math.floor(pos%5)
            let msg = new Uint8Array([2,pawn])
            if(color === this.myID) ws.send(msg.buffer)
        }
    }
}
export function initBoard(numPlayers, id){
    mainBoard = new Board(numPlayers, id)
    console.log(mainBoard)
}
export let mainBoard = null
