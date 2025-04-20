import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateCertificadoDto {
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  @IsNotEmpty()
  @IsInt()
  usuarioId: number;

  @ApiProperty({ description: 'ID del curso', example: 2 })
  @IsNotEmpty()
  @IsInt()
  cursoId: number;

  @ApiProperty({ description: 'Fecha de emisión (YYYY-MM-DD)', type: String, format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  fecha_emision: Date;

  @ApiProperty({ description: 'URL del PDF del certificado', required: false })
  @IsOptional()
  @IsString()
  url_pdf?: string;
}