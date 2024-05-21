import { Column } from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';

export class ClienteModelTypeOrm extends AbstractModel {
  @Column()
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  documento: string;

  constructor(id: string, nome: string, email: string, documento: string) {
    super();
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.documento = documento;
  }
}
