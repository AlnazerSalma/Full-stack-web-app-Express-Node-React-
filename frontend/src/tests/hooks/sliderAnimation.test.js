import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import useSliderAnimation from '../../hooks/useSliderAnimation';

const SliderTestComponent = ({ items, duration = 50 }) => {
  const ref = useRef(null);
  useSliderAnimation(ref, items, duration);
  return <div data-testid="slider" ref={ref} />;
};

describe('useSliderAnimation hook', () => {
  const defaultDuration = 50;

  it('applies the slide animation style when items and ref exist', () => {
    const items = [1, 2, 3];
    render(<SliderTestComponent items={items} duration={defaultDuration} />);
    const slider = screen.getByTestId('slider');
    expect(slider.style.animation).toBe(`${defaultDuration}s linear infinite slideAnimation`);
  });

  it('does not apply animation style when items is null', () => {
    render(<SliderTestComponent items={null} />);
    const slider = screen.getByTestId('slider');
    expect(slider.style.animation).toBe('');
  });
});
