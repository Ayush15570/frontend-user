import axios from 'axios'

const api = axios.create({
    baseURL :import.meta.env.NEW_URL,
    withCredentials:true
})
//import.meta.env.VITE_API_URL
//"http://localhost:4000/kuncika/v1/"


export default api 