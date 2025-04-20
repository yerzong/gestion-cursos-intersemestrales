import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity({ name: 'notificaciones' })
export class Notificacion {
  @ApiProperty({ description: 'Identificador de la notificación' })
  @PrimaryGeneratedColumn({ name: 'id_notificacion' })
  id: number;

  @ApiProperty({ description: 'Mensaje de la notificación' })
  @Column({ type: 'text' })
  mensaje: string;

  @ApiProperty({ description: 'Usuario destinatario' })
  @ManyToOne(() => Usuario, { nullable: false })
  usuario: Usuario;

  @ApiProperty({ description: 'Fecha de envío de la notificación', type: String })
  @CreateDateColumn({ name: 'fecha_envio', type: 'timestamp' })
  fecha_envio: Date;

  @ApiProperty({ description: 'Indica si la notificación ha sido leída', default: false })
  @Column({ type: 'boolean', default: false })
  leido: boolean;
}