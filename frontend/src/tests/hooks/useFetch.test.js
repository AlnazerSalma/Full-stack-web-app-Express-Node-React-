import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import useFetch from '../../utils/useFetch';

jest.mock('axios');

describe('useFetch hook', () => {
  const mockUrl = 'http://fakeurl.com/data';
  const mockData = [{ id: 1, title: 'Test' }];
  const errorMessage = 'Failed to fetch data. Please try again later.';
  const expectInitialState = (result) => {
    expect(result.current).toEqual({
      loading: 'Loading...',
      data: [],
      error: null,
    });
  };
  const expectErrorState = (result) => {
    expect(result.current).toEqual({
      loading: null,
      data: [],
      error: errorMessage,
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetch data successfully', async () => {
  axios.get.mockResolvedValueOnce({ data: mockData });

  const { result } = renderHook(() => useFetch(mockUrl));
  expectInitialState(result);
  // Wait for the loading to be finished
  await waitFor(() => expect(result.current.loading).toBe(null));
 expect(result.current).toMatchObject({
      loading: null,
      data: mockData,
      error: null,
    });
});

it('retry fetching data up to max retries and then fail with error message', async () => {
  axios.get.mockRejectedValue(new Error('Network Error'));
  const maxRetries = 2;
  const retryDelay = 10;

  const { result } = renderHook(() => useFetch(mockUrl, maxRetries, retryDelay));
  expectInitialState(result);;

  // Wait for the final failure state after retries
  await waitFor(() => expect(result.current.loading).toBe(null));
  expectErrorState(result);
});
});
