import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  CharacterInput,
  CharacterPage,
  Character as CharacterOutput,
} from './contract';
import { Character } from './character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly repository: Repository<Character>,
  ) {}

  createOutput(entity: Character): CharacterOutput {
    const output: CharacterOutput = {
      id: entity.id,
      name: entity.name,
      episodes: entity.episodes,
    };

    if (typeof entity.planet === 'string') {
      output.planet = entity.planet;
    }

    return output;
  }

  async add(input: CharacterInput): Promise<CharacterOutput> {
    return this.createOutput(await this.repository.save(input));
  }
  async update(id: number, input: CharacterInput): Promise<CharacterOutput> {
    return this.createOutput(await this.repository.save({ id, ...input }));
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async paginate(page: number, size: number): Promise<CharacterPage> {
    const skip = (page - 1) * size;
    const [data, total] = await this.repository.findAndCount({
      take: size,
      skip,
    });

    const characters: Array<CharacterOutput> = [];
    for (const item of data) {
      characters.push(this.createOutput(item));
    }

    return {
      characters,
      position: page,
      size: size,
      total: total,
    };
  }
}
