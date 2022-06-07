import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from 'stores';
import { ToastContainer } from 'react-toastify';
import 'assets/fonts/stylesheet.css';
import 'react-toastify/dist/ReactToastify.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { BrowserRouter as Router } from 'react-router-dom';

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 3000;
  return library;
}

ReactDOM.render(
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <React.StrictMode>
          <App />
          <ToastContainer pauseOnHover={false} newestOnTop={true} autoClose={3000} limit={1} />
        </React.StrictMode>
      </Router>
    </Web3ReactProvider>
  </Provider>,
  document.getElementById('root'),
);
