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
  mileage: string;

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
