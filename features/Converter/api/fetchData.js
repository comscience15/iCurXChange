import { axios } from '../../../libraries/axios';

export const fetchRates = async (currencyOne) => {
  const { data } = await axios.get('/latest', {
    params: {
      base: currencyOne
    }
  });
  console.log("axios: ", data);
  return data;
}

export const fetchSymbols = async () => {
  const { data } = await axios.get('/symbols');
  return data;
}