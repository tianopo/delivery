const cores = {
  principal: {
    primaria: '#672B47',
    secundaria: '#5A1837',
    erro: '#F9564F',
  },
  texto: {
    primaria: '#343434',
    secundaria: '#B4B4B4',
    terciaria: '#FFFFFF',
  },
  fundo: {
    primaria: '#F6F6F6',
    secundaria: '#FFFFFF',
    terciaria: '#FBFBFB',
  },
  borda: {
    primaria: '#C3C3C3',
  },
  icone: {
    primaria: '#C3C3C3',
    secundaria: '#FFFFFF',
  },
  boxShadow: {
    primaria: '0px 1px 4px 0px rgba(4, 4, 4, 0.30)',
  },
}

const corPrimaria = cores.principal.primaria
const corSecundaria = cores.principal.secundaria
const corErro = cores.principal.erro
const corTexto = cores.texto
const corFundo = cores.fundo
const corBorda = cores.borda
const corIcone = cores.icone
const corBoxShadow = cores.boxShadow

export {
  corBorda, corBoxShadow, corErro, corFundo, corIcone, corPrimaria,
  corSecundaria, corTexto
}

