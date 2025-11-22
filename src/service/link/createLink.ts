import { linkapi } from "./links";

export interface ICreateLink{
    url?:string;
    code?:string;
}

export const createLink=(async(payload:ICreateLink)=>{
    try{
        const res=await linkapi.post("/links",payload);
        return res.data
    }catch(err:any){
       const message=err?.response.data?.message || "Something went wrong!"
        throw new Error(message)
    }

})