import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./ContactForm.css";
import useForm from "../../hooks/useForm";

const ContactForm = ({ onSubmit: customSubmit }) => {
  const { initialValues, validationSchema, onSubmit, isLoading, error } =
    useForm("http://localhost:5000/api/contact");

  const handleSubmit = customSubmit || onSubmit;

  return (
    <div className="form-box">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="user_name">
              Name <span className="required">*</span>
            </label>
            <Field id="user_name" type="text" name="user_name" />
            <ErrorMessage
              name="user_name"
              component="div"
              className="error-message"
            />

            <label htmlFor="user_email">
              Email <span className="required">*</span>
            </label>
            <Field id="user_email" type="email" name="user_email" />
            <ErrorMessage
              name="user_email"
              component="div"
              className="error-message"
            />

            <label htmlFor="message">
              Message <span className="required">*</span>
            </label>
            <Field id="message" as="textarea" name="message" />
            <ErrorMessage
              name="message"
              component="div"
              className="error-message"
            />

            <input
              type="submit"
              value={isLoading ? "Sending..." : "Send"}
              disabled={isSubmitting || isLoading}
            />
            {error && (
              <div className="error-message">Failed to send. Try again.</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
