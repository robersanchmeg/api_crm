import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Init from './pages/Init'
import NewClient from './pages/NewClient'
import ClientEdit from './pages/ClientEdit'
import ClientView from './pages/ClientView'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/clients' element={<Layout />}>
          <Route index element={<Init />} />
          <Route path='new' element={<NewClient />}/>
          <Route path='edit/:id' element={<ClientEdit />}/>
          <Route path=':id' element={<ClientView />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
