import { Injectable } from '@nestjs/common';
import { CreateExoDto } from './dto/create-exo.dto';
import { UpdateExoDto } from './dto/update-exo.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Exo } from "./entities/exo.entity";
import { Repository } from "typeorm";

@Injectable()
export class ExoService {
  constructor(
    @InjectRepository(Exo)
    private exoRepository: Repository<Exo>,
  ) {}
  create(createExoDto: CreateExoDto) {
    return this.exoRepository.save(createExoDto);
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
