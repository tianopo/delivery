import { HTMLAttributes, ReactNode } from 'react';

interface IFlexCol extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const FlexCol = ({ children, className }: IFlexCol) => {
  return <div className={`flex flex-col ${className}`}> {children}</div>;
};
