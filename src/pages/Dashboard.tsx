import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/app/hooks';
import { Botao } from 'src/components/Form/Botao';
import { logout } from 'src/components/authSlice';

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Usuário saiu com sucesso');
    navigate('/auth');
  };
  return (
    <section className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400">
      <div className="h-fit w-2/3 rounded-xl bg-neutral-600 p-5 shadow-2xl">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h2 className="text-4xl font-semibold text-white">Delivery</h2>
          <Botao onClick={() => handleLogout()}>Sair</Botao>
        </div>
      </div>
    </section>
  );
};
