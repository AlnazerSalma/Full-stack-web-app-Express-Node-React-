import axios from "axios";

/**
 * Posts form data to a specified URL.
 * @param {string} url - The endpoint to send the POST request to.
 * @param {Object} data - The form data to post.
 * @param {Object} [headers] - Optional headers for the request.
 * @returns {Promise<Object>} - The response data or throws an error.
 */
export const postFormData = async (url, data, headers = {}) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};