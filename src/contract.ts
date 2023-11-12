export type Page<Type, Label extends string> = Record<Label, Array<Type>> & {
  position: number; // page number
  size: number; // number of items per page
  total: number; // total amount of items for given query
};

export type CharacterPage = Page<Character, 'characters'>;

export type Episode = 'NEWHOPE' | 'EMPIRE' | 'JEDI';
export interface Character {
  id: number;
  name: string;
  episodes: Array<Episode>;
  planet?: string;
}

export type CharacterInput = Omit<Character, 'id'>;
