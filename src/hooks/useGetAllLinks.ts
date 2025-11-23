import { useQuery } from "@tanstack/react-query"
import { getLinks } from "../service/link/getlinks"
import { useState } from "react";

const LIMIT=5;
const useGetAllLinks=()=>{
    const [currentPage,setCurrentPage]=useState(1);
    const {data,isLoading,isError}=useQuery({
        queryKey:["links",currentPage],
        queryFn:()=>{
            return getLinks(currentPage,LIMIT)
        }
    })
    return {
        links:data?.links || [],
        totalPages:data?.totalPages || 1,
        currentPage,
        setCurrentPage,
        isLoading,
        isError
    }
}
export default useGetAllLinks;