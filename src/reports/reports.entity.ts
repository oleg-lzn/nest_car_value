import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReportsEntity {
  constructor() {}
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  // @Column()
  // car: string;

  // @Column()
  // make: string;

  // @Column()
  // year: number;

  // @Column
  // // connection with user
}
