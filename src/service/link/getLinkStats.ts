import { linkapi } from "./links";



export const getLinkStats=(async(code:string)=>{
    try{
        const res=await linkapi.get(`/links/${code}`);
        return res.data
    }catch(err){
        console.log(err);
        throw new Error("Error loading content!")
    }

})