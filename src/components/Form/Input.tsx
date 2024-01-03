import {
  Box,
  Input as InputChakra,
  InputGroup,
  InputLeftElement,
  InputProps as InputPropsChakra,
  InputRightElement,
} from '@chakra-ui/react'
import { ForwardRefRenderFunction, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { corBorda, corErro, corFundo, corTexto } from "settings/colors"
import { borderRadius, fontSize, padding } from "settings/measures"
import { useContextSelector } from 'use-context-selector'
import { ContainerContexto } from './Container'
import { createContext } from "vm"

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (props: IInput, ref) => {
  const ContainerContexto = createContext<IContainerContexto>({
    required: false,
    name: '',
    disabled: false,
    readOnly: false,
    htmlFor: '',
  })

  const required = useContextSelector(ContainerContexto, (value) => value.required)
  const name = useContextSelector(ContainerContexto, (value) => value.name)
  const disabled = useContextSelector(ContainerContexto, (value) => value.disabled)
  const readOnly = useContextSelector(ContainerContexto, (value) => value.readOnly)
  const htmlFor = useContextSelector(ContainerContexto, (value) => value.htmlFor)

  const getErroHookForm = (obj: Record<any, any>, path: string) => {
    const travel = (regexp: RegExp) =>
      String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)

    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)

    return result
  }

  const formContext = useFormContext()
  const { register, formState } = formContext || {}
  const { errors } = formState || {}
  const { manual, ...rest } = props

  const inputRegister = register ? register(name, { required }) : undefined

  return (
    <Box alignItems={'center'} width={'100%'} as="label" {...(htmlFor && { htmlFor, zIndex: 9, cursor: 'pointer' })}>
      <InputGroup>
        <InputChakra
          {...(htmlFor && { pointerEvents: 'none' })}
          id={name}
          ref={ref}
          {...(!manual && inputRegister)}
          onChange={(e) => {
            inputRegister?.onChange(e)
            props.onChange && props.onChange(e)
          }}
          readOnly={readOnly}
          isDisabled={disabled}
          borderRadius={borderRadius["2xl"]}
          borderWidth="1px"
          borderStyle="solid"
          borderColor={corBorda.primaria}
          background={corFundo.secundaria}
          paddingX={padding["2xl"]}
          paddingY="6px"
          height="fit-content"
          outline="none"
          fontSize={fontSize["3xl"]}
          _placeholder={{
            color: corTexto.secundaria,
            fontSize: fontSize["3xl"],
            height: 'fit-content',
          }}
          _hover={{
            ...(!disabled && {
              borderColor: corBorda.primaria,
            }),
          }}
          _disabled={{
            opacity: 0.7,
            cursor: 'not-allowed',
            bg: corFundo.secundaria,
          }}
          color={corTexto.primaria}
          isInvalid={!!getErroHookForm(errors, name)}
          autoFocus={!!getErroHookForm(errors, name)}
          focusBorderColor={corBorda['input-focus']}
          errorBorderColor={corErro}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          {...rest}
          autoComplete="new-password"
        />
        {props.lefticon && (
          <InputLeftElement justifyContent={'center'} h="100%" pointerEvents="none" color={corTexto.secundaria}>
            {props.lefticon}
          </InputLeftElement>
        )}

        {props.righticon && (
          <InputRightElement justifyContent={'center'} h="100%" pointerEvents="none" color={corTexto.secundaria}>
            {props.righticon}
          </InputRightElement>
        )}
      </InputGroup>
    </Box >
  )
}

InputBase.displayName = 'Input'
export const Input = forwardRef(InputBase)
type OmitInputProps = 'name' | 'disabled'
export type IInput = Omit<InputPropsChakra, OmitInputProps> & {
  lefticon?: React.ReactNode
  righticon?: React.ReactNode
  manual?: boolean
}

interface IContainerContexto {
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  name: string
  htmlFor?: string
}
