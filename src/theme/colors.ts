import tailwindColors from 'tailwindcss/colors';

const colors = {
  primary: '#24366E',
  alert: {
    success: '#2DAC3E',
    error: '#DE3737',
  },
  black: tailwindColors.black,
  white: tailwindColors.white,
  transparent: tailwindColors.transparent,
  neutral: tailwindColors.neutral,
} as const;

export default colors;
