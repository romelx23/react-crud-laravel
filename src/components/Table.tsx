import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Article } from '../interfaces/articleInterace';
import { ArticlesContext } from '../context/ArticlesContext';

export const Table = () => {
  const { articles, setArticles,setArticle } = useContext(ArticlesContext);
  // const [articles, setArticles] = useState<Article[]>([]);
  // const getArticles = async () => {
  //   const resp = await fetch('http://127.0.0.1:8000/api/articulos')
  //   const data: Article[] = await resp.json();
  //   setArticles(data)
  // }
  // useEffect(() => {
  //   getArticles()
  //   console.log(articles)
  // }, [])

  const deleteArticle = async (id: number) => {
    const resp = await fetch(`http://localhost:8000/api/articulos/${id}`, {
      method: 'DELETE'
    })
    const data: Article = await resp.json();
    // console.log(data);
    setArticles(articles.filter(article => article.id !== id))
  }

  const getArticleById = async (article: Article) => {
    // const resp = await fetch(`http://localhost:8000/api/articulos/${id}`)
    // const data: Article = await resp.json();
    // console.log(data);
    // console.log(article);
    setArticle(article)
  }

  const handlePrint=()=>{
    // imprime el contenido del div
    window.print();
  }

  return (
    <div>
      {/* table tailwind */}
      <div className="py-2 overflow-x-auto sm:px-6 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-gray-800 shadow-dashboard px-8 pt-3 rounded-lg min-h-min print:bg-black print:px-0 print:pl-6 print:break-before-avoid-page">
          <table className="min-w-full print:overflow-hidden">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Fullname</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Email</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Phone</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Created At</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-white">
                  <button onClick={handlePrint} className='btn border-cyan-500 text-cyan-500 hover:bg-cyan-700 print:hidden'>Imprimir Registro</button>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {
                articles.map((article, i) => {
                  return <tr className='font-semibold text-lg' key={article.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className=" leading-5 text-white">{i + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className=" leading-5 text-white">{article.descripcion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500  leading-5">S/.{article.precio}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500  leading-5">{article.stock}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-white  leading-5">{article.created_at}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5 space-x-2 print:hidden">
                      <button onClick={()=>getArticleById(article)} className="btn border-blue-500 text-blue-500 hover:bg-blue-700">
                        Actualizar
                      </button>
                      <button onClick={() => deleteArticle(article.id)} className="btn hover:bg-red-700 border-red-500 text-red-500">
                        Borrar
                      </button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
