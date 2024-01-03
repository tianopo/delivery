import { FlexRow } from '../Flex/FlexRow';
import { IFormUsos } from './IFormUsos';

interface ILabel extends IFormUsos {
  titulo: string;
  palavras: string;
}

export const Label = ({ required, titulo, palavras }: ILabel) => {
  return (
    <FlexRow>
      <label htmlFor={palavras} className="block w-fit">
        <p className={`text-16 leading-20 font-normal text-white`}>
          {titulo} {required && <span className={`text-erro`}>*</span>}
        </p>
      </label>
    </FlexRow>
  );
};
