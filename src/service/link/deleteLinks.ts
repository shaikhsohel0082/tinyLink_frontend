import { linkapi } from "./links";



export const deleteLink=(async(code:string)=>{
    try{
        const res=await linkapi.delete(`/links/${code}`);
        return res.data
    }catch(err){
        console.log(err);
        throw new Error("Error loading content!")
    }

})