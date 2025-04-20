import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario, RolPrincipal } from 'src/usuario/entities/usuario.entity';

@Entity({ name: 'roles_usuarios' })
export class RolUsuario {
  @ApiProperty({ description: 'Identificador del rol del usuario' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Usuario asociado' })
  @ManyToOne(() => Usuario, { nullable: false })
  usuario: Usuario;

  @ApiProperty({ description: 'Rol del usuario', enum: RolPrincipal })
  @Column({ type: 'enum', enum: RolPrincipal })
  rol: RolPrincipal;
}