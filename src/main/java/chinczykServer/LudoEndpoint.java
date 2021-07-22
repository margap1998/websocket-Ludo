package chinczykServer;

import chinczykServer.model.Ludo;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.concurrent.*;
import java.util.logging.Logger;
class Game{
    Session[] sessions;

    int controlNumber;
    int players;
    int left;
    Ludo ludo;
    public Game(int number, int cn) throws Exception {
        sessions = new Session[number];
        controlNumber = cn;
        players = number;
        if (players>4 || players<2) throw new Exception();
        left = players;
        ludo = new Ludo(number);
    }
}

@ServerEndpoint("/ludo")
public class LudoEndpoint {
    private static final byte noGame = 0;
    private static final byte newState = 1;
    private static final byte cnFail = 2;
    private static final byte diceOK = 3;
    private static final byte winner = 4;
    private static final byte IDKWhat = 5;
    private static final byte who = 6;

    static public final ConcurrentHashMap<String, Game> sessionsMap = new ConcurrentHashMap<>();
    static public final ConcurrentHashMap<Session, Game> sessionsGameMap = new ConcurrentHashMap<>();
    static Logger log = Logger.getAnonymousLogger();
    private static final byte rollMsg = 1;
    private static final byte moveMsg = 2;

    @OnClose
    public void onClose(Session session, CloseReason closeReason) throws IOException {
        if(sessionsGameMap.containsKey(session)) {
            int player = Integer.parseInt(session.getPathParameters().get("player"));
            sessionsGameMap.get(session).sessions[player] = null;
            sessionsGameMap.remove(session);
        }
    }
    @OnError
    public void onError (Session session, Throwable throwable) {
        if(sessionsGameMap.containsKey(session)) {
            int player = Integer.parseInt(session.getPathParameters().get("player"));
            sessionsGameMap.get(session).sessions[player] = null;
            sessionsGameMap.remove(session);
        }
    }

    @OnMessage
    public void onMessage(Session session, byte[] message) throws IOException {
        switch (message[0]){
            case rollMsg:
                roll(session);
                break;
            case moveMsg:
                move(session, message);
                break;
            default:
                sendError(session,IDKWhat);
                break;
        }
    }

    private void move(Session session, byte[] message) {
        Game g = sessionsGameMap.get(session);
        byte player = Byte.parseByte(session.getPathParameters().get("player"));
        int cn = Integer.parseInt(session.getPathParameters().get("cn"));
        if (g.controlNumber == cn && g.ludo.whoseTurn == player) {
            g.ludo.turn(message[1]);
            byte[] msg = g.ludo.stateOfGame(newState, player);
            for (Session session1 : g.sessions) if (session1!=null){
                sendBytes(session1, msg);
            }
            byte place = g.ludo.place;
            byte winId = g.ludo.checkWin();
            if (winId != Ludo.nonWin) {
                msg = new byte[]{winner, winId, place};
                for (Session session1 : g.sessions) if (session1!=null){
                    sendBytes(session1, msg);
                }
                try {
                    g.sessions[winId].close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                int control = 0;
                while (g.ludo.getPlayerPlace(g.ludo.whoseTurn)>0 && control<g.players){
                    g.ludo.whoseTurn = (byte) ((g.ludo.whoseTurn + 1) %g.players);
                    control++;
                }
            }
            msg = new byte[]{who,g.ludo.whoseTurn};
            for (Session session1 : g.sessions) if (session1!=null){
                sendBytes(session1, msg);
            }
        }else{
            sendError(session,IDKWhat);
        }
    }

    private void roll(Session session) {
        Game g = sessionsGameMap.get(session);
        if(g.ludo.getDice()<=0){
            byte player = Byte.parseByte(session.getPathParameters().get("player"));
            int cn = Integer.parseInt(session.getPathParameters().get("cn"));
            if (g.controlNumber == cn && g.ludo.whoseTurn == player) {
                byte dice = g.ludo.roll();
                byte[] msg = {diceOK, dice};
                for (Session session1 : g.sessions) if (session1!=null){
                    sendBytes(session1, msg);
                }
            }else {
                sendError(session,IDKWhat);
            }
        }
    }

    //0 - no game exists; 1 - game exists; 2 - control number isn't correct;
    @OnOpen
    public void onOpen(Session session){
        String game = session.getPathParameters().get("game");
        byte player = Byte.parseByte(session.getPathParameters().get("player"));
        int cn = Integer.parseInt(session.getPathParameters().get("cn"));
        if(sessionsMap.containsKey(game)){
            log.info(game + " " +player + " "+ cn);
            Game game1 = sessionsMap.get(game);
            if (game1.controlNumber == cn && player<game1.players) {
                game1.sessions[player] = session;
                sessionsGameMap.put(session,game1);
                byte[] state = game1.ludo.stateOfGame(newState, player);
                sendBytes(session,state);
                state = new byte[]{diceOK,game1.ludo.getDice()};
                sendBytes(session,state);
                state = new byte[]{who,game1.ludo.whoseTurn};
                sendBytes(session,state);
            }else {
                sendError(session, cnFail);
            }
        }else{
            sendError(session, noGame);
        }
    }
    private static void sendBytes(Session session, byte[] msg){
        try {
            session.getBasicRemote().sendBinary(ByteBuffer.wrap(msg));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private static void sendError(Session session, byte msg) {
        try {
            session.getBasicRemote().sendBinary(ByteBuffer.wrap(new byte[]{msg}));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}


