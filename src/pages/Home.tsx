import React from 'react'
import { Form } from '../components/Form'
import { Table } from '../components/Table'

export const Home = () => {
  return (
    <div className='bg-gray-700 w-full min-h-screen p-3'>
        <h1 className='text-white text-lg py-2'>Home - Cree su Artículo</h1>
        <div className="flex flex-col">
        <Form/>
        <Table/>
        </div>
    </div>
  )
}
