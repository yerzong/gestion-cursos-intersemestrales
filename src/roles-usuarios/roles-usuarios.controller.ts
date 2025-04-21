import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RolesUsuariosService } from './roles-usuarios.service';
import { CreateRolUsuarioDto } from './dto/create-roles-usuario.dto';
import { UpdateRolUsuarioDto } from './dto/update-roles-usuario.dto';
import { RolUsuario } from './entities/roles-usuario.entity';

@ApiTags('roles-usuarios')
@Controller('roles-usuarios')
export class RolesUsuariosController {
  constructor(private readonly rolesUsuariosService: RolesUsuariosService) {}

  @ApiOperation({ summary: 'Obtener lista de roles de usuario con filtros opcionales' })
  @ApiQuery({ name: 'rol', required: false, type: String })
  @ApiQuery({ name: 'usuarioId', required: false, type: Number })
  @Get()
  async findAll(
    @Query('rol') rol?: string,
    @Query('usuarioId') usuarioId?: number,
  ): Promise<RolUsuario[]> {
    return await this.rolesUsuariosService.findAll({ rol, usuarioId });
  }

  @ApiOperation({ summary: 'Obtener un rol de usuario por ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RolUsuario> {
    return await this.rolesUsuariosService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo rol para un usuario' })
  @Post()
  async create(@Body() createRolUsuarioDto: CreateRolUsuarioDto): Promise<RolUsuario> {
    return await this.rolesUsuariosService.create(createRolUsuarioDto);
  }

  @ApiOperation({ summary: 'Actualizar un rol de usuario existente' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRolUsuarioDto: UpdateRolUsuarioDto,
  ): Promise<RolUsuario> {
    return await this.rolesUsuariosService.update(id, updateRolUsuarioDto);
  }

  @ApiOperation({ summary: 'Eliminar un rol de usuario' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.rolesUsuariosService.remove(id);
    return { message: 'Rol de usuario eliminado correctamente' };
  }
}