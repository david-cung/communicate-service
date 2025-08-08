// src/chat/chat.service.ts
import { Message } from '@/entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async saveMessage(fromUserId: string, toUserId: string, content: string, delivered: boolean) {
    const msg = this.messageRepo.create({
      senderId: fromUserId,
      receiverId: toUserId,
      content,
      delivered,
    });
    return await this.messageRepo.save(msg);
  }

  async savePendingMessage(toUserId: string, fromUserId: string, content: string) {
    return await this.saveMessage(fromUserId, toUserId, content, false);
  }

  // Lấy tin nhắn chưa gửi
  async getPendingMessages(userId: string) {
    return await this.messageRepo.find({
      where: { senderId: userId, delivered: false },
      order: { createdAt: 'ASC' },
    });
  }

  // Đánh dấu đã gửi
  async markMessagesAsDelivered(messageIds: string[]) {
    if (messageIds.length > 0) {
      await this.messageRepo.update(messageIds, { delivered: true });
    }
  }

  // Lấy lịch sử giữa 2 user
  async getMessageHistory(userId: string, partnerId: string, limit = 20, offset = 0) {
    return await this.messageRepo.find({
      where: [
        { senderId: userId, receiverId: partnerId },
        { senderId: partnerId, receiverId: userId },
      ],
      order: { createdAt: 'ASC' },
      skip: offset,
      take: limit,
    });
  }
}
