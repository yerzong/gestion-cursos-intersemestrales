import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MaxLength, IsEnum, IsOptional, IsInt } from 'class-validator';
import { RolPrincipal } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nombre del usuario', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ description: 'Correo del usuario', maxLength: 100 })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  correo: string;

  @ApiProperty({ description: 'Contraseña del usuario', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  contraseña: string;

  @ApiProperty({ description: 'Rol principal del usuario', enum: RolPrincipal })
  @IsNotEmpty()
  @IsEnum(RolPrincipal)
  rol_principal: RolPrincipal;

  @ApiProperty({ description: 'ID de la academia a la que pertenece el usuario (opcional)' })
  @IsOptional()
  @IsInt()
  academiaId?: number;
}