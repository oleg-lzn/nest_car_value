import { UserEntity } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
  AfterInsert,
  ManyToOne,
} from 'typeorm';

@Entity()
export class ReportsEntity {
  constructor() {}
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false }) // this is how to set the default value for a report
  approved: boolean;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  @ManyToOne(() => UserEntity, (user) => user.reports) // establishing a connection to the user
  user: UserEntity;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Report with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Report with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Report with id', this.id);
  }

  // @Column
  // // connection with user
}
