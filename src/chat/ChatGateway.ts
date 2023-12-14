import {SubscribeMessage, MessageBody, ConnectedSocket, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        // Handle connection event
        console.log("temp===Connection");
        console.log("temp===Connection");

    }

    handleDisconnect(client: Socket) {
        // Handle disconnection event
        console.log("temp===Disconnect");
    }

    @SubscribeMessage('cctv1_current_frame_status')
    handleMessage_cctv1_current_frame_status(@MessageBody() body: string, @ConnectedSocket() client: Socket) {
        console.log('cctv1_current_frame_status: ' + body);

        this.server.emit('cctv1_current_frame_status', {
            data: body,
        }); // Broadcast the message to all connected clients
    }

    @SubscribeMessage('cctv1_event')
    handleMessage_cctv1_event(@MessageBody() body: string, @ConnectedSocket() client: Socket) {
        // Handle received message
        console.log('message: ' + body);
        this.server.emit('cctv1_event', {
            data: body,
        }); // Broadcast the message to all connected clients
    }
}