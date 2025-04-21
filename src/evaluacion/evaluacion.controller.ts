import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { EvaluacionService } from './evaluacion.service';
import { Evaluacion, Calificacion } from './entities/evaluacion.entity';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';

@ApiTags('evaluaciones')
@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @ApiOperation({ summary: 'Obtener lista de evaluaciones con filtros opcionales' })
  @ApiQuery({ name: 'usuarioId', required: false, type: Number })
  @ApiQuery({ name: 'cursoId', required: false, type: Number })
  @ApiQuery({ name: 'calificacion', required: false, enum: Calificacion })
  @Get()
  async findAll(
    @Query('usuarioId') usuarioId?: number,
    @Query('cursoId') cursoId?: number,
    @Query('calificacion') calificacion?: Calificacion,
  ): Promise<Evaluacion[]> {
    return await this.evaluacionService.findAll({ usuarioId, cursoId, calificacion });
  }

  @ApiOperation({ summary: 'Obtener una evaluación por ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Evaluacion> {
    return await this.evaluacionService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear una nueva evaluación' })
  @Post()
  async create(@Body() createEvaluacionDto: CreateEvaluacionDto): Promise<Evaluacion> {
    return await this.evaluacionService.create(createEvaluacionDto);
  }

  @ApiOperation({ summary: 'Actualizar una evaluación existente' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEvaluacionDto: UpdateEvaluacionDto,
  ): Promise<Evaluacion> {
    return await this.evaluacionService.update(id, updateEvaluacionDto);
  }

  @ApiOperation({ summary: 'Eliminar una evaluación' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.evaluacionService.remove(id);
    return { message: 'Evaluación eliminada correctamente' };
  }
}