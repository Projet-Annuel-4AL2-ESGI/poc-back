import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findByMail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({ id: id, email: updateUserDto.email });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
