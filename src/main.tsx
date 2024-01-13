import ReactDOM from 'react-dom/client'
import './app/layouts/css/style.css'
import './app/layouts/css/dashboard.css'
import './app/layouts/css/transaction.css'
import './app/layouts/css/bankaccount.css'
import './app/layouts/css/left.css'
import './app/layouts/css/envelope.css'
import './app/layouts/css/payee.css'
import './app/layouts/css/bank.css'
import './app/layouts/css/bankaccounttype.css'
import './app/layouts/css/category.css'
import './app/layouts/css/app.css'
import 'semantic-ui-css/semantic.min.css'
import { StoreContext, store } from './app/api/stores/stores'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './app/api/routers/rootrouter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router}/>
    </StoreContext.Provider>
  </React.StrictMode >
)
