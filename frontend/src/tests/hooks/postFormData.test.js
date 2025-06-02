import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import usePostFormData from '../../utils/usePostFormData';

jest.mock('axios');
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('usePostFormData hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // Make sure axios.post is a jest mock function
    axios.post = jest.fn();
  });

  it('post data successfully', async () => {
    const mockResponse = { success: true, id: 123 };
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => usePostFormData());

    act(() => {
      result.current.sendRequest('http://fakeurl.com/post', { name: 'Test' });
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.error).toBe(null);
  });

  it('handle error when post fails', async () => {
    const error = new Error('Network Error');
    axios.post.mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePostFormData());

    act(() => {
      // We catch the error to prevent unhandled promise rejection in the test
      result.current.sendRequest('http://fakeurl.com/post', { name: 'Test' }).catch(() => {});
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(error);
  });
});
