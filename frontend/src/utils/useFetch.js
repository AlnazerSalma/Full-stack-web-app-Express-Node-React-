import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, maxRetries = 3, retryDelay = 1000) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("Loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    let retries = 0;
    let isCancelled = false;

    const fetchData = async () => {
      setLoading("Loading...");
      while (retries < maxRetries) {
        try {
          const response = await axios.get(url);
          if (!isCancelled) {
            setData(response.data);
            setError(null);
            setLoading(null);
          }
          return;
        } catch (err) {
          retries += 1;
          if (retries >= maxRetries && !isCancelled) {
            setError("Failed to fetch data. Please try again later.");
            setLoading(null);
          } else {
            await new Promise((res) => setTimeout(res, retryDelay));
          }
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
      //after navigate to another page this code will remove the data from the memory
      // Clear data, error, and loading state when unmounting
      // setData([]);
      // setError(null);
      // setLoading(null);
      // console.log("Cleanup: data cleared");
    };
  }, [url, maxRetries, retryDelay]);

  return { data, loading, error };
};

export default useFetch;