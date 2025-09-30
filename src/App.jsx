
import {  RouterProvider } from 'react-router'
import './App.css'
import routes from './routing/routes'
import Layout from './layout/Layout'
import SessionProvider from './context/SessionProvider'
import FavoritesProvider from './context/FavoritesProvider'
function App() {
  return (
    <>
    
    <SessionProvider>
      <FavoritesProvider>
    <RouterProvider router={routes} />
    </FavoritesProvider>
    </SessionProvider>
    
    </>
  )
}

export default App
