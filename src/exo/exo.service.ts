import { Injectable } from '@nestjs/common';
import { CreateExoDto } from './dto/create-exo.dto';
import { UpdateExoDto } from './dto/update-exo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exo } from './entities/exo.entity';
import { Repository } from 'typeorm';
import { CodeService } from '../code/code.service';
import { CreateCodeDto } from '../code/dto/create-code.dto';
import { ValidateExoDto } from "./dto/validate-exo.dto";

@Injectable()
export class ExoService {
  constructor(
    @InjectRepository(Exo)
    private exoRepository: Repository<Exo>,
    private codeService: CodeService,
  ) {}
  create(createExoDto: CreateExoDto) {
    return this.exoRepository.save(createExoDto);
  }

  async validateExo(createCodeDto: CreateCodeDto) {
    const verify = await this.codeService.execCode(createCodeDto);
    let x = verify;
    x = x.replace(/\r?\n|\r/g, ' ');
    //console.log(x);
    const y = x.split(' ');
    //console.log('Test: ' + y[y.length - 2]);
    //console.log('\nTrue' == x.substring(x.lastIndexOf('\n')));
    if (y[y.length - 2] == 'True') {
      /*const validateExo: ValidateExoDto = {
        completed: true,
        content: verify,
      };*/
      return 'True';
    } else {
      return verify;
    }
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
