package chinczykServer.model;

import chinczykServer.model.Player;

import java.util.Random;

public class Ludo {
    public static final byte nonWin = (byte) 0xFF;
    static final public int lengthOfBoard = 48;
    Player[] players;
    public byte place;
    byte dice;
    public byte whoseTurn;
    Random r;
    byte green = 0; byte red = 1; byte blue = 2; byte yellow = 3;
    public boolean rolled;
    public byte getDice() {
        return dice;
    }

    public Ludo(int pl){
        r = new Random();
        players = new Player[pl];
        for (byte i = 0; i < players.length; i++) {
            players[i] = new Player(i);
        }
        place = 1;
        rolled = false;
        dice = 0;
        whoseTurn = (byte) r.nextInt(pl);
    }
    public byte getPlayerPlace(int id){
        return players[id].position;
    }
    public byte roll(){
        if (dice<=0) dice = (byte) (r.nextInt(6)+1);
        rolled = true;
        return dice;
    }
    public void turn(byte which){
        boolean stay = false;
        Player who = players[whoseTurn];
        int oldPlace = Player.getBoardPosition(who.wherePawns[which],who);
        for (int i =0; i<4;i++) stay = stay || (dice == 6 && who.wherePawns[i]==Player.inBlocks);
        for (int i =0; i<4;i++) stay = stay || ((who.wherePawns[i]+dice)<=Player.end &&  who.wherePawns[i]!=Player.inBlocks);
        if (stay) System.out.println("stayed");
        int newPlace = players[whoseTurn].move(which, dice);
        System.out.printf("%d %d\n",oldPlace,newPlace);
        if (dice>0 && stay) {
            if (newPlace != oldPlace) {
                boolean stayTurn = dice==6;
                for (Player p : players)
                    if (p != who) {
                        for (int i = 0; i < 4; i++)
                            if (Player.getBoardPosition(p.wherePawns[i], p) == newPlace)
                                stayTurn = stayTurn || p.kill(i);
                    }
                if (!stayTurn) whoseTurn = (byte) ((whoseTurn + 1) % players.length);
                rolled = false;
                dice = 0;
            }
        }else if(dice>0){
            dice = 0;
            whoseTurn = (byte) ((whoseTurn + 1) % players.length);
        }

    }
    public byte checkWin(){
        for (byte i = 0; i < players.length; i++) {
            if (players[i].checkWin()){
                players[i].setPosition(place);
                place++;
                return i;
            }
        }
        return nonWin;
    }
    public byte[] stateOfGame(byte msg, byte addr){
        int lMasg = 2 + players.length * 4 + 2;
        byte [] toReturn = new byte[lMasg];
        toReturn[0] = msg;
        toReturn[1] = (byte) players.length;
        int a = 2;
        for(Player player:players){
            player.copyPawns(toReturn,a);
            a+=4;
        }
        toReturn[a] = whoseTurn;
        a++;
        toReturn[a] = addr;
        return toReturn;
    }
}