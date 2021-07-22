package chinczykServer.model;

import java.util.Arrays;

public class Player {
    static final public byte inBlocks = (byte) 0xFF;
    static final public byte start = (byte) 1;
    static final public byte pawns = (byte) 4;
    public byte[] wherePawns;
    public byte boardStart;
    public byte id;
    byte position;
    public static final byte end = Ludo.lengthOfBoard + 5;
    public Player(byte i){
        id = i;
        position = 0;
        boardStart = (byte) (i * Ludo.lengthOfBoard/4);
        wherePawns = new byte[pawns];
        Arrays.fill(wherePawns, inBlocks);
    }
    public boolean checkMoves(byte bySquares) {
        boolean flag = false;
        for (byte s : wherePawns) {
            flag = flag || (((s + bySquares) <= end && s != inBlocks));
        }
        return flag;
    }

    public static byte getBoardPosition(byte pos, Player p) {
        if (pos == inBlocks) {
            return inBlocks;
        } else if (pos <= Ludo.lengthOfBoard) {
            return (byte) ((pos - start + p.boardStart) % Ludo.lengthOfBoard);
        } else {
            return (byte) (pos - start + p.id * (end - Ludo.lengthOfBoard));
        }
    }
    boolean stacked(int which){
        boolean flag = false;
        for (int i = 0; i < wherePawns.length; i++) {
            if(i!=which) flag = flag || wherePawns[i]==wherePawns[which];
        }
        return flag;
    }
    public byte move(int which, byte bySquares) {
        if (wherePawns[which] != inBlocks) {
            if ((wherePawns[which] + bySquares) <= end) wherePawns[which] += bySquares;
        } else if (bySquares == 6) {
            wherePawns[which] = start;
        }
        System.out.printf("Player::move %hu\n",wherePawns[which]);
        return getBoardPosition(wherePawns[which],this);
    }

    public boolean kill(int which) {
        boolean kill = !(wherePawns[which] == start || wherePawns[which] == end) ;
        if (kill) wherePawns[which] = inBlocks;
        return kill;
    }

    public boolean checkWin() {
        boolean flag = true;
        for (byte wherePawn : wherePawns) {
            flag = flag && (wherePawn == end);
        }
        flag = flag && position==0;
        return flag;
    }
    public void copyPawns(byte[] board, int where){
        for (int i = 0; i < wherePawns.length; i++) {
            board[where+i] = wherePawns[i];
        }
    }

    public void setPosition(byte place) {
        position = place;
    }
}
