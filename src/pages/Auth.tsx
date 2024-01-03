import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/app/hooks';
import { FlexCol } from 'src/components/Flex/FlexCol';
import { Botao } from 'src/components/Form/Botao';
import { Input } from 'src/components/Form/Input';
import { setUser } from 'src/components/authSlice';
import { useCadastroUserMutation, useLoginUserMutation } from 'src/services/authApi';

const initialState = {
  nome: '',
  email: '',
  senha: '',
  confirmarSenha: '',
};

export const Auth = () => {
  const [formValue, setFormValue] = useState(initialState);

  const { nome, email, senha, confirmarSenha } = formValue;
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [
    loginUser,
    { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError },
  ] = useLoginUserMutation();

  const [
    cadastroUser,
    {
      data: cadastroData,
      isSuccess: isCadastroSuccess,
      isError: isCadastroError,
      error: cadastroError,
    },
  ] = useCadastroUserMutation();

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
      dispatch(setUser({ token: loginData.token }));
      navigate('/delivery');
    }
  }, [isLoginSuccess]);

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      return toast.error('senhas não estão iguais');
    }

    if (nome && email && senha) {
      return cadastroUser({ nome, email, senha });
    }
  };

  useEffect(() => {
    if (isCadastroSuccess) {
      toast.success('Usuário cadastrado com sucesso');
      dispatch(setUser({ token: cadastroData.token }));
      navigate('/delivery');
    }
  }, [isCadastroSuccess]);

  useEffect(() => {
    if (isLoginError) {
      toast.error('Login ou Senha Incorretos');
    }

    if (isCadastroError) {
      toast.error('Dados incorretos');
    }
  }, [isLoginError, isCadastroError]);

  return (
    <section className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400">
      <div className="h-fit w-2/3 rounded-xl bg-neutral-600 p-5 shadow-2xl md:w-96">
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
              tipo="email"
              required
              onChange={handleChange}
            />
            <Input
              titulo="Senha"
              placeholder="*******"
              tipo="password"
              required
              onChange={handleChange}
            />
            {showRegister && (
              <Input
                titulo="Confirmar Senha"
                placeholder="*******"
                tipo="password"
                required
                onChange={handleChange}
              />
            )}
            <Botao
              onClick={() => {
                !showRegister ? handleLogin() : handleCadastro();
              }}
            >
              {!showRegister ? 'LOGIN' : 'CADASTRO'}
            </Botao>
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
