import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { EstadoPeriodo } from '../entities/periodo.entity';

export class CreatePeriodoDto {
  @ApiProperty({ description: 'Nombre del periodo', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Fecha de inicio del periodo', type: String, format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: Date;

  @ApiProperty({ description: 'Fecha de fin del periodo', type: String, format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  fecha_fin: Date;

  @ApiProperty({ description: 'Estado del periodo', enum: EstadoPeriodo })
  @IsNotEmpty()
  @IsEnum(EstadoPeriodo)
  estado: EstadoPeriodo;

  @ApiProperty({ description: 'Fecha límite de registro', type: String, format: 'date', required: false })
  @IsOptional()
  @IsDateString()
  fecha_limite_registro?: Date;

  @ApiProperty({ description: 'Fecha límite de validación', type: String, format: 'date', required: false })
  @IsOptional()
  @IsDateString()
  fecha_limite_validacion?: Date;
}