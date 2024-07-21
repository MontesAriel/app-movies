'use client'
import { setFilterCartelera, setFilterPopular, setFilterSearch, setFilterValoradas } from "@/store/FilterSlice";
import { useAppDispatch } from "@/store/hooks";
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react";

export default function SearchMovie() {
    const searchParams = useSearchParams()
    const { replace } = useRouter() 
    const dispatch = useAppDispatch();
    const [ search, setSearch ] = useState<string | null>(null)

    const handleSearch = (term: string) => {
       const params = new URLSearchParams(searchParams)
       if(term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }

        setSearch(term)
        replace(`/?${params.toString()}`)
    }

    const onClickSearch = () => {
        if( search !== null && search.length > 0 ) {
            dispatch(setFilterSearch(search))
        } else{
            dispatch(setFilterSearch(null))
        }
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        if(id === 'billboard') dispatch(setFilterCartelera(checked))
        if(id === 'popular') dispatch(setFilterPopular(checked))
        if(id === 'valued') dispatch(setFilterValoradas(checked))
    }
    
    return(
        <section className="flex justify-between container w-full">
            <div className="flex items-center">
                <div className="flex items-center me-4">
                    <input  id="popular" type="checkbox" value="" className="w-4 h-4 cursor-pointer"  onChange={handleCheckboxChange}/>
                    <label htmlFor="popular" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Populares</label>
                </div>
                <div className="flex items-center me-4">
                    <input  id="valued" type="checkbox" value="" className="w-4 h-4 cursor-pointer"  onChange={handleCheckboxChange}/>
                    <label htmlFor="valued" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mejor valoradas</label>
                </div>
                <div className="flex items-center me-4">
                    <input id="billboard" type="checkbox" value="" className="w-4 h-4 cursor-pointer" onChange={handleCheckboxChange}/>
                    <label htmlFor="billboard" className="ms-2 text-sm font-medium text-green-900 dark:text-gray-300">Cartelera</label>
                </div>
            </div>
       
            <div className="max-w-md  py-12">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        onChange={(event) => handleSearch(event.target.value)} 
                        defaultValue={searchParams.get('query')?.toString()}
                        type="search" id="default-search" 
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-96" placeholder="Search movie..." 
                    />
                    <button onClick={onClickSearch}  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </div>
        </section>
    )
}