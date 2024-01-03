import { HTMLAttributes, ReactNode } from 'react';

interface IFlexRow extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const FlexRow = ({ children, className }: IFlexRow) => {
  return <div className={`flex flex-row items-center ${className}`}> {children}</div>;
};
