package chinczykServer;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import chinczykServer.model.Player;
import org.junit.Test;

import java.util.Arrays;


/**
 * Unit test for simple App.
 */
public class PlayerTest
{
    @Test
    public void playerMove(){
        Player pl = new Player((byte) 0);
        assertEquals(0, pl.move((byte) 0, (byte) 6));
        assertEquals(6, pl.move((byte) 0, (byte) 6));
    }
    @Test
    public void playerCopyPawns(){
        Player pl = new Player((byte) 0);
        byte[] bytes = new byte[6];
        Arrays.fill(bytes,(byte) 0x0);
        pl.copyPawns(bytes,2);
        assertEquals(0,bytes[0]);
        assertEquals(0,bytes[1]);
        assertEquals(Player.inBlocks,bytes[2]);
        assertEquals(Player.inBlocks,bytes[3]);
        assertEquals(Player.inBlocks,bytes[4]);
        assertEquals(Player.inBlocks,bytes[5]);
    }
}
