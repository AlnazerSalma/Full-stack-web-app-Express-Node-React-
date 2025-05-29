/* eslint-disable testing-library/prefer-presence-queries */
import React, { useRef, useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import useOnClickOutside from '../../hooks/useOnClickOutside'; // adjust path if needed

const TestComponent = ({ onOutsideClick, when = true }) => {
  const ref = useRef();
  const [clickedOutside, setClickedOutside] = useState(false);

  useOnClickOutside(ref, () => {
    onOutsideClick();
    setClickedOutside(true);
  }, when);

  return (
    <div>
      <div ref={ref} data-testid="inside">Inside</div>
      <div data-testid="outside">Outside</div>
      {clickedOutside && <span data-testid="clicked-out">Clicked Outside</span>}
    </div>
  );
};

describe('clickOutsideRightPanel', () => {
  it('calls handler when clicking outside the element', () => {
    const onOutsideClick = jest.fn();
    const { getByTestId, queryByTestId } = render(<TestComponent onOutsideClick={onOutsideClick} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.mouseDown(getByTestId('outside'));

    expect(onOutsideClick).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(queryByTestId('clicked-out')).toBeInTheDocument();
  });

  it('does not call handler when clicking inside the element', () => {
    const onOutsideClick = jest.fn();
    const { getByTestId, queryByTestId } = render(<TestComponent onOutsideClick={onOutsideClick} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.mouseDown(getByTestId('inside'));

    expect(onOutsideClick).not.toHaveBeenCalled();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(queryByTestId('clicked-out')).not.toBeInTheDocument();
  });

  it('does not trigger handler when hook is inactive', () => {
    const onOutsideClick = jest.fn();
    const { getByTestId, queryByTestId } = render(<TestComponent onOutsideClick={onOutsideClick} when={false} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.mouseDown(getByTestId('outside'));

    expect(onOutsideClick).not.toHaveBeenCalled();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(queryByTestId('clicked-out')).not.toBeInTheDocument();
  });
});
