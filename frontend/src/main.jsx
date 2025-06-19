import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* browser router has used to keep the UI in sync without refreshing the page  */}
    <ShopContextProvider> {/*ShopContextProvider is used to provide the context to the entire app and we can use the context value anywehere */}
      <App />
    </ShopContextProvider>
  </BrowserRouter>,
)
