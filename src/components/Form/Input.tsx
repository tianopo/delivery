import { FlexCol } from '../Flex/FlexCol';
import { IFormUsos } from './IFormUsos';
import { Label } from './Label';

interface IInput extends IFormUsos {
  titulo: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  tipo?: 'text' | 'tel' | 'date' | 'email' | 'number' | 'time' | 'datetime-local' | 'password';
}

export const Input = ({
  disabled,
  required,
  titulo,
  placeholder,
  onChange,
  value,
  tipo = 'text',
}: IInput) => {
  const palavras = titulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .map((palavra, index) =>
      index === 0
        ? palavra.toLocaleLowerCase()
        : palavra.charAt(0).toUpperCase() + palavra.slice(1),
    )
    .join('')
    .trim();

  return (
    <FlexCol className="w-full gap-1.5 py-2.5 md:w-80">
      <Label titulo={titulo} palavras={palavras} required={required} />
      <input
        id={palavras}
        name={palavras}
        type={tipo}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="complete"
        className={`
        rounded-6
        w-full
        rounded-lg
        border-2
        border-solid
        border-borda_primaria
        bg-neutral-600
        p-2
        font-low
        outline-none
        duration-300
        placeholder:text-texto_secundaria
        focus:text-white
        ${disabled ? 'opacity-80' : ''}
          `}
      />
      {/* <MensagemDeErro errors={errors} /> */}
    </FlexCol>
  );
};
