import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import {} from '@nestjs/platform-ws';

@WebSocketGateway(3101, {
  cors: true,
})
export class EventsGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: any): WsResponse<string> {
    console.log('payload', JSON.stringify(payload));
    const message = payload;
    return { event: 'message', data: message };
  }
}
