import { renderHook, act } from '@testing-library/react';
import useForm from '../../hooks/useForm'; // adjust path as needed
import usePostFormData from '../../utils/usePostFormData';

jest.mock('../../utils/usePostFormData');

describe('useForm hook', () => {
  const mockSendRequest = jest.fn();

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

  it('returns initial form values and validation schema', () => {
    const { result } = renderHook(() => useForm('/api/contact'));

    expect(result.current.initialValues).toEqual({
      user_name: '',
      user_email: '',
      message: '',
    });

    expect(result.current.validationSchema).toBeDefined();
  });

  it('calls sendRequest on submit with form values', async () => {
    const values = {
      user_name: 'Salma',
      user_email: 'salma@example.com',
      message: 'Hello!',
    };

    const resetForm = jest.fn();
    const setSubmitting = jest.fn();

    mockSendRequest.mockResolvedValueOnce({ status: 'ok' });

    const { result } = renderHook(() => useForm('/api/contact'));

    await act(async () => {
      await result.current.onSubmit(values, { resetForm, setSubmitting });
    });

    expect(mockSendRequest).toHaveBeenCalledWith('/api/contact', values);
    expect(resetForm).toHaveBeenCalled();
    expect(setSubmitting).toHaveBeenCalledWith(false);
  });

  it('handles error during submission', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Network error');

    mockSendRequest.mockRejectedValueOnce(error);

    const resetForm = jest.fn();
    const setSubmitting = jest.fn();

    const { result } = renderHook(() => useForm('/api/contact'));

    await act(async () => {
      await result.current.onSubmit({}, { resetForm, setSubmitting });
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending to backend:', error);
    expect(setSubmitting).toHaveBeenCalledWith(false);

    consoleErrorSpy.mockRestore();
  });
});
