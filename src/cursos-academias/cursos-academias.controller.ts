import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CursosAcademiasService } from './cursos-academias.service';
import { CreateCursosAcademiaDto } from './dto/create-cursos-academia.dto';
import { UpdateCursosAcademiaDto } from './dto/update-cursos-academia.dto';

@Controller('cursos-academias')
export class CursosAcademiasController {
  constructor(private readonly cursosAcademiasService: CursosAcademiasService) {}

  @Post()
  create(@Body() createCursosAcademiaDto: CreateCursosAcademiaDto) {
    return this.cursosAcademiasService.create(createCursosAcademiaDto);
  }

  @Get()
  findAll() {
    return this.cursosAcademiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursosAcademiasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursosAcademiaDto: UpdateCursosAcademiaDto) {
    return this.cursosAcademiasService.update(+id, updateCursosAcademiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursosAcademiasService.remove(+id);
  }
}
