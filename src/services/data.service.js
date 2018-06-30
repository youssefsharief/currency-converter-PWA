
import axios from 'axios';
import { API_URL } from '../config/constants';


axios.defaults.baseURL = API_URL
axios.interceptors.response.use(res => res.data, err => Promise.reject(err.response));

export const ApiService = {

    getCurrencies() {
        return axios.get('currencies').then(x=>x.results)
    },

    convert(currencyPair) {
        return axios.get(`convert?q=${currencyPair}&compact=y`).then(x=>x[currencyPair].val)
    },


}
