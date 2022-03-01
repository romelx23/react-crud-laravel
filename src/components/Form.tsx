import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { ArticleGet, Article } from '../interfaces/articleInterace';
import { useForm } from '../hooks/useForm';
import { ArticlesContext } from '../context/ArticlesContext';

export const Form = () => {
    const [update, setUpdate] = useState(false);
    const { articles, setArticles, article,setArticle } = useContext(ArticlesContext);
    const { values, handleChange, setValues } = useForm<ArticleGet>({
        descripcion: '',
        precio: 0,
        stock: 0
    })
    // console.log(values);

    const createArticle = async (e: SyntheticEvent) => {
        e.preventDefault();
        // console.log(e);
        if (values.descripcion && values.precio && values.stock) {
            const resp = await fetch('http://localhost:8000/api/articulos', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data: Article = await resp.json();
            // console.log(data);
            setArticles([...articles, data])
        } else {
            alert('Todos los campos son obligatorios')
        }
    }

    const updateArticle = async (article: Article) => {
        // console.log(article.id);
        const resp = await fetch(`http://localhost:8000/api/articulos/${article.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const data: Article = await resp.json();
        // console.log(data);
        setArticles(articles.map(art => art.id === article.id ? data : art))
        setUpdate(false)
        setValues({
            descripcion: '',
            precio: 0,
            stock: 0
        })
    }

    const noUpdateArticle = () => {
        setUpdate(false);
        setValues({
            descripcion: '',
            precio: 0,
            stock: 0
        })
    }

    useEffect(() => {
        if (article.id!==0) {
            setValues({
                descripcion: article.descripcion,
                precio: article.precio,
                stock: article.stock
            })
            setUpdate(true)
        }
    }, [article])


    return (
        <div className="grid gap-8 grid-cols-1 bg-gray-800 p-3 rounded-lg lg:mx-8 print:hidden">
            <h1 className='text-lg text-white font-semibold'>Formulario Artículos</h1>
            <form onSubmit={(e) => createArticle(e)}>
                <div className="flex flex-wrap gap-5 justify-center">
                    <label htmlFor="article" className='flex gap-2'>
                        <h1 className='text-left text-white'>Ingrese su articulo</h1>
                        <input type="text" name="descripcion" id='article' placeholder='articulo...' className='px-3 py-1 rounded-md' onChange={handleChange} value={values.descripcion} />
                    </label>
                    <label htmlFor="price" className='flex gap-2'>
                        <h1 className='text-left text-white'>Ingrese el precio</h1>
                        <input type="number" id='price' placeholder='precio...' className='px-3 py-1 rounded-md' name="precio" onChange={handleChange} value={values.precio} />
                    </label>
                    <label htmlFor="stock" className='flex gap-2'>
                        <h1 className='text-left text-white'>Ingrese su stock</h1>
                        <input type="number" id='stock' placeholder='stock...' className='px-3 py-1 rounded-md' name="stock" onChange={handleChange} value={values.stock} />
                    </label>
                </div>
                {
                    update===true ?
                        <>
                        <button type="button" className='btn hover:bg-purple-700 border-purple-500 text-white mt-3 ml-3' onClick={() => updateArticle(article)}>Actualizar Producto</button>

                        <button type="button" className='btn hover:bg-emerald-700 border-emerald-500 text-white mt-3 ml-3' onClick={noUpdateArticle}>No Actualizar</button>
                        </> :
                        <button type="submit" className='btn hover:bg-green-700 border-green-500 text-white mt-3'>Crear Producto</button>
                }
            </form>
        </div>
    )
}
