import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import useFetch from '../../utils/useFetch';

// Mock axios module
jest.mock('axios');

describe('useFetch hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
  const mockData = [{ id: 1, title: 'Test' }];
  axios.get.mockResolvedValueOnce({ data: mockData });

  const { result } = renderHook(() => useFetch('http://fakeurl.com/data'));

  expect(result.current.loading).toBe('Loading...');
  expect(result.current.data).toEqual([]);
  expect(result.current.error).toBe(null);

  // Wait for the loading to be finished
  await waitFor(() => expect(result.current.loading).toBe(null));

  expect(result.current.data).toEqual(mockData);
  expect(result.current.error).toBe(null);
});

it('should retry and eventually fail after max retries', async () => {
  axios.get.mockRejectedValue(new Error('Network Error'));

  const { result } = renderHook(() => useFetch('http://fakeurl.com/data', 2, 10));

  expect(result.current.loading).toBe('Loading...');
  expect(result.current.data).toEqual([]);
  expect(result.current.error).toBe(null);

  // Wait for the final failure state after retries
  await waitFor(() => expect(result.current.loading).toBe(null));

  expect(result.current.data).toEqual([]);
  expect(result.current.error).toBe('Failed to fetch data. Please try again later.');
});
});
