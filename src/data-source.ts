import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
