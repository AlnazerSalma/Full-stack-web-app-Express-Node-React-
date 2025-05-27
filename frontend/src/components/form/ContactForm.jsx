import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ContactForm.css";
import { postFormData } from "../../utils/postFormData"; 


const ContactForm = () => {
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

  const sendEmail = async (values, { resetForm, setSubmitting }) => {
    try {
      const data = await postFormData("http://localhost:5000/api/contact", values);
      console.log("Response from backend:", data);
      resetForm();
    } catch (error) {
      console.error("Error sending to backend:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-box">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={sendEmail}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>
              Name <span className="required">*</span>
            </label>
            <Field type="text" name="user_name" />
            <ErrorMessage
              name="user_name"
              component="div"
              className="error-message"
            />

            <label>
              Email <span className="required">*</span>
            </label>
            <Field type="email" name="user_email" />
            <ErrorMessage
              name="user_email"
              component="div"
              className="error-message"
            />

            <label>
              Message <span className="required">*</span>
            </label>
            <Field as="textarea" name="message" />
            <ErrorMessage
              name="message"
              component="div"
              className="error-message"
            />

            <input type="submit" value="Send" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;