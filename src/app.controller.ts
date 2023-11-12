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
} from '@nestjs/common';
import { Character, CharacterInput, CharacterPage } from './contract';
import { characters } from './fixtures';

@Controller()
export class AppController {
  @Get()
  listCharacters(
    @Query('id', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('size', new ParseIntPipe({ optional: true })) size: number = 10,
  ): CharacterPage {
    return {
      characters,
      position: page,
      size: size,
      total: size,
    };
  }

  @Post()
  addCharacter(@Body() input: CharacterInput): Character {
    return { id: characters.length + 1, ...input };
  }

  @Put(':id')
  updateCharacter(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: CharacterInput,
  ): Character {
    return { id, ...input };
  }

  @Delete(':id')
  @HttpCode(204)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCharacter(@Param('id', ParseIntPipe) id: number): void {}
}
