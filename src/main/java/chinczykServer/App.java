package chinczykServer;

import org.glassfish.tyrus.server.Server;

public class App 
{
    public static void main( String[] args ) {
        Class[] classes={LudoEndpoint.class,LudoRegisterEndpoint.class};
        Server server = new Server(args[0], Integer.parseInt(args[1]), "/websockets", null, classes);
        boolean flag = true;
        while (flag){
            try {
                server.start();
            } catch (Exception e) {
                e.printStackTrace();
                flag = false;
            }
        }
        server.stop();
    }
}
