import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const booksApi = createApi({
    reducerPath:'bookApi',
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000"}),
    endpoints:(builder)=>({
        getBooks:builder.query({
            query:()=> '/books'
        }),
        getAllGenre:builder.query({
            query: ()=> '/books/genre'
        }),
        getBooksWithGenre:builder.query({
            query: (genre:string)=> `/books?genre=${genre}`
        })
    })
})

export const {useGetBooksQuery,useGetAllGenreQuery,useGetBooksWithGenreQuery} = booksApi
export default booksApi
