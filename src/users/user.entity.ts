import { Report } from 'src/reports/report.entity';
import {
  AfterRemove,
  AfterUpdate,
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number;
  @Column()
  name: String;
  @Column()
  email: String;
  @Column()
  password: String;
  @Column({ default: true })
  admin: boolean;
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ', this.id, ' and name: ', this.name);
  }
  @AfterRemove()
  logRemove() {
    console.log(
      'User with id: ',
      this.id,
      ' and name: ',
      this.name,
      ' has been removed.',
    );
  }
  @AfterUpdate()
  logUpdate() {
    console.log(
      'User with id: ',
      this.id,
      ' and name: ',
      this.name,
      ' has been Updated.',
    );
  }
}
