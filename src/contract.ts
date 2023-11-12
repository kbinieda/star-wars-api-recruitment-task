import {
  IsIn,
  IsNotEmpty,
  IsString,
  IsArray,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';

export type Page<Type, Label extends string> = Record<Label, Array<Type>> & {
  position: number; // page number
  size: number; // number of items per page
  total: number; // total amount of items for given query
};

export type CharacterPage = Page<Character, 'characters'>;

const Episodes = ['NEWHOPE', 'EMPIRE', 'JEDI'] as const;
export type Episode = (typeof Episodes)[number];

export class CharacterInput {
  @ApiProperty({ example: 'Darth Vader', maxLength: 30 })
  @IsNotEmpty()
  @MaxLength(30)
  @IsString()
  name: string;

  @ApiProperty({ example: ['NEWHOPE', 'EMPIRE'], enum: Episodes })
  @IsArray()
  @IsIn(Episodes, { each: true })
  episodes: Array<Episode>;

  @ApiProperty({ example: 'Alderaan', required: false, maxLength: 30 })
  @MaxLength(30)
  @IsString()
  @IsOptional()
  planet?: string;
}

class Id {
  id: number;
}
export class Character extends IntersectionType(Id, CharacterInput) {}
