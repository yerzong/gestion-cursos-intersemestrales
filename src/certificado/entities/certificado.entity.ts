import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Entity({ name: 'certificados' })
export class Certificado {
  @ApiProperty({ description: 'Identificador del certificado' })
  @PrimaryGeneratedColumn({ name: 'id_certificado' })
  id: number;

  @ApiProperty({ description: 'Fecha de emisión del certificado', type: String, format: 'date' })
  @Column({ type: 'date' })
  fecha_emision: Date;

  @ApiProperty({ description: 'URL del archivo PDF del certificado', required: false })
  @Column({ type: 'text', nullable: true })
  url_pdf?: string;

  @ApiProperty({ description: 'Usuario al que pertenece el certificado' })
  @ManyToOne(() => Usuario, { nullable: false })
  usuario: Usuario;

  @ApiProperty({ description: 'Curso asociado al certificado' })
  @ManyToOne(() => Curso, { nullable: false })
  curso: Curso;
}