import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CursoService } from './curso.service';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { EstadoCurso } from './entities/curso.entity';

@ApiTags('cursos')
@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @ApiOperation({ summary: 'Obtener lista de cursos con filtros opcionales' })
  @ApiQuery({ name: 'nombre', required: false, type: String })
  @ApiQuery({ name: 'estado', required: false, enum: EstadoCurso })
  @Get()
  async findAll(
    @Query('nombre') nombre?: string,
    @Query('estado') estado?: EstadoCurso,
  ): Promise<Curso[]> {
    return await this.cursoService.findAll({ nombre, estado });
  }

  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Curso> {
    return await this.cursoService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @Post()
  async create(@Body() createCursoDto: CreateCursoDto): Promise<Curso> {
    return await this.cursoService.create(createCursoDto);
  }

  @ApiOperation({ summary: 'Actualizar un curso existente' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCursoDto: UpdateCursoDto,
  ): Promise<Curso> {
    return await this.cursoService.update(id, updateCursoDto);
  }

  @ApiOperation({ summary: 'Eliminar un curso' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.cursoService.remove(id);
    return { message: 'Curso eliminado correctamente' };
  }
}