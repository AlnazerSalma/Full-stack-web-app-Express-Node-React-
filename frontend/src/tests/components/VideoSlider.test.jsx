import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoSlider from '../../components/Home/VideoSlider'; // adjust path as needed
import useFetch from '../../utils/useFetch';

jest.mock('../../utils/useFetch');


jest.mock('../../utils/youTubeEmbed', () => 
() => <div data-testid="youtube-embed">YouTube Video</div>);
describe('VideoSlider Component', () => {
  it('displays loading state', () => {
    useFetch.mockReturnValue({
      data: [],
      loading: 'Loading...',
      error: null,
    });

    render(<VideoSlider />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays error state', () => {
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: 'Failed to fetch',
    });

    render(<VideoSlider />);
    expect(screen.getByText(/failed to load videos/i)).toBeInTheDocument();
  });

  it('renders video data correctly', () => {
    const mockVideos = [
      {
        icon: 'https://example.com/avatar1.jpg',
        name: 'Startup A',
        video: 'https://youtube.com/embed/test1',
      },
      {
        icon: 'https://example.com/avatar2.jpg',
        name: 'Startup B',
        video: 'https://youtube.com/embed/test2',
      },
    ];

    useFetch.mockReturnValue({
      data: mockVideos,
      loading: false,
      error: null,
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
