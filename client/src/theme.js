import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"

const fonts = {
    body: "Fira Code, monospace",
    heading: "Fira Code, monospace"
  }
  
  const colors = {
    primary: {
      50: '#f5e9ff',
      100: '#dac3f1',
      200: '#bf9de3',
      300: '#a675d6',
      400: '#8c4eca',
      500: '#7335b0',
      600: '#59298a',
      700: '#401d63',
      800: '#26103d',
      900: '#10041a',
    },
    lime: {
      50: '#f2ffde',
     100: '#defcb2',
     200: '#caf884',
     300: '#b5f554',
     400: '#a1f226',
     500: '#88d90d',
     600: '#69a905',
     700: '#4a7801',
     800: '#2b4800',
     900: '#0b1900',
    }
  }
  
  
  
  const config = {
    initialColorMode: "dark",
    useSystemColorMode: false
  }
  
  const styles = {
    global: props => ({
      body: {
        bg: mode("white", "gray.800")(props)
      }
    })
  }

const theme = extendTheme({
    colors,
    fonts,
    config,
    styles
})

export default theme;