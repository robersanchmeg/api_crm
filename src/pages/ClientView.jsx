import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const ClientView = () => {

    const { id } = useParams()

    const [client, setClient] = useState([])

    const [charging, setCharging] = useState(true)

    useEffect(() => {
        const getClientApi = async () => {
          try {
            const url = `http://localhost:4000/clientes/${id}`
            const response = await fetch(url)
            const result = await response.json()
            setClient(result);
          } catch (e) {
            console.log(e);
          }
          setTimeout(() => {
            setCharging(!charging)
          }, 1000)
        }
    
        getClientApi()
      }, [])

    return (
        charging ? <Spinner /> : 
            Object.keys(client).length === 0 ? 
            <p>No hay resultado</p> : (
                <>
                    <div>
                        <h1 className='font-black text-4xl text-blue-900'>Detalle Cliente: {client.nombre}</h1>
                        <p className='mt-3'>Información del Cliente</p>

                        {client.nombre && (
                            <p className="text-2xl text-gray-600 mt-10">
                                <span className="text-gray-800 uppercase font-bold">Cliente: </span>
                                {client.nombre}
                            </p>        
                        )}
                        {client.email && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Email: </span>
                                {client.email}
                            </p>         
                        )}
                        {client.telefono && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Teléfono: </span>
                                {client.telefono}
                            </p>                
                        )}
                        {client.empresa && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Empresa: </span>
                                {client.empresa}
                            </p>
                        )}
                        {client.notas && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="text-gray-800 uppercase font-bold">Notas: </span>
                                {client.notas}
                            </p>        
                        )} 
                    </div> 
                </>
            )
    )
}

export default ClientView