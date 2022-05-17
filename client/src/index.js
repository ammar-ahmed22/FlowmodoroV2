import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie" 
import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowRotateLeft, faPlay, faPause, faBriefcase, faBed } from "@fortawesome/free-solid-svg-icons";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client"
import theme from "./theme";

library.add( faPlay, faArrowRotateLeft, faPause, faBriefcase, faBed )

const root = ReactDOM.createRoot(document.getElementById('root'));


const httpLink = new HttpLink({ uri: process.env.NODE_ENV === "development" ? "http://localhost:8080/graphql" : "http://localhost:8080/graphql",})

const client = new ApolloClient({
  link: httpLink,
  //uri: process.env.NODE_ENV === "development" ? "http://localhost:8080/graphql" : "http://localhost:8080/graphql", // change to hosting url once setup
  cache: new InMemoryCache()
})

root.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <CookiesProvider>
        <ChakraProvider theme={theme} >
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </CookiesProvider>
    </ApolloProvider>
    
  </React.StrictMode>
);


