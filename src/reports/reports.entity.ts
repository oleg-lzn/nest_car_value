import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
  AfterInsert,
} from 'typeorm';

@Entity()
export class ReportsEntity {
  constructor() {}
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

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

  // @Column()
  // car: string;

  // @Column()
  // make: string;

  // @Column()
  // year: number;

  // @Column
  // // connection with user
}
