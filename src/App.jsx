
import {  RouterProvider } from 'react-router'
import './App.css'
import routes from './routing/routes'
import Layout from './layout/Layout'
import SessionProvider from './context/SessionProvider'
import FavoritesProvider from './context/FavoritesProvider'
import {AOSProvider} from './context/AosContext'
function App() {
  return (
    <>
    
    <SessionProvider>
      <FavoritesProvider>
     <AOSProvider>
    <RouterProvider router={routes} />
    </AOSProvider>
    </FavoritesProvider>
    </SessionProvider>
    
    </>
  )
}

export default App
