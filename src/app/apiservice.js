import axios from "axios";

const httpClient = axios.create({
    baseURL:'https://nameless-island-71201.herokuapp.com/'
}); 

class ApiService{
    constructor(apiurl){
        this.apiurl = apiurl;
    }
    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        const token = localStorage.getItem("token");
        httpClient.defaults.headers.Authorization = `${token}`;
        return httpClient.post(requestUrl, objeto);
    }
    patch(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        const token = localStorage.getItem("token");
        httpClient.defaults.headers.Authorization = `${token}`;
        return httpClient.patch(requestUrl, objeto);
    }
    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        const token = localStorage.getItem("token");
        httpClient.defaults.headers.Authorization = `${token}`;
        return httpClient.delete(requestUrl)
    }
    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl);
    }
}
export default ApiService;
