import { DataSource } from 'typeorm';
import { Character } from './character.entity';

export const config: any = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'db',
  synchronize: true,
  entities: [Character],
};

export default new DataSource(config);
