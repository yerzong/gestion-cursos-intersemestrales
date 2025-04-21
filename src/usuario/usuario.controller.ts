import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @ApiOperation({ summary: 'Obtener lista de usuarios con filtros opcionales' })
  @ApiQuery({ name: 'nombre', required: false, type: String })
  @ApiQuery({ name: 'correo', required: false, type: String })
  @ApiQuery({ name: 'rol_principal', required: false, type: String })
  @Get()
  async findAll(
    @Query('nombre') nombre?: string,
    @Query('correo') correo?: string,
    @Query('rol_principal') rol_principal?: string,
  ): Promise<Usuario[]> {
    return await this.usuarioService.findAll({ nombre, correo, rol_principal });
  }

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return await this.usuarioService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return await this.usuarioService.update(id, updateUsuarioDto);
  }

  @ApiOperation({ summary: 'Eliminar un usuario' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.usuarioService.remove(id);
    return { message: 'Usuario eliminado correctamente' };
  }
}