import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateNotificacionDto {
  @ApiProperty({ description: 'Mensaje de la notificación' })
  @IsNotEmpty()
  @IsString()
  mensaje: string;

  @ApiProperty({ description: 'ID del usuario destinatario', example: 1 })
  @IsNotEmpty()
  @IsInt()
  usuarioId: number;
}