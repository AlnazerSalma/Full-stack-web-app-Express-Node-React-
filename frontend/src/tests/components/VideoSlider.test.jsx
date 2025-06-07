import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoSlider from '../../components/Home/VideoSlider'; // adjust path as needed
import { mockUseFetch } from "../__test_utils__/mockHooks";
import mockVideos from "../__mocks_data__/mockVideos";

jest.mock('../../utils/youTubeEmbed', () => 
() => <div data-testid="youtube-embed">YouTube Video</div>);

describe('VideoSlider Component', () => {
  it('displays loading state', () => {
    mockUseFetch({
      loading: 'Loading...',
    });
    render(<VideoSlider />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays error state', () => {
    mockUseFetch({
      error: 'Failed to fetch',
    });
    render(<VideoSlider />);
    expect(screen.getByText(/failed to load videos/i)).toBeInTheDocument();
  });

  it('renders video data correctly', () => {
    mockUseFetch({
      data: mockVideos,
    });

    render(<VideoSlider />);
    // Rendered video items
    mockVideos.forEach((video) => {
      expect(screen.getByText(video.name)).toBeInTheDocument();
    });

    // render YouTubeEmbed twice
    expect(screen.getAllByTestId('youtube-embed').length).toBe(2);
  });
});
