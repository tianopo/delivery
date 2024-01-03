import { useState } from 'react';

const initialState = {
  nome: '',
  email: '',
  senha: '',
  confirmSenha: '',
};

export const Auth = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [showRegister, setShowRegister] = useState(false);

  return <section className="flex h-full w-full items-center justify-center">oi</section>;
};
