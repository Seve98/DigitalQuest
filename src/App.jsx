
import {  RouterProvider } from 'react-router'
import './App.css'
import routes from './routing/routes'
import Layout from './layout/Layout'
import SessionProvider from './context/SessionProvider'
import FavoritesProvider from './context/FavoritesProvider'
import {AOSProvider} from './context/AosContext'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <>
    
    <SessionProvider>  
      <FavoritesProvider>
     <AOSProvider>
    <RouterProvider router={routes} />
    <Toaster 
              position="top-center" 
              reverseOrder={false} 
              toastOptions={{
                duration: 4000,
                style: {
                  fontSize: '14px',
                  padding: '10px 20px',
                }
              }}
            />
    </AOSProvider>
    </FavoritesProvider>
    </SessionProvider>
    
    </>
  )
}

export default App
