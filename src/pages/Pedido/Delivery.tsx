import { Door } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Botao } from "src/components/Form/Botao";
import { Input } from "src/components/Form/Input";
import { logout } from 'src/features/authSlice';
import { usePedidoGetQuery, usePedidoPostMutation } from "src/services/pedidoApi";
import AtualizarStatusPedido from "./AtualizarStatusPedido";

const initialState = {
  nome: '',
  endereco: '',
};

export const Delivery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [atualizar, setAtualizar] = useState(false)
  const [novoPedido, setNovoPedido] = useState(initialState);

  const { data: pedidos, error, isLoading, refetch } = usePedidoGetQuery();
  const [criarPedido] = usePedidoPostMutation();

  useEffect(() => {
    refetch()
  }, [atualizar]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Usuário saiu com sucesso');
    navigate('/auth');
  };

  const handleCriarPedido = async () => {
    try {
      const response = await criarPedido(novoPedido).unwrap();
      if (response) {
        toast.success('Pedido criado com sucesso');
        setAtualizar((prev) => !prev);
        setNovoPedido(initialState);
      }
    } catch (error) {
      toast.error('Erro ao criar o pedido');
    }
  };

  const handleChangeNovoPedido = (e) => {
    const { name, value } = e.target;
    setNovoPedido((a) => ({ ...a, [name]: value }));
  };

  return (
    <section className="flex h-full items-center justify-center bg-neutral-800">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        <h2 className="text-4xl font-semibold text-white">Delivery</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-white">Novo Pedido</h3>
          <div className="flex flex-col gap-2">
            <Input
              titulo="Nome"
              placeholder="Nome"
              value={novoPedido.nome}
              onChange={handleChangeNovoPedido}
            />
            <Input
              titulo="Endereço"
              placeholder="Endereço"
              value={novoPedido.endereco}
              onChange={handleChangeNovoPedido}
            />
            <Botao onClick={handleCriarPedido} className="bg-black">
              Criar Pedido
            </Botao>
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-300 rounded-6">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Endereço</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={4} className="py-4 px-4">Carregando...</td></tr>}
            {error && <tr><td colSpan={4} className="py-4 px-4 text-red-600">Erro ao carregar pedidos.</td></tr>}
            {pedidos && pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td className="py-2 px-4 border-b">{pedido.nome}</td>
                <td className="py-2 px-4 border-b">{pedido.endereco}</td>
                <td className="py-2 px-4 border-b">{pedido.status}</td>
                <td className="py-2 px-4 border-b">
                  <AtualizarStatusPedido pedidoId={pedido.id} statusAtual={pedido.status} setAtualizar={setAtualizar} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Botao onClick={() => handleLogout()} className="bg-black flex gap-2 justify-center text-2xl items-center px-2 py-1">Sair <Door size={24} /></Botao>
      </div>
    </section>
  );
};
