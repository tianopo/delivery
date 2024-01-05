import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Botao } from 'src/components/Form/Botao';
import { atualizarStatus } from 'src/features/pedidoSlice';
import { usePedidoPutMutation } from 'src/services/pedidoApi';

interface IAtualizarStatusPedido {
  pedidoId: string;
  statusAtual: string;
  setAtualizar: React.Dispatch<React.SetStateAction<boolean>>
}

const AtualizarStatusPedido = ({ pedidoId, statusAtual, setAtualizar }: IAtualizarStatusPedido) => {
  const [novoStatus, setNovoStatus] = useState(statusAtual);
  const [modalAberto, setModalAberto] = useState(false);
  const dispatch = useDispatch();

  const [atualizarPedido] = usePedidoPutMutation();

  const handleAtualizarStatus = async () => {
    try {
      const response = await atualizarPedido({
        id: pedidoId,
        body: { status: novoStatus },
      }).unwrap();

      if (response) {
        dispatch(atualizarStatus({ id: pedidoId, status: novoStatus }));
        setModalAberto(false);
        setAtualizar(false)
      }
    } catch (error) {
      toast.error('Erro ao atualizar o status do pedido');
    }
  };

  return (
    <div className="relative inline-block">
      <Botao onClick={() => setModalAberto(true)} className="bg-black px-2 py-2">Status</Botao>

      {modalAberto && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center w-full z-20">
          <div className="bg-white p-4 rounded-md w-11/12 h-fit">
            <h2 className="text-xl font-semibold mb-4">Atualizar Status</h2>
            <label className="block mb-2">
              Novo Status:
              <select
                className="border border-gray-300 p-2 w-full cursor-pointer"
                value={novoStatus}
                onChange={(e) => setNovoStatus(e.target.value)}
              >
                <option value="pendente">pendente</option>
                <option value="em andamento">em andamento</option>
                <option value="entregue">entregue</option>
                <option value="atrasado">atrasado</option>
              </select>
            </label>
            <div className="flex justify-end gap-2">
              <Botao onClick={() => setModalAberto(false)} className="bg-black">
                Cancelar
              </Botao>
              <Botao
                onClick={async () => {
                  setAtualizar(true);
                  await handleAtualizarStatus();
                }}
                className="bg-black"
              >
                Confirmar
              </Botao>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtualizarStatusPedido;
