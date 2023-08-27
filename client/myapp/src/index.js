import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import ApplyChange from './redux/rootReducer';

const store = createStore(ApplyChange);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <App />

    </Provider>

  </React.StrictMode>

);


reportWebVitals();

// redux ::: - not working - 

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>

// );
