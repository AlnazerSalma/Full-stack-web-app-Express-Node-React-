import React from 'react';
import { render, screen } from '@testing-library/react';
import StarterPageSlider from '../../../components/animated_slider/StarterPageSlider'; // adjust path as needed
import mediaRenderer from '../../../utils/mediaRenderer';

jest.mock('../../../utils/mediaRenderer', () =>
  jest.fn(({ src, type, alt, className }) => (
    <div data-testid="media-renderer" data-src={src} data-type={type} data-alt={alt} className={className}>
      Mocked Media
    </div>
  ))
);

jest.mock('../../../hooks/useSliderAnimation', () => jest.fn());

describe('StarterPageSlider', () => {
  const itemsMock = [
    { name: 'Item One', desc: 'Description One', image: 'image1.jpg', type: 'image' },
    { name: 'Item Two', desc: 'Description Two', image: 'video2.mp4', type: 'video' },
  ];

  it('renders all slider items with correct content', () => {
    render(<StarterPageSlider items={itemsMock} />);

    // Check all item names and descriptions render
    itemsMock.forEach(({ name, desc }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(desc)).toBeInTheDocument();
    });

    expect(mediaRenderer).toHaveBeenCalledTimes(itemsMock.length);

    // Check mediaRenderer was called with correct props for each item
   itemsMock.forEach((item, index) => {
  expect(mediaRenderer.mock.calls[index][0]).toEqual(
    expect.objectContaining({
      src: item.image,
      type: item.type,
      alt: item.name,
      className: "media-class-name",
    })
  );
});

    // Check that the correct number of slider-item rendered
    const sliderItems = screen.getAllByRole('heading', { level: 2 });
    expect(sliderItems.length).toBe(itemsMock.length);
  });

  it('matches snapshot', () => {
  const { asFragment } = render(<StarterPageSlider items={itemsMock} />);
  expect(asFragment()).toMatchSnapshot();
});

});
