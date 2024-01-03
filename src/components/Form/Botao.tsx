import { HTMLAttributes, ReactNode } from 'react';

interface IBotao extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  onClick?: () => void;
}

export const Botao = ({ onClick, children, className }: IBotao) => {
  return (
    <button
      type="button"
      className={`
      rounded-4
      text-20
      w-full
      rounded-lg
      border-2
      border-solid
      p-4
      font-normal
      text-white
      shadow-xl
      duration-300
      ease-in-out
      hover:opacity-80
      active:translate-y-1
      md:w-32
      ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
