import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { characters } from '../src/fixtures';
import { CharacterInput, CharacterPage } from '../src/contract';

describe('star wars API', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('character management', () => {
    const characterInput: CharacterInput = {
      name: 'Random Guy',
      episodes: ['NEWHOPE', 'JEDI'],
    };
    const lastId = characters.length;

    it('uses pagination for listing', () => {
      const data: CharacterPage = {
        characters,
        position: 1,
        size: 10,
        total: 10,
      };

      return request(app.getHttpServer()).get('/').expect(200).expect(data);
    });

    it('lets you add a character', () => {
      const addedCharacter = { id: lastId + 1, ...characterInput };

      return request(app.getHttpServer())
        .post('/')
        .send(characterInput)
        .expect(201)
        .expect(addedCharacter);
    });

    it('lets you remove a character', () => {
      return request(app.getHttpServer()).delete('/1').expect(204);
    });

    it('lets you update an existing character', () => {
      const updatedCharacter = { id: 1, ...characterInput };

      return request(app.getHttpServer())
        .put('/1')
        .send(characterInput)
        .expect(200)
        .expect(updatedCharacter);
    });
  });
});
