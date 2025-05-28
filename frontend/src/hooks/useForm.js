import { useCallback } from "react";
import * as Yup from "yup";
import usePostFormData from "../utils/usePostFormData";

const useForm = (url) => {
  const { sendRequest, isLoading, error, data } = usePostFormData();

  const initialValues = {
    user_name: "",
    user_email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().required("Name is required"),
    user_email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const onSubmit = useCallback(
    async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await sendRequest(url, values);
        console.log("Response from backend:", res);
        resetForm();
      } catch (err) {
        console.error("Error sending to backend:", err);
      } finally {
        setSubmitting(false);
      }
    },
    [sendRequest, url]
  );

  return {
    initialValues,
    validationSchema,
    onSubmit,
    isLoading,
    error,
    data,
  };
};

export default useForm;
