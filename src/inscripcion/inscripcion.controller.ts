import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InscripcionService } from './inscripcion.service';
import { Inscripcion } from './entities/inscripcion.entity';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { EstadoInscripcion } from './entities/inscripcion.entity';

@ApiTags('inscripciones')
@Controller('inscripciones')
export class InscripcionController {
  constructor(private readonly inscripcionService: InscripcionService) {}

  @ApiOperation({ summary: 'Obtener lista de inscripciones con filtros opcionales' })
  @Get()
  async findAll(
    @Query('usuarioId') usuarioId?: number,
    @Query('cursoId') cursoId?: number,
    @Query('estado') estado?: EstadoInscripcion,
  ): Promise<Inscripcion[]> {
    return await this.inscripcionService.findAll({ usuarioId, cursoId, estado });
  }

  @ApiOperation({ summary: 'Obtener una inscripción por ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Inscripcion> {
    return await this.inscripcionService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear una nueva inscripción' })
  @Post()
  async create(@Body() createInscripcionDto: CreateInscripcionDto): Promise<Inscripcion> {
    return await this.inscripcionService.create(createInscripcionDto);
  }

  @ApiOperation({ summary: 'Actualizar una inscripción existente' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInscripcionDto: UpdateInscripcionDto,
  ): Promise<Inscripcion> {
    return await this.inscripcionService.update(id, updateInscripcionDto);
  }

  @ApiOperation({ summary: 'Eliminar una inscripción' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.inscripcionService.remove(id);
    return { message: 'Inscripción eliminada correctamente' };
  }
}