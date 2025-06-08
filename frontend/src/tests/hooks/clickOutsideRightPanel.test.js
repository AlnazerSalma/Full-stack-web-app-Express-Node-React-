import React, { useRef, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const TestComponent = ({ onOutsideClick, when = true }) => {
  const ref = useRef();
  const [clickedOutside, setClickedOutside] = useState(false);

  useOnClickOutside(
    ref,
    () => {
      onOutsideClick();
      setClickedOutside(true);
    },
    when
  );

  return (
    <div>
      <div ref={ref} data-testid="inside">Inside</div>
      <div data-testid="outside">Outside</div>
      {clickedOutside && <span data-testid="clicked-out">Clicked Outside</span>}
    </div>
  );
};

const setup = (props = {}) => {
  const onOutsideClick = jest.fn();
  render(<TestComponent onOutsideClick={onOutsideClick} {...props} />);
  return { onOutsideClick };
};

describe('useOnClickOutside hook', () => {
  it('calls handler when clicking outside the element', () => {
    const { onOutsideClick } = setup();

    fireEvent.mouseDown(screen.getByTestId('outside'));

    expect(onOutsideClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('clicked-out')).toBeInTheDocument();
  });

  it('does not call handler when clicking inside the element', () => {
    const { onOutsideClick } = setup();

    fireEvent.mouseDown(screen.getByTestId('inside'));

    expect(onOutsideClick).not.toHaveBeenCalled();
    expect(screen.queryByTestId('clicked-out')).not.toBeInTheDocument();
  });

  it('does not trigger handler when hook is inactive', () => {
    const { onOutsideClick } = setup({ when: false });

    fireEvent.mouseDown(screen.getByTestId('outside'));

    expect(onOutsideClick).not.toHaveBeenCalled();
    expect(screen.queryByTestId('clicked-out')).not.toBeInTheDocument();
  });
});
