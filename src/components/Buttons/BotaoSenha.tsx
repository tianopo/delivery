import { Flex, Icon } from '@chakra-ui/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';
import { corTexto } from 'src/settings/colors';
import { fontSize } from 'src/settings/measures';

export const BotaoSenha = (props: IBotaoSenha) => {
  const [verSenha, setVerSenha] = useState<boolean>(false);

  return (
    <Flex width="full" position="relative">
      {typeof props.children === 'function' ? props.children({ verSenha }) : props.children}
      <Flex
        as="span"
        position="absolute"
        top="50%"
        right="2%"
        transform="translateY(-50%)"
        cursor="pointer"
        zIndex={2}
        height="full"
        alignItems="center"
        onClick={() => setVerSenha(!verSenha)}
      >
        <Icon as={verSenha ? EyeSlash : Eye} fontSize={fontSize['4xl']} color={corTexto.primaria} />
      </Flex>
    </Flex>
  );
};

interface IBotaoSenha {
  children?: React.ReactNode | ((props: { verSenha: boolean }) => React.ReactNode);
}
