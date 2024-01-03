import { colors } from "./src/settings/colors";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaria: '#672B47',
        secundaria: '#5A1837',
        erro: '#F9564F',
        texto_primaria: '#343434',
        texto_secundaria: '#B4B4B4',
        texto_terciaria: '#FFFFFF',
        fundo_primaria: '#F6F6F6',
        fundo_secundaria: '#FFFFFF',
        fundo_terciaria: '#FBFBFB',
        borda_primaria: '#C3C3C3',
        icone_primaria: '#C3C3C3',
        icone_secundaria: '#FFFFFF',
        box_primaria: '0px 1px 4px 0px rgba(4, 4, 4, 0.30)',
      },
      fontWeight: {
        low: "400",
        normal: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
};
