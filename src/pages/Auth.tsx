import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FlexCol } from 'src/components/Flex/FlexCol';
import { Input } from 'src/components/Form/Input';
import { useLoginUserMutation } from 'src/services/authApi';

const initialState = {
  nome: '',
  email: '',
  senha: '',
  confirmSenha: '',
};

export const Auth = () => {
  const [formValue, setFormValue] = useState(initialState);

  const { nome, email, senha, confirmSenha } = formValue;
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();
  const [
    loginUser,
    { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError },
  ] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (email && senha) {
      await loginUser({ email, senha });
    } else {
      toast.error('Por favor, preencha todas as informações do campo');
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success('Usuário Logado com sucesso');
      navigate('/dashboard');
    }
  }, [isLoginSuccess]);

  return (
    <section className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400">
      <div className="h-fit w-2/3 rounded-xl bg-neutral-600 p-5 shadow-2xl">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h2 className="text-4xl font-semibold text-white">
            {!showRegister ? 'LOGIN' : 'CADASTRO'}
          </h2>
          <p className="text-white">
            {!showRegister
              ? 'Por favor, insira Email & Senha'
              : 'Por favor, insira os detalhes de Usuário'}
          </p>
          <FlexCol className="w-full items-center gap-2">
            {showRegister && (
              <Input titulo={'Nome'} placeholder="João da Silva" required onChange={handleChange} />
            )}
            <Input
              titulo="E-mail"
              placeholder="joao@dominio.com"
              required
              onChange={handleChange}
            />
            <Input titulo="Senha" placeholder="*******" required onChange={handleChange} />
            {showRegister && (
              <Input
                titulo="Confirmar Senha"
                placeholder="*******"
                required
                onChange={handleChange}
              />
            )}
            <button
              className="rounded-4 text-20 w-full rounded-lg border-2 border-solid p-4 font-normal text-white shadow-xl duration-300 ease-in-out hover:opacity-80 active:translate-y-1 md:w-32"
              type="button"
              onClick={() => handleLogin()}
            >
              {!showRegister ? 'LOGIN' : 'CADASTRO'}
            </button>
          </FlexCol>
          <h5 className="mb-0">
            {!showRegister ? (
              <FlexCol className="items-center">
                <p className="font-semibold text-white">Não tem uma conta ?</p>
                <p
                  className="cursor-pointer font-semibold text-white hover:underline"
                  onClick={() => setShowRegister(true)}
                >
                  Cadastre-se
                </p>
              </FlexCol>
            ) : (
              <FlexCol className="items-center">
                <p className="font-semibold text-white">Já tem uma conta ?</p>
                <p
                  className="cursor-pointer font-semibold text-white hover:underline"
                  onClick={() => setShowRegister(false)}
                >
                  Faça Login
                </p>
              </FlexCol>
            )}
          </h5>
        </div>
      </div>
    </section>
  );
};
