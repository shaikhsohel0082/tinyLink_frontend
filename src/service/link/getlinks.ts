import { linkapi } from "./links";
export interface ILink{
    id:string;
    code:string;
    url:string;
    clicks:number;
    lastClicked:string;
}
export interface ILinkRes{
    links:ILink[];
    totalPages:number;
}
export const getLinks=(async(page:number,limit:number)=>{
    try{
        const res=await linkapi.get("/links",{
            params:{page,limit}
        });
        return res.data as ILinkRes;
    }catch(err){
        console.log(err);
        throw new Error("Error loading content!")
    }

})