import { linkapi } from "./links";

export const getLinks=(async()=>{
    try{
        const res=await linkapi.get("/");
        return res.data
    }catch(err){
        console.log(err);
        throw new Error("Error loading content!")
    }

})