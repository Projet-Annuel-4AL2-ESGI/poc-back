import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ExoService } from './exo.service';
import { CreateExoDto } from './dto/create-exo.dto';
import { UpdateExoDto } from './dto/update-exo.dto';
import { CreateCodeDto } from "../code/dto/create-code.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@Controller('exo')
export class ExoController {
  constructor(private readonly exoService: ExoService) {}

  @Post()
  create(@Body() createExoDto: CreateExoDto) {
    return this.exoService.create(createExoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/validate')
  validate(@Body() createCodeDto: CreateCodeDto) {
    return this.exoService.validateExo(createCodeDto);
  }

  @Get()
  findAll() {
    return this.exoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExoDto: UpdateExoDto) {
    return this.exoService.update(+id, updateExoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exoService.remove(+id);
  }
}
