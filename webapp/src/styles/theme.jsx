import { extendTheme } from '@mui/joy/styles';

const palette = {
    primary: {
      solidBg: '#ff7701', 
      solidBorder: '#ff7701',
      solidHoverBg: '#ff8b33', 
      solidHoverBorder: '#ff8b33',
      solidActiveBg: '#e06600', 
      solidActiveBorder: '#e06600',
      solidDisabledBg: '#ffd0a1', 
      solidDisabledBorder: '#ffd0a1',
    },
    neutral: {
      solidBg: '#373A40',
      solidBorder: '#373A40',
      solidHoverBg: '#4a4d55', 
      solidHoverBorder: '#4a4d55',
      solidActiveBg: '#2d2f34', 
      solidActiveBorder: '#2d2f34',
      solidDisabledBg: '#a0a3a9', 
      solidDisabledBorder: '#a0a3a9',
    },
    success: {
      solidBg: '#557C56', 
      solidBorder: '#557C56',
      solidHoverBg: '#669a68', 
      solidHoverBorder: '#669a68',
      solidActiveBg: '#456545', 
      solidActiveBorder: '#456545',
      solidDisabledBg: '#c6d7c7', 
      solidDisabledBorder: '#c6d7c7',
    },
    danger: {
      solidBg: '#B43F3F', 
      solidBorder: '#B43F3F',
      solidHoverBg: '#c45757', 
      solidHoverBorder: '#c45757',
      solidActiveBg: '#9e3636', 
      solidActiveBorder: '#9e3636',
      solidDisabledBg: '#e6b2b2', 
      solidDisabledBorder: '#e6b2b2',
    },
    warning: {
      solidBg: '#686D76', 
      solidBorder: '#686D76',
      solidHoverBg: '#7e838b', 
      solidHoverBorder: '#7e838b',
      solidActiveBg: '#5a5f66',
      solidActiveBorder: '#5a5f66',
      solidDisabledBg: '#c3c5c8', 
      solidDisabledBorder: '#c3c5c8',
    },
    info: {
      solidBg: '#686D76', 
      solidBorder: '#686D76',
      solidHoverBg: '#7e838b', 
      solidHoverBorder: '#7e838b',
      solidActiveBg: '#5a5f66', 
      solidActiveBorder: '#5a5f66',
      solidDisabledBg: '#c3c5c8', 
      solidDisabledBorder: '#c3c5c8',
    },
  };
  
const theme = extendTheme({
    cssVarPrefix: 'template', 
    colorSchemes: {
        light: { palette }, 
        dark: { palette },
    },
})

export default theme; 