import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // Mapping: userId (hoặc guestId) → socketId
  private connections = new Map<string, string>();

  constructor(private readonly messageService: ChatService) {}

  // Giải mã token để lấy userId
  private getUserIdFromToken(token: string): { userId: string; role: string } {
    const payload = jwt.verify(token, '1231231232131231223') as {
      userId: string;
      role: string;
    };
    return { userId: payload.userId, role: payload.role };
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token;
    console.log('token1312', token);
    let userId: string | null = null;
    let role: string | null = null;
    if (token) {
      const data = this.getUserIdFromToken(token);
      userId = data?.userId;
      role = data.role;
    }
    console.log('userId11', userId);
    if (userId) {
      // ✅ Case: Có login
      this.connections.set(userId, client.id);
      client.data.userId = userId;
      client.data.isGuest = false;

      if (role === 'admin') {
        client.join('admin');
        console.log(`Admin connected: ${client.id}`);
      }

      console.log(`✅ User ${userId} (login) connected socketId ${client.id}`);

      // Gửi pending messages
      const pending = await this.messageService.getPendingMessages(userId);
      if (pending.length > 0) {
        for (const msg of pending) {
          client.emit('receive_message', {
            from: msg.senderId,
            message: msg.content,
            createdAt: msg.createdAt,
          });
        }
        await this.messageService.markMessagesAsDelivered(
          pending.map((m) => m.id),
        );
      }
    } else {
      // ⚠️ Case: Chưa login → tạo guestId
      const guestId = `guest-${uuidv4()}`;
      this.connections.set(guestId, client.id);
      client.data.userId = guestId;
      client.data.isGuest = true;

      console.log(
        `🛎 Guest user connected: ${guestId} (socketId ${client.id})`,
      );
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    console.log(`🛎 Guest user disconnected (socketId ${client.id})`);
    if (userId && this.connections.get(userId) === client.id) {
      this.connections.delete(userId);
    }
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { toUserId: string; content: string },
  ) {
    const fromUserId = client.data.userId;
    const toSocketId = this.connections.get(payload.toUserId);
    this.server.to('admin').emit('receive_message', {content: payload.content, from: fromUserId});
  }
}
