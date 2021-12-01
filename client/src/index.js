import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./utils/client";



ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


