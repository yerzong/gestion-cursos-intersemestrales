import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademiaService } from './academia.service';
import { CreateAcademiaDto } from './dto/create-academia.dto';
import { UpdateAcademiaDto } from './dto/update-academia.dto';

@Controller('academia')
export class AcademiaController {
  constructor(private readonly academiaService: AcademiaService) {}

  @Post()
  create(@Body() createAcademiaDto: CreateAcademiaDto) {
    return this.academiaService.create(createAcademiaDto);
  }

  @Get()
  findAll() {
    return this.academiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademiaDto: UpdateAcademiaDto) {
    return this.academiaService.update(+id, updateAcademiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academiaService.remove(+id);
  }
}
