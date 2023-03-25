import Axios from 'axios';

export const axios = Axios.create({
    baseURL: 'https://api.apilayer.com/fixer',
    headers: {
        'apikey': import.meta.env.VITE_API_KEY
    }
});
