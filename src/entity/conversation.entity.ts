import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ConversationUser } from './conversation-user.entity';
import { Message } from './message.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'enum', enum: ['PERSONAL', 'GROUP'], default: 'PERSONAL' })
  type: 'PERSONAL' | 'GROUP';

  @OneToMany(() => ConversationUser, cu => cu.conversation)
  participants: ConversationUser[];

  // @OneToMany(() => Message, msg => msg.conversation)
  // messages: Message[];
}
