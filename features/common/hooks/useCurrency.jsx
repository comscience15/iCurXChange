import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchRates, fetchSymbols } from "../../Converter/api/fetchData";

export const useCurrency = () => {
  const [amount, setAmount] = useState(1000);
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("THB");

  // user reactQuery or reactQueries
  const [ratesData, symbolsData] = useQueries({
    queries: [
      {
        queryKey: ["rates", currencyOne],
        queryFn: () => fetchRates(currencyOne),
        staleTime: Infinity, // this is query 1 time and won't update to avoid to call API too many
        select: ({ rates, date, timestamp }) => {
          return { rates, date, timestamp };
        },
        keepPreviousData: true
      },
      {
        queryKey: ["symbols"],
        queryFn: fetchSymbols,
        staleTime: Infinity,
        select: ({ symbols }) => symbols,
      },
    ],
  });

  // if either ratesData or symbolsData at "isLoading" or "isError" is true, will be true.
  const isLoading = [ratesData, symbolsData].some((query) => query.isLoading);
  const isError = [ratesData, symbolsData].some((query) => query.isError);

  const convertedAmount = (ratesData.data?.rates[currencyTwo] * amount).toFixed(
    2
  );
  const date = new Date(ratesData.data?.date).toLocaleDateString();
  const time = new Date(ratesData.data?.timestamp).toLocaleTimeString("en-US");

  // currency List dropdowm
  const currencyList = symbolsData.data ? Object.keys(symbolsData.data) : {};

  console.log("ratesData: ", ratesData);
  return {
    amount,
    setAmount,
    currencyOne,
    setCurrencyOne,
    currencyTwo,
    setCurrencyTwo,
    currencyList,
    convertedAmount,
    isLoading,
    isError,
    ratesData,
    symbolsData,
    date,
    time,
  };
};
