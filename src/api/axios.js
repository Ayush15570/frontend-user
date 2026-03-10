import axios from 'axios'

const api = axios.create({
    baseURL :import.meta.env.VITE_API_URL,
    withCredentials:true
})
console.log("AXIOS CONFIG LOADED");
//import.meta.env.VITE_API_URL
//"http://localhost:4000/kuncika/v1/"


export default api 