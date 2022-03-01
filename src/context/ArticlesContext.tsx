import { createContext, useEffect, useState } from "react";
import { Article } from '../interfaces/articleInterace';

interface Props {
    children: JSX.Element;
}

interface PropsContext {
    articles: Article[],
    article: Article,
    setArticles: (articles: Article[]) => void;
    setArticle: (article: Article) => void;

}


export const ArticlesContext = createContext<PropsContext>({
    articles: [],
    article: {
        id: 0,
        descripcion: "",
        precio: 0,
        stock: 0,
        created_at: "",
        updated_at: ""
    },
    setArticles: () => { },
    setArticle: () => { }
})

export const ArticlesProvider = ({ children }: Props) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [article, setArticle] = useState<Article>({
        id: 0,
        descripcion: "",
        precio: 0,
        stock: 0,
        created_at: "",
        updated_at: ""
    });
    const getArticles = async () => {
        const resp = await fetch('http://localhost:8000/api/articulos')
        const data: Article[] = await resp.json()
        setArticles(data)
    }
    useEffect(() => {
        getArticles()
    }
        , [])
    return (
        <ArticlesContext.Provider value={{ articles, setArticles, article, setArticle }}>
            {children}
        </ArticlesContext.Provider>
    )
}