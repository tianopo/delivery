import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/app/hooks';
import { Botao } from 'src/components/Form/Botao';
import { logout } from 'src/features/authSlice';
import { usePedidoGetQuery } from "src/services/pedidoApi";

const initialState = {
  nome: '',
  endereco: '',
  status: '',
};

export const Delivery = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: pedidos, error, isLoading } = usePedidoGetQuery();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Usuário saiu com sucesso');
    navigate('/auth');
  };

  return (
    <section className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400">
      <div className="h-fit w-2/3 rounded-xl bg-neutral-600 p-5 shadow-2xl md:w-96">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h2 className="text-4xl font-semibold text-white">Delivery</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={4}>Carregando...</td></tr>}
              {error && <tr><td colSpan={4}>Erro ao carregar pedidos.</td></tr>}
              {pedidos && pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.nome}</td>
                  <td>{pedido.endereco}</td>
                  <td>{pedido.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Botao onClick={() => handleLogout()}>Sair</Botao>
        </div>
      </div>
    </section>
  );
};
