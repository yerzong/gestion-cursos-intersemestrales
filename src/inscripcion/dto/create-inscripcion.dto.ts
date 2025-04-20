import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { EstadoInscripcion } from '../entities/inscripcion.entity';

export class CreateInscripcionDto {
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  @IsNotEmpty()
  @IsInt()
  usuarioId: number;

  @ApiProperty({ description: 'ID del curso', example: 2 })
  @IsNotEmpty()
  @IsInt()
  cursoId: number;

  @ApiProperty({ description: 'Fecha de inscripción (YYYY-MM-DD)', type: String, format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  fecha_inscripcion: Date;

  @ApiProperty({ description: 'Estado de la inscripción', enum: EstadoInscripcion, default: EstadoInscripcion.Inscrito, required: false })
  @IsOptional()
  @IsEnum(EstadoInscripcion)
  estado?: EstadoInscripcion;
}