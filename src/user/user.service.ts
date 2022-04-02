import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async run_shell_command(command) {
    const execProm = promisify(exec);
    let result;
    try {
      result = await execProm(command);
    } catch (ex) {
      result = ex;
    }
    if (Error[Symbol.hasInstance](result)) return result.stderr;

    return result.stdout;
  }

  async findAll() {
    return await this.run_shell_command('node exec/exectest.js');
    //return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({ id: id, name: updateUserDto.name });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
