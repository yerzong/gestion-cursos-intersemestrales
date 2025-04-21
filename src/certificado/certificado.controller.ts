import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CertificadoService } from './certificado.service';
import { Certificado } from './entities/certificado.entity';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

@ApiTags('certificados')
@Controller('certificados')
export class CertificadoController {
  constructor(private readonly certificadoService: CertificadoService) {}

  @ApiOperation({ summary: 'Obtener lista de certificados con filtros opcionales' })
  @ApiQuery({ name: 'usuarioId', required: false, type: Number })
  @ApiQuery({ name: 'cursoId', required: false, type: Number })
  @Get()
  async findAll(
    @Query('usuarioId') usuarioId?: number,
    @Query('cursoId') cursoId?: number,
  ): Promise<Certificado[]> {
    return await this.certificadoService.findAll({ usuarioId, cursoId });
  }

  @ApiOperation({ summary: 'Obtener un certificado por ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Certificado> {
    return await this.certificadoService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo certificado' })
  @Post()
  async create(@Body() createCertificadoDto: CreateCertificadoDto): Promise<Certificado> {
    return await this.certificadoService.create(createCertificadoDto);
  }

  @ApiOperation({ summary: 'Actualizar un certificado existente' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCertificadoDto: UpdateCertificadoDto,
  ): Promise<Certificado> {
    return await this.certificadoService.update(id, updateCertificadoDto);
  }

  @ApiOperation({ summary: 'Eliminar un certificado' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.certificadoService.remove(id);
    return { message: 'Certificado eliminado correctamente' };
  }
}