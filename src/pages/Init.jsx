import { useState, useEffect } from 'react'
import Client from '../components/Client'

const Init = () => {

  const [clients, setClients] = useState([])

  useEffect(() => {
    const getClientsApi = async () => {
      try {
        const url = import.meta.env.VITE_API_URL
        const response = await fetch(url)
        const result = await response.json()
        setClients(result);
      } catch (e) {
        console.log(e);
      }
    }

    getClientsApi()
  }, [])

  const handleDelete = async id => {
    const conf = confirm('¿Deseas eliminar este cliente?')
    if (conf) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const  response = await fetch(url, {
          method: 'DELETE'
        })
        await response.json()
        // DONT location.reload()
        const clientsArray = clients.filter(client => client.id !== id)
        setClients(clientsArray)
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>
    
      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <Client 
              key={client.id}
              client={client}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Init