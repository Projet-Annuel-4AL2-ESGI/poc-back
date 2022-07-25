import { Injectable } from '@nestjs/common';
import { CreateExoDto } from './dto/create-exo.dto';
import { UpdateExoDto } from './dto/update-exo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exo } from './entities/exo.entity';
import { Repository } from 'typeorm';
import { CodeService } from '../code/code.service';
import { CreateCodeDto } from '../code/dto/create-code.dto';
import { performance } from 'perf_hooks';
import { TimeService } from "../time/time.service";

@Injectable()
export class ExoService {
  constructor(
    @InjectRepository(Exo)
    private exoRepository: Repository<Exo>,
    private codeService: CodeService,
    private timeService: TimeService,
  ) {}
  create(createExoDto: CreateExoDto) {
    return this.exoRepository.save(createExoDto);
  }

  async validateExo(createCodeDto: CreateCodeDto) {
    const start = performance.now();
    const verify = await this.codeService.execCode(createCodeDto);
    let x = verify;
    if (createCodeDto.type == 'py') {
      x = x.replace(/\r?\n|\r/g, ' ');
      const y = x.split(' ');
      if (y[y.length - 2] == 'True') {
        const end = performance.now();
        await this.sendTime(createCodeDto, end - start);
        return 'True';
      } else {
        return verify;
      }
    }
    if (createCodeDto.type == 'js') {
      if (x == true) {
        const end = performance.now();
        await this.sendTime(createCodeDto, end - start);
        return x;
      } else if (x == false) {
        return verify;
      }
    }
  }

  async sendTime(createCodeDto: CreateCodeDto, time: number) {
    await this.timeService.create({
      time: time / 1000,
      exerciseId: createCodeDto.exerciseId,
      userId: createCodeDto.userId,
    });
  }

  findAll() {
    return this.exoRepository.find();
  }

  findOne(id: number) {
    return this.exoRepository.findOne(id);
  }

  update(id: number, updateExoDto: UpdateExoDto) {
    return `This action updates a #${id} exo`;
  }

  remove(id: number) {
    return this.exoRepository.delete(id);
  }
}
