
import {  RouterProvider } from 'react-router'
import './App.css'
import routes from './routing/routes'
import Layout from './layout/Layout'
function App() {
  return (
    <>
   
    <RouterProvider router={routes} />

    </>
  )
}

export default App
