import * as Yup from "yup";

// Default initial values
export const commonInitialValues = {
  user_name: "",
  user_email: "",
  message: "",
};

// Default validation schema
export const contactFormValidationSchema = Yup.object({
  user_name: Yup.string().required("Name is required"),
  user_email: Yup.string().email("Invalid email address").required("Email is required"),
  message: Yup.string().required("Message is required"),
});

// Reusable setup function for mocking `useForm`
export const setupUseFormMock = (useForm, onSubmit = jest.fn(), options = {}) => {
  const { error = null, isLoading = false } = options;

  useForm.mockReturnValue({
    initialValues: commonInitialValues,
    validationSchema: contactFormValidationSchema,
    onSubmit,
    error,
    isLoading,
  });

  return onSubmit;
};
