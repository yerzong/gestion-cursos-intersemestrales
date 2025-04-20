import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NotificacionService } from './notificacion.service';
import { Notificacion } from './entities/notificacion.entity';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';

@ApiTags('notificaciones')
@Controller('notificaciones')
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  @ApiOperation({ summary: 'Obtener lista de notificaciones con filtros opcionales' })
  @Get()
  async findAll(@Query('usuarioId') usuarioId?: number): Promise<Notificacion[]> {
    return await this.notificacionService.findAll({ usuarioId });
  }

  @ApiOperation({ summary: 'Obtener una notificación por ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Notificacion> {
    return await this.notificacionService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear una nueva notificación' })
  @Post()
  async create(@Body() createNotificacionDto: CreateNotificacionDto): Promise<Notificacion> {
    return await this.notificacionService.create(createNotificacionDto);
  }

  @ApiOperation({ summary: 'Actualizar una notificación existente' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotificacionDto: UpdateNotificacionDto,
  ): Promise<Notificacion> {
    return await this.notificacionService.update(id, updateNotificacionDto);
  }

  @ApiOperation({ summary: 'Eliminar una notificación' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.notificacionService.remove(id);
    return { message: 'Notificación eliminada correctamente' };
  }
}