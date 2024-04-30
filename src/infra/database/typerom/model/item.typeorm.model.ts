import { CategoriaItem } from '@/domain/enum';
import { Column } from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';

export class ItemModelTypeOrm extends AbstractModel {
  @Column()
  id: string;

  @Column()
  nome: string;

  @Column()
  valor: number;

  @Column()
  categoria: CategoriaItem;

  constructor(
    id: string,
    nome: string,
    valor: number,
    categoria: CategoriaItem,
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.valor = valor;
    this.categoria = categoria;
  }
}
