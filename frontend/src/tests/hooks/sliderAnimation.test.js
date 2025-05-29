import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import useSliderAnimation from '../../hooks/useSliderAnimation';

const TestComponent = ({ items, duration }) => {
  const ref = useRef(null);
  useSliderAnimation(ref, items, duration);
  return <div data-testid="slider" ref={ref} />;
};

describe('sliderAnimation', () => {
  it('applies the slide animation style when items and ref exist', () => {
    const items = [1, 2, 3];
    const duration = 50;
    const { getByTestId } = render(<TestComponent items={items} duration={duration} />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const slider = getByTestId('slider');

    expect(slider.style.animation).toBe(`${duration}s linear infinite slideAnimation`);
  });

  it('does not apply animation style when items is null', () => {
    const { getByTestId } = render(<TestComponent items={null} />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const slider = getByTestId('slider');

    expect(slider.style.animation).toBe('');
  });
});
