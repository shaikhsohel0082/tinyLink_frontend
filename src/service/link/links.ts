import axios from "axios";
export const linkapi=axios.create({
    baseURL:"http://localhost:5000/api/"
});
