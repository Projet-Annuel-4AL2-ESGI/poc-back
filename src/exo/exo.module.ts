import { Module } from '@nestjs/common';
import { ExoService } from './exo.service';
import { ExoController } from './exo.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exo } from "./entities/exo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Exo])],
  controllers: [ExoController],
  providers: [ExoService]
})
export class ExoModule {}
