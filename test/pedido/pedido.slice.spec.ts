import pedidoReducer, { PedidoArrayState, atualizarStatus, obter } from 'src/features/pedidoSlice';

describe('pedidoSlice', () => {
  let initialState: PedidoArrayState;

  beforeEach(() => {
    initialState = {
      pedidos: [],
    };
  });

  it('should handle obter', () => {
    const novoPedido = {
      id: '1',
      nome: 'Produto A',
      endereco: 'Endereço 123',
      status: 'Pendente',
    };

    const nextState = pedidoReducer(initialState, obter(novoPedido));

    expect(nextState.pedidos).toHaveLength(1);
    expect(nextState.pedidos[0]).toEqual(novoPedido);
  });

  it('should handle atualizarStatus', () => {
    const estadoInicial: PedidoArrayState = {
      pedidos: [
        {
          id: '1',
          nome: 'Produto A',
          endereco: 'Endereço 123',
          status: 'Pendente',
        },
        {
          id: '2',
          nome: 'Produto B',
          endereco: 'Endereço 456',
          status: 'Em andamento',
        },
      ],
    };

    const novoStatus = 'Concluído';
    const pedidoId = '2';

    const nextState = pedidoReducer(estadoInicial, atualizarStatus({ id: pedidoId, status: novoStatus }));

    expect(nextState.pedidos).toHaveLength(2);
    const pedidoAtualizado = nextState.pedidos.find((p) => p.id === pedidoId);

    expect(pedidoAtualizado).toBeTruthy();
    expect(pedidoAtualizado?.status).toEqual(novoStatus);
  });
});
