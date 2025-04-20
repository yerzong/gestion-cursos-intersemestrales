import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AcademiaService } from './academia.service';
import { CreateAcademiaDto } from './dto/create-academia.dto';
import { UpdateAcademiaDto } from './dto/update-academia.dto';
import { Academia } from './entities/academia.entity';

@ApiTags('academias')
@Controller('academias')
export class AcademiaController {
  constructor(private readonly academiaService: AcademiaService) {}

  @ApiOperation({ summary: 'Obtener lista de academias con filtros opcionales' })
  @Get()
  async findAll(
    @Query('codigo') codigo?: string,
    @Query('nombre') nombre?: string,
  ): Promise<Academia[]> {
    return await this.academiaService.findAll({ codigo, nombre });
  }

  @ApiOperation({ summary: 'Obtener una academia por ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Academia> {
    return await this.academiaService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear una nueva academia' })
  @Post()
  async create(@Body() createAcademiaDto: CreateAcademiaDto): Promise<Academia> {
    return await this.academiaService.create(createAcademiaDto);
  }

  @ApiOperation({ summary: 'Actualizar una academia existente' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAcademiaDto: UpdateAcademiaDto,
  ): Promise<Academia> {
    return await this.academiaService.update(id, updateAcademiaDto);
  }

  @ApiOperation({ summary: 'Eliminar una academia' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.academiaService.remove(id);
    return { message: 'Academia eliminada correctamente' };
  }
}