import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { RolPrincipal } from 'src/usuario/entities/usuario.entity';

export class CreateRolUsuarioDto {
  @ApiProperty({ description: 'ID del usuario al que se asigna el rol' })
  @IsNotEmpty()
  @IsInt()
  usuarioId: number;

  @ApiProperty({ description: 'Rol asignado', enum: RolPrincipal })
  @IsNotEmpty()
  @IsEnum(RolPrincipal)
  rol: RolPrincipal;
}