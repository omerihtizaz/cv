import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;

  @Column({ default: false })
  approved: boolean;
  @Column()
  make: string;
  @Column()
  mileage: number;
  @Column()
  lat: number;
  @Column()
  lng: number;
  @Column()
  model: string;
  @Column()
  year: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}