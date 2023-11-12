import { Character } from '../src/character.entity';
export const characters: Array<Character> = [
  {
    id: 1,
    name: 'Luke Skywalker',
    episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  },
  {
    id: 2,
    name: 'Darth Vader',
    episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  },
  {
    id: 3,
    name: 'Han Solo',
    episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  },
  {
    id: 4,
    name: 'Leia Organa',
    episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    planet: 'Alderaan',
  },
  {
    id: 5,
    name: 'Wilhuff Tarkin',
    episodes: ['NEWHOPE'],
  },
  {
    id: 6,
    name: 'C-3PO',
    episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  },
  {
    id: 7,
    name: 'R2-D2',
    episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  },
];
