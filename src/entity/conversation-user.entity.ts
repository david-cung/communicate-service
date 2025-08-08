import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity()
export class ConversationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conversationId: number;

  @ManyToOne(() => Conversation, conv => conv.participants)
  conversation: Conversation;

  @Column({ nullable: true })
  userId?: number;

  @Column({ nullable: true })
  guestId?: number;
}
