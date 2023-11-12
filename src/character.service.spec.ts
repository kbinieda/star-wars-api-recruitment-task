import { CharacterService } from './character.service';

describe('character service', () => {
  let characterService: CharacterService;

  beforeEach(() => {
    characterService = new CharacterService({} as any);
  });

  it('does not show empty optional attributes', () => {
    expect(
      characterService.createOutput({
        id: 1,
        name: 'Random Guy',
        episodes: ['NEWHOPE'],
        planet: null,
      }),
    ).toStrictEqual({
      id: 1,
      name: 'Random Guy',
      episodes: ['NEWHOPE'],
    });
  });
});
