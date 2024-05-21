import { Column } from 'typeorm';
import { ItemModelTypeOrm } from './';
import { AbstractModel } from './abstract.typeorm.model';

export class ComboModelTypeOrm extends AbstractModel {
  @Column()
  id: string;

  @Column()
  nome: string;

  @Column()
  valor: number;

  @Column()
  itens: ItemModelTypeOrm[];

  constructor(
    id: string,
    nome: string,
    valor: number,
    itens: ItemModelTypeOrm[],
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.valor = valor;
    this.itens = itens;
  }
}
