import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './typeorm.config';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Character } from './character.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Character]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class AppModule {}
