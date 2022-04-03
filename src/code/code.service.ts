import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';

@Injectable()
export class CodeService {
  create(createCodeDto: CreateCodeDto) {
    return 'This action adds a new code';
  }

  findAll() {
    return `This action returns all the code`;
  }

  async execCode(createCodeDto: CreateCodeDto) {
    await fs.writeFileSync(
      'exec/code.' + createCodeDto.type,
      createCodeDto.content,
    );
    if (createCodeDto.type == 'py') {
      return await this.run_shell_command('python exec/code.py');
    } else if (createCodeDto.type == 'js') {
      return await this.run_shell_command('node exec/code.js');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} code`;
  }

  update(id: number, updateCodeDto: UpdateCodeDto) {
    return `This action updates a #${id} code`;
  }

  remove(id: number) {
    return `This action removes a #${id} code`;
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
}
