import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "../../../components/form/ContactForm";
import useForm from "../../../hooks/useForm";
import { setupUseFormMock, commonInitialValues } from "../../__test_utils__/formTestUtils";

jest.mock("../../../hooks/useForm");

describe("ContactForm", () => {
let mockOnSubmit;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnSubmit = setupUseFormMock(useForm);
  });

  it("renders all required form fields", () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);

    // Check if inputs are in the document
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Send/i)).toBeInTheDocument();

    // Check if initial values match commonInitialValues
    expect(nameInput).toHaveValue(commonInitialValues.user_name);
    expect(emailInput).toHaveValue(commonInitialValues.user_email);
    expect(messageInput).toHaveValue(commonInitialValues.message);
  });

  it("calls onSubmit with form values when form is submitted", async () => {
      const filledValues = {
        ...commonInitialValues,
        user_name: "John Doe",
        user_email: "john@example.com",
        message: "Hello, this is a test message.",
    };
    render(<ContactForm />);
    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: filledValues.user_name },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: filledValues.user_email  },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: filledValues.message},
    });

    fireEvent.click(screen.getByDisplayValue(/Send/i));

    await waitFor(() => {
       expect(mockOnSubmit).toHaveBeenCalledWith(
        filledValues,
        expect.any(Object)// The Formik helpers like resetForm, setSubmitting
      );
    });
  });

  it("disables submit button when loading", () => {
    setupUseFormMock(useForm, mockOnSubmit, { isLoading: true });
    render(<ContactForm />);
    expect(screen.getByDisplayValue(/Sending.../i)).toBeDisabled();
  });

  it("displays an error message if submission fails", () => {
    setupUseFormMock(useForm, mockOnSubmit, { error: true });
    render(<ContactForm />);
    expect(screen.getByText(/Failed to send/i)).toBeInTheDocument();
  });
});
