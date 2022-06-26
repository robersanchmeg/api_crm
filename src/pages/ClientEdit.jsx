import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormClient from '../components/FormClient'

const ClientEdit = () => {

  const { id } = useParams()

  const [client, setClient] = useState([])

  const [charging, setCharging] = useState(true)

  useEffect(() => {
    const getClientApi = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const response = await fetch(url)
        const result = await response.json()
        setClient(result);
      } catch (e) {
        console.log(e);
      }
      setCharging(!charging)
    }

    getClientApi()
  }, [])

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>

      {client?.nombre ? (
        <FormClient 
          client={client}
          charging={charging}
        />
      ) : <p>Cliente ID no válido</p>}
    </>
  )
}

export default ClientEdit