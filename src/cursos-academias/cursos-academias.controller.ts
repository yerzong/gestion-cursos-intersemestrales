import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CursosAcademiasService } from './cursos-academias.service';
import { CursoAcademia } from './entities/cursos-academia.entity';
import { CreateCursoAcademiaDto } from './dto/create-cursos-academia.dto';
import { UpdateCursoAcademiaDto } from './dto/update-cursos-academia.dto';

@ApiTags('cursos-academias')
@Controller('cursos-academias')
export class CursosAcademiasController {
  constructor(private readonly cursosAcademiasService: CursosAcademiasService) {}

  @ApiOperation({ summary: 'Obtener lista de registros con filtros opcionales' })
  @ApiQuery({ name: 'cursoId', required: false, type: Number })
  @ApiQuery({ name: 'academiaId', required: false, type: Number })
  @Get()
  async findAll(
    @Query('cursoId') cursoId?: number,
    @Query('academiaId') academiaId?: number,
  ): Promise<CursoAcademia[]> {
    return await this.cursosAcademiasService.findAll({ cursoId, academiaId });
  }

  @ApiOperation({ summary: 'Obtener un registro por ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CursoAcademia> {
    return await this.cursosAcademiasService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo registro' })
  @Post()
  async create(@Body() createCursoAcademiaDto: CreateCursoAcademiaDto): Promise<CursoAcademia> {
    return await this.cursosAcademiasService.create(createCursoAcademiaDto);
  }

  @ApiOperation({ summary: 'Actualizar un registro existente' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCursoAcademiaDto: UpdateCursoAcademiaDto,
  ): Promise<CursoAcademia> {
    return await this.cursosAcademiasService.update(id, updateCursoAcademiaDto);
  }

  @ApiOperation({ summary: 'Eliminar un registro' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.cursosAcademiasService.remove(id);
    return { message: 'Registro eliminado correctamente' };
  }
}