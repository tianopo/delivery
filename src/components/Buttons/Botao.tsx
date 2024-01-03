import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { corFundo, corPrimaria, corSecundaria } from 'src/settings/colors';
import { borderRadius, padding } from 'src/settings/measures';

export const Botao = ({ children, onClick }: IBotao) => {
  return (
    <Button
      width={{ base: '100%', md: '85px' }}
      height="46px"
      cursor="pointer"
      _active={{
        transform: 'scale(0.98)',
      }}
      _focus={{}}
      borderWidth={`1px`}
      borderColor={corSecundaria}
      borderRadius={borderRadius.lg}
      display="flex"
      fontWeight={'400'}
      p={padding['2xl']}
      bg={corFundo.primaria}
      _hover={{
        opacity: 0.5,
      }}
      color={corPrimaria}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

interface IBotao {
  children: ReactNode;
  onClick: () => void;
}
