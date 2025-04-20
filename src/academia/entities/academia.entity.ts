import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'academias' })
export class Academia {
  @ApiProperty({ description: 'Identificador de la academia' })
  @PrimaryGeneratedColumn({ name: 'id_academia' })
  id: number;

  @ApiProperty({ description: 'Código único de la academia', maxLength: 10 })
  @Column({ type: 'varchar', length: 10, unique: true })
  codigo: string;

  @ApiProperty({ description: 'Nombre de la academia', maxLength: 100 })
  @Column({ name: 'nombre_academia', type: 'varchar', length: 100 })
  nombre: string;
}