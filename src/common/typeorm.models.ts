import {
  ClienteModelTypeOrm,
  ComboModelTypeOrm,
  ItemModelTypeOrm,
  PedidoHistoricoModelTypeOrm,
  PedidoModelTypeOrm,
} from '@/infra/database/typerom/model';

export const typeOrmEntities = [
  ClienteModelTypeOrm,
  ItemModelTypeOrm,
  ComboModelTypeOrm,
  PedidoModelTypeOrm,
  PedidoHistoricoModelTypeOrm,
];
