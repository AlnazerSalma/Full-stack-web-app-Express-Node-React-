import { useState, useCallback } from "react";
import axios from "axios";

/**
 * Posts form data to a specified URL.
 * @param {string} url - The endpoint to send the POST request to.
 * @param {Object} data - The form data to post.
 * @param {Object} [headers] - Optional headers for the request.
 * @returns {Promise<Object>} - The response data or throws an error.
 */
function usePostFormData() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null);

  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, formData, headers = {}) => {
    setIsLoading(true);

    setError(null);

    setData(null);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",

          ...headers,
        },
      });

      setData(response.data);

      return response.data;
    } catch (err) {
      console.error("POST request error:", err);

      setError(err);

      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendRequest, isLoading, data, error };
}

export default usePostFormData;
