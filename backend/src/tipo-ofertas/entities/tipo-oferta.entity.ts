import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('academia.tipo_ofertas')
export class TipoOferta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 50 })
  nombre: string;

  @Column({ type: 'bit' })
  estado: boolean;
}