import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, ConversationUser, Message } from '@/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation, ConversationUser])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
