import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserGuest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deviceId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deviceId1: string;
}
