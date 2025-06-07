import React from 'react';
import { render, screen } from '@testing-library/react';
import StarterPageSlider from '../../../components/animated_slider/StarterPageSlider'; // adjust path as needed
import mockMediaRenderer from '../../__test_utils__/mockMediaRenderer'; 
import mockStartPageSlide from '../../__mocks_data__/mockStartPageSlide'; 

jest.mock("../../../utils/mediaRenderer", () => ({
  __esModule: true,
  default: require("../../__test_utils__/mockMediaRenderer").default,
}));


jest.mock('../../../hooks/useSliderAnimation', () => jest.fn());

describe('StarterPageSlider', () => {

  it('renders all slider items with correct content', () => {
    render(<StarterPageSlider items={mockStartPageSlide} />);

    // Check all item names and descriptions render
    mockStartPageSlide.forEach(({ name, desc }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(desc)).toBeInTheDocument();
    });

    expect(mockMediaRenderer).toHaveBeenCalledTimes(mockStartPageSlide.length);

    // Check mediaRenderer was called with correct props for each item
   mockStartPageSlide.forEach((item, index) => {
  expect(mockMediaRenderer.mock.calls[index][0]).toEqual(
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
    expect(sliderItems.length).toBe(mockStartPageSlide.length);
  });

  it('matches snapshot', () => {
  const { asFragment } = render(<StarterPageSlider items={mockStartPageSlide} />);
  expect(asFragment()).toMatchSnapshot();
});

});
