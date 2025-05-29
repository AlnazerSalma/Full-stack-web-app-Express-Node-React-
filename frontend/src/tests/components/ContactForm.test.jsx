import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "../../components/form/ContactForm";
import useForm from "../../hooks/useForm";
import * as Yup from "yup";

jest.mock("../../hooks/useForm");

describe("ContactForm", () => {
  const mockOnSubmit = jest.fn();
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

const setupUseFormMock = (options = {}) => {
  const { error = null, isLoading = false } = options;

  useForm.mockReturnValue({
    initialValues,
    validationSchema,
    onSubmit: mockOnSubmit,
    error,
    isLoading,
  });
};

  beforeEach(() => {
    jest.clearAllMocks();
    setupUseFormMock(); // default mock setup
  });

  it("renders all required form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Send/i)).toBeInTheDocument();
  });

  it("calls onSubmit with form values when form is submitted", async () => {
    render(<ContactForm />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello, this is a test message." },
    });

    // Submit the form
    fireEvent.click(screen.getByDisplayValue(/Send/i));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          user_name: "John Doe",
          user_email: "john@example.com",
          message: "Hello, this is a test message.",
        },
        expect.any(Object) // The Formik helpers like resetForm, setSubmitting
      );
    });
  });

  it("disables the submit button when loading", () => {
    setupUseFormMock({ isLoading: true });

    render(<ContactForm />);
    const button = screen.getByDisplayValue(/Sending.../i);
    expect(button).toBeDisabled();
  });

  it("displays an error message if submission fails", () => {
    setupUseFormMock({ error: true });

    render(<ContactForm />);
    expect(screen.getByText(/Failed to send/i)).toBeInTheDocument();
  });
});
