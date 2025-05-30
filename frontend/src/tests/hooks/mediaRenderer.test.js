/* eslint-disable testing-library/no-container */
import React from 'react';
import { render, screen } from '@testing-library/react';
import MediaRenderer from '../../utils/mediaRenderer';

describe('MediaRenderer', () => {
  it('renders null when src is not provided', () => {
    const { container } = render(<MediaRenderer />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });
it('renders a video element when type is "video"', () => {
  const { container } = render(<MediaRenderer src="video.mp4" type="video" className="video-class" />);
  // eslint-disable-next-line testing-library/no-node-access
  const videoElement = container.querySelector('video');
  expect(videoElement).toBeInTheDocument();
  expect(videoElement).toHaveAttribute('src', 'video.mp4');
  expect(videoElement).toHaveClass('video-class');

  // Check boolean properties for these attributes:
  expect(videoElement.autoplay).toBe(true);
  expect(videoElement.loop).toBe(true);
  expect(videoElement.muted).toBe(true);
  expect(videoElement.playsInline).toBe(true);
});


  it('renders a video element when src ends with .mp4 even if type is not provided', () => {
    render(<MediaRenderer src="sample.mp4" className="video-class" />);
    // eslint-disable-next-line testing-library/no-node-access
    const videoElement = document.querySelector('video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('src', 'sample.mp4');
  });

  it('renders an img element when type is not "video" and src does not end with .mp4', () => {
    render(<MediaRenderer src="image.png" alt="My Image" className="img-class" />);
    const img = screen.getByAltText('My Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'image.png');
    expect(img).toHaveClass('img-class');
  });

  it('renders an img with empty alt when alt is not provided', () => {
    render(<MediaRenderer src="image.png" />);
    // eslint-disable-next-line testing-library/no-node-access
    const img = document.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', '');
  });
});
