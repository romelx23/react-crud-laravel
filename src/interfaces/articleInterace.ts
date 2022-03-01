export interface Article{
    id: number,
    descripcion: string,
    precio: number,
    stock: number,
    created_at: string,
    updated_at: string
}
export interface ArticleGet{
    descripcion: string,
    precio: number,
    stock: number
}