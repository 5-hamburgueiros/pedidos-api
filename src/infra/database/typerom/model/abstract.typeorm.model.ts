import {
  BaseEntity as BaseModel,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractModel extends BaseModel {
  @CreateDateColumn({ name: 'CriadoEm' })
  criadoEm: string;

  @UpdateDateColumn({ name: 'AtualizadoEm' })
  atualizadoEm: string;
}
