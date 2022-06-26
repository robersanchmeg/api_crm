import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alert from './Alert'
import Spinner from './Spinner'

const FormClient = ({client, charging}) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
              .min(3, 'El nombre del Cliente es muy corto')
              .max(20, 'El nombre del Cliente es muy largo')
              .required('El nombre del Cliente es Obligatorio'),
    empresa: Yup.string()
              .required('El nombre de la Empresa es Obligatorio'),
    email: Yup.string()
              .email('Email no valido')
              .required('El email es Obligatorio'),
    telefono: Yup.number()
              .integer('Número no valido')
              .positive('Número no valido')
              .typeError('Número no valido'),
    notas: ''
  })

  const handleSubmit = async (values) => {
    try {
      let response
      if (client.id) {
        // Editando Registro
        const url = `http://localhost:4000/clientes/${client.id}`
        response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else {
        // Nuevo Registro
        const url = 'http://localhost:4000/clientes'
        response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      await response.json()
      navigate('/clients')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    charging ? <Spinner /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
          <h1 className='text-gray-600 font-bold text-xl uppercase 
          text-center'>{client?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

          <Formik
            initialValues={{
              nombre: client?.nombre ?? '',
              empresa: client?.empresa ?? '',
              email: client?.email ?? '',
              telefono: client?.telefono ?? '',
              notas: client?.notas ?? ''
            }}
            enableReinitialize={true}
            onSubmit={ async (values, {resetForm}) => {
              await handleSubmit(values)
              resetForm()
            }}
            validationSchema={nuevoClienteSchema}
          >
              {({errors, touched}) => {
                
                return (

                <Form className='mt-5'>
                    <div className='mb-4'>
                      <label
                        className='text-gray-800'
                        htmlFor='nombre'
                      >Nombre:</label>
                      <Field 
                        id="nombre"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Nombre del Cliente"
                        name="nombre"
                      />
                      {errors.nombre && touched.nombre ? (
                        <Alert>{errors.nombre}</Alert>
                      ) : null}
                    </div>

                    <div className='mb-4'>
                      <label
                        className='text-gray-800'
                        htmlFor='empresa'
                      >Empresa:</label>
                      <Field 
                        id="empresa"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Empresa del Cliente"
                        name="empresa"
                      />
                      {errors.empresa && touched.empresa ? (
                        <Alert>{errors.empresa}</Alert>
                      ) : null}
                    </div>

                    <div className='mb-4'>
                      <label
                        className='text-gray-800'
                        htmlFor='email'
                      >E-mail:</label>
                      <Field 
                        id="email"
                        type="email"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Email del Cliente"
                        name="email"
                      />
                      {errors.email && touched.email ? (
                        <Alert>{errors.email}</Alert>
                      ) : null}
                    </div>

                    <div className='mb-4'>
                      <label
                        className='text-gray-800'
                        htmlFor='telefono'
                      >Teléfono:</label>
                      <Field 
                        id="telefono"
                        type="tel"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Teléfono del Cliente"
                        name="telefono"
                      />
                      {errors.telefono && touched.telefono ? (
                        <Alert>{errors.telefono}</Alert>
                      ) : null}
                    </div>

                    <div className='mb-4'>
                      <label
                        className='text-gray-800'
                        htmlFor='notas'
                      >Notas:</label>
                      <Field 
                        as="textarea"
                        id="notas"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-100 h-40"
                        placeholder="Notas del Cliente"
                        name="notas"
                      />
                    </div>

                    <input 
                      type="submit" 
                      value={client?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                      className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                    />
                </Form>
              )}}
          </Formik>
      </div>
    )
    
  )
}

FormClient.defaultProps = {
  client: {},
  charging: false
}

export default FormClient