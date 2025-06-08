import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import usePostFormData from '../../utils/usePostFormData';

jest.mock('axios');

describe('usePostFormData hook', () => {
  const mockUrl = 'http://fakeurl.com/post';
  const mockPayload = { name: 'Test' };
  beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});
 beforeEach(() => {
    jest.clearAllMocks();
    axios.post = jest.fn();
  });

  it('post data successfully', async () => {
    const mockResponse = { success: true, id: 123 };
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => usePostFormData());

    act(() => {
      result.current.sendRequest(mockUrl, mockPayload);
    });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.error).toBe(null);
  });

  it('handle error when post fails', async () => {
    const mockError = new Error('Network Error');
    axios.post.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => usePostFormData());

    act(() => {
      // We catch the error to prevent unhandled promise rejection in the test
      result.current.sendRequest(mockUrl, mockPayload).catch(() => {});
    });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(mockError);
  });
});
