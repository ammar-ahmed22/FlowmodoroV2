import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie" 
import { mode } from "@chakra-ui/theme-tools"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowRotateLeft, faPlay, faPause, faBriefcase, faBed } from "@fortawesome/free-solid-svg-icons";

library.add( faPlay, faArrowRotateLeft, faPause, faBriefcase, faBed )

const root = ReactDOM.createRoot(document.getElementById('root'));


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
  fonts,
  colors,
  config,
  styles
})

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <ChakraProvider theme={theme} >
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </CookiesProvider>
    
  </React.StrictMode>
);


