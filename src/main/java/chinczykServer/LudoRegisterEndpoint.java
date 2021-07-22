package chinczykServer;

import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

@ServerEndpoint("/ludoRegister")
public class LudoRegisterEndpoint {
    static Random random = new Random();
    static Logger log = Logger.getAnonymousLogger();
    private static final byte noOption = 0;
    private static final byte accept = 1;
    private static final byte gameExistsFail = 2;
    private static final byte gameNotExists = 3;
    private static final byte cnFail = 4;
    @OnClose
    public void onClose(Session session, CloseReason closeReason) throws IOException {
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
    }

    @OnMessage
    public void onMessage(Session session, byte[] message) {
        sendError(session, (byte) 0xFF);
    }
    public void exists(Session session){
        String game = session.getPathParameters().get("game");
        int cn = Integer.parseInt(session.getPathParameters().get("cn"));
        if (game != null && LudoEndpoint.sessionsMap.containsKey(game)){
            Game game1 = LudoEndpoint.sessionsMap.get(game);
            if (game1.controlNumber == cn && game1.left>0){
                String q = "?game=" + game + "&cn=" + cn + "&player=" + (game1.players - game1.left) +"&option=exists";
                game1.left--;
                byte[] b = q.getBytes();
                byte[] bytes = new byte[b.length+1];
                bytes[0] = accept;
                System.arraycopy(b,0,bytes,1,b.length);
                try {
                    session.getBasicRemote().sendBinary(ByteBuffer.wrap(bytes));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }else{
                sendError(session, cnFail);
            }
        }else {
            sendError(session, gameNotExists);
        }
    }
    public void newGame(Session session){
        String game = session.getPathParameters().get("game");
        int players = Integer.parseInt(session.getPathParameters().get("players"));
        int cn = random.nextInt();
        if(game!=null && !LudoEndpoint.sessionsMap.containsKey(game)) {
            Game g = null;
            try {
                g = new Game(players, cn);
                g.left--;
                LudoEndpoint.sessionsMap.put(game, g);
                String q = "?game=" + game + "&cn=" + cn + "&player=0"+"&option=exists";
                byte[] b = q.getBytes();
                byte[] bytes = new byte[b.length+1];
                bytes[0] = accept;
                System.arraycopy(b,0,bytes,1,b.length);
                session.getBasicRemote().sendBinary(ByteBuffer.wrap(bytes));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else{
            sendError(session, gameExistsFail);
        }
    }

    private static void sendError(Session session, byte msg) {
        try {
            session.getBasicRemote().sendBinary(ByteBuffer.wrap(new byte[]{msg}));
            session.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    // 0- impossible to do anything; 1 - correct query 2- game exists, 3 - game not exists; 4 - incorrect number or full game
    @OnOpen
    public void onOpen(Session session)  {
        String option = session.getPathParameters().get("option");
        if(option != null && option.equalsIgnoreCase("exists")){
            exists(session);
        }else if(option != null && option.equalsIgnoreCase("newgame")){
            newGame(session);
        }else{
            sendError(session, noOption);
        }
    }
}
