import React from 'react'
import FormClient from '../components/FormClient'

const NewClient = () => {
  
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
      <p className='mt-3'>Llena los siguientes campos para registrar un cliente</p>
      <FormClient />
    </>
  )
}

export default NewClient