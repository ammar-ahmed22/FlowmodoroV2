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
  primary: "#AE82DA"
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


