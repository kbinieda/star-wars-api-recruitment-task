import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { characters } from './fixtures';
import { CharacterService } from '../src/character.service';
import type { CharacterInput, CharacterPage, Episode } from '../src/contract';

describe('star wars API', () => {
  let app: INestApplication;
  let characterService: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    characterService = moduleFixture.get(CharacterService);

    await characterService.repository.clear();
    for (const item of characters) {
      await characterService.add(item);
    }
  });

  describe('character management', () => {
    const characterInput: CharacterInput = {
      name: 'Random Guy',
      episodes: ['NEWHOPE', 'JEDI'],
    };

    it('uses pagination for listing', async () => {
      const data: CharacterPage = {
        characters: [
          characterService.createOutput(characters[5]),
          characterService.createOutput(characters[6]),
        ],
        position: 2,
        size: 5,
        total: 7,
      };

      return request(app.getHttpServer())
        .get('/')
        .query({ page: 2, size: 5 })
        .expect(200)
        .expect(data);
    });

    it('lets you add a character', async () => {
      const addedCharacter = {
        id: characters[characters.length - 1].id + 1,
        ...characterInput,
      };

      return request(app.getHttpServer())
        .post('/')
        .send(characterInput)
        .expect(201)
        .expect(addedCharacter);
    });

    it('lets you remove a character', async () => {
      return request(app.getHttpServer()).delete('/1').expect(204);
    });

    it('lets you update an existing character', async () => {
      const updatedCharacter = { id: characters[0].id, ...characterInput };

      return request(app.getHttpServer())
        .put('/' + characters[0].id)
        .send(characterInput)
        .expect(200)
        .expect(updatedCharacter);
    });

    it('returns a 400 code in case of validation error', async () => {
      characterInput.episodes.push('INVALID_EPISODE' as Episode);

      return request(app.getHttpServer())
        .post('/')
        .send(characterInput)
        .expect(400);
    });
  });
});
