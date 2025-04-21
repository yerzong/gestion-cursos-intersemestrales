import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Academia } from 'src/academia/entities/academia.entity';

export enum RolPrincipal {
  Administrador = 'Administrador',
  JefeAcademia = 'Jefe de Academia',
  Docente = 'Docente',
  Instructor = 'Instructor',
}

@Entity({ name: 'usuarios' })
export class Usuario {
  @ApiProperty({ description: 'Identificador del usuario' })
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id: number;

  @ApiProperty({ description: 'Nombre del usuario', maxLength: 100 })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ description: 'Correo del usuario', maxLength: 100 })
  @Column({ type: 'varchar', length: 100, unique: true })
  correo: string;

  @ApiProperty({ description: 'Contraseña del usuario', maxLength: 255 })
  @Column({ name: 'contraseña', type: 'varchar', length: 255 })
  contraseña: string;

  @ApiProperty({ description: 'Rol principal del usuario', enum: RolPrincipal })
  @Column({ type: 'enum', enum: RolPrincipal })
  rol_principal: RolPrincipal;

  @ApiProperty({ description: 'Academia a la que pertenece el usuario', required: false })
  @ManyToOne(() => Academia, { nullable: true })
  @JoinColumn({ name: 'academia_id' })
  academia?: Academia | null;
}