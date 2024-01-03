import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCount((contando) => contando - 1);
    }, 1000);

    count === 0 && navigate('/auth');

    return () => clearInterval(intervalo);
  }, [count, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center p-6">
      <div className="h-fit w-fit">
        <p>Pessoa não autenticada, Redirecionando em {count} segundos</p>
      </div>
    </div>
  );
};
