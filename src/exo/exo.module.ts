import { Module } from '@nestjs/common';
import { ExoService } from './exo.service';
import { ExoController } from './exo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exo } from './entities/exo.entity';
import { CodeModule } from '../code/code.module';
import { TimeModule } from '../time/time.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exo]), CodeModule, TimeModule],
  controllers: [ExoController],
  providers: [ExoService],
})
export class ExoModule {}
