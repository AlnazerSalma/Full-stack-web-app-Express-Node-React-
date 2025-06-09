import { useState} from "react";
import useFetch from "../utils/useFetch"; 
import useDebouncedValue from "./useDebouncedValue";

const useSearch = (baseUrl, initialQuery = "", searchParam = "q") => {
    const [searchInput, setSearchInput] = useState(initialQuery);
    const debouncedQuery = useDebouncedValue(searchInput, 200);

    const url = debouncedQuery
      ? `${baseUrl}/search?${searchParam}=${encodeURIComponent(debouncedQuery)}`
      : baseUrl;

    const { data, loading, error } = useFetch(url);

    return {
    data,
    loading,
    error,
    searchInput,
    setSearchInput,
  };
};

export default useSearch;
