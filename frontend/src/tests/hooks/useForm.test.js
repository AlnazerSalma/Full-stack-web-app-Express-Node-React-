import { renderHook, act } from '@testing-library/react';
import useForm from '../../hooks/useForm'; // adjust path as needed
import usePostFormData from '../../utils/usePostFormData';
import {commonInitialValues, contactFormValidationSchema,} from '../__test_utils__/formTestUtils';

jest.mock('../../utils/usePostFormData');

describe('useForm hook', () => {
  const mockUrl = '/api/contact';
  const mockSendRequest = jest.fn();
  const validValues = {
    user_name: "Valid User",
    user_email: "valid@example.com",
    message: "Hello!",
  };
  beforeEach(() => {
    usePostFormData.mockReturnValue({
      sendRequest: mockSendRequest,
      isLoading: false,
      error: null,
      data: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

 it('returns initial form values and validation schema', async () => {
  const { result } = renderHook(() => useForm(mockUrl));

  expect(result.current.initialValues).toEqual(commonInitialValues);

  // commonInitialValues should fail validation (because all fields are empty)
  await expect(contactFormValidationSchema.validate(commonInitialValues)).rejects.toThrow();
  // validValues should pass validation
  await expect(contactFormValidationSchema.validate(validValues)).resolves.toBeTruthy();
});


  it('calls sendRequest on submit with form values', async () => {
    const resetForm = jest.fn();
    const setSubmitting = jest.fn();

    mockSendRequest.mockResolvedValueOnce({ status: 'ok' });

    const { result } = renderHook(() => useForm(mockUrl));

    await act(async () => {
      await result.current.onSubmit(validValues, { resetForm, setSubmitting });
    });

    expect(mockSendRequest).toHaveBeenCalledWith(mockUrl, validValues);
    expect(resetForm).toHaveBeenCalled();
    expect(setSubmitting).toHaveBeenCalledWith(false);
  });

  it('handles error during submission', async () => {
    const error = new Error('Network error');
    mockSendRequest.mockRejectedValueOnce(error);

    const resetForm = jest.fn();
    const setSubmitting = jest.fn();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useForm(mockUrl));

    await act(async () => {
      await result.current.onSubmit({}, { resetForm, setSubmitting });
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending to backend:', error);
    expect(setSubmitting).toHaveBeenCalledWith(false);

    consoleErrorSpy.mockRestore();
  });
});
