import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'

import {store} from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(

  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
            <App />
          </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
