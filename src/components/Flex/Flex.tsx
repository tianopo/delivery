import { HTMLAttributes, ReactNode } from 'react';

interface IFlex extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Flex = ({ children, className }: IFlex) => {
  return <div className={`flex ${className}`}> {children}</div>;
};
