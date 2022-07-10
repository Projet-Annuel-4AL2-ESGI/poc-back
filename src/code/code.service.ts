import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';
import Axios from 'axios';

@Injectable()
export class CodeService {
  create(createCodeDto: CreateCodeDto) {
    return 'This action adds a new code';
  }

  findAll() {
    return `This action returns all code`;
  }

  async execCode(createCodeDto: CreateCodeDto) {
    if (createCodeDto.type == 'py') {
      return await this.make_post_request_python(createCodeDto);
    } else if (createCodeDto.type == 'js') {
      return await this.make_post_request_js(createCodeDto);
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
  async make_post_request_js(createCodeDto: CreateCodeDto) {
    let response: any = '';
    try {
      response = await Axios.post(
        'http://localhost:5999/code/exec',
        createCodeDto,
      ).then(function (response) {
        return response.data;
      });
    } catch (er) {
      console.log(er);
    }
    console.log('JS:' + response);
    return response;
  }

  async make_post_request_python(createCodeDto: CreateCodeDto) {
    let response: any = '';
    try {
      response = await Axios.post(
        'http://localhost:5998/code/exec',
        createCodeDto,
      ).then(function (response) {
        return response.data;
      });
    } catch (er) {
      console.log(er);
    }
    console.log('Py:' + response);
    return response;
  }
}
