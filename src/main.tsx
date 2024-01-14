import ReactDOM from 'react-dom/client'
import './app/layouts/css/style.css'

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
