import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Character, CharacterInput, type CharacterPage } from './contract';
import { CharacterService } from './character.service';

@Controller()
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
  @Get()
  async listCharacters(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('size', new ParseIntPipe({ optional: true })) size: number = 10,
  ): Promise<CharacterPage> {
    return await this.characterService.paginate(page, size);
  }

  @Post()
  @ApiResponse({ type: Character })
  async addCharacter(
    @Body(ValidationPipe) input: CharacterInput,
  ): Promise<Character> {
    return await this.characterService.add(input);
  }

  @Put(':id')
  @ApiResponse({ type: Character })
  async updateCharacter(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) input: CharacterInput,
  ): Promise<Character> {
    return await this.characterService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeCharacter(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.characterService.remove(id);
  }
}
