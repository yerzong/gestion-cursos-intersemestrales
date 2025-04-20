import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsEnum, IsDateString, IsOptional, IsString } from 'class-validator';
import { Calificacion } from '../entities/evaluacion.entity';

export class CreateEvaluacionDto {
  @ApiProperty({ description: 'ID del usuario evaluado', example: 1 })
  @IsNotEmpty()
  @IsInt()
  usuarioId: number;

  @ApiProperty({ description: 'ID del curso evaluado', example: 2 })
  @IsNotEmpty()
  @IsInt()
  cursoId: number;

  @ApiProperty({ description: 'Calificación', enum: Calificacion })
  @IsNotEmpty()
  @IsEnum(Calificacion)
  calificacion: Calificacion;

  @ApiProperty({ description: 'Fecha de evaluación (YYYY-MM-DD)', type: String, format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  fecha_evaluacion: Date;

  @ApiProperty({ description: 'Observaciones', required: false })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiProperty({ description: 'ID del evaluador (opcional)', required: false })
  @IsOptional()
  @IsInt()
  evaluadorId?: number;
}