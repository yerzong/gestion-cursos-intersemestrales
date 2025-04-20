import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Periodo } from './entities/periodo.entity';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { EstadoPeriodo } from './entities/periodo.entity';
import { PeriodosService } from './periodo.service';

@ApiTags('periodos')
@Controller('periodos')
export class PeriodosController {
  constructor(private readonly periodosService: PeriodosService) {}

  @ApiOperation({ summary: 'Obtener lista de periodos con filtros opcionales' })
  @Get()
  async findAll(
    @Query('nombre') nombre?: string,
    @Query('estado') estado?: EstadoPeriodo,
  ): Promise<Periodo[]> {
    return await this.periodosService.findAll({ nombre, estado });
  }

  @ApiOperation({ summary: 'Obtener un periodo por ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Periodo> {
    return await this.periodosService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo periodo' })
  @Post()
  async create(@Body() createPeriodoDto: CreatePeriodoDto): Promise<Periodo> {
    return await this.periodosService.create(createPeriodoDto);
  }

  @ApiOperation({ summary: 'Actualizar un periodo existente' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePeriodoDto: UpdatePeriodoDto,
  ): Promise<Periodo> {
    return await this.periodosService.update(id, updatePeriodoDto);
  }

  @ApiOperation({ summary: 'Eliminar un periodo' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.periodosService.remove(id);
    return { message: 'Periodo eliminado correctamente' };
  }
}