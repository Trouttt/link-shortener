import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('shortUrls')
class ShortUrl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  url: string;

  @Column()
  shortUrl: string;

  @Column()
  visited: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  statusCode: number;
}

export default ShortUrl;
