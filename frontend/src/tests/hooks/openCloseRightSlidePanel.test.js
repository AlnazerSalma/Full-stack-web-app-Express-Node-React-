import { renderHook, act } from '@testing-library/react';
import useRightSlidePanel from '../../hooks/useRightSlidePanel';
import { mockItem1, mockItem2 } from '../__mocks_data__/mockRightSlidePanel';

describe('useRightSlidePanel hook', () => {
  const setup = () => renderHook(() => useRightSlidePanel());
  it('initializes with panel closed and no item selected', () => {
    const { result } = setup();
    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedItem).toBeNull();
  });

  it('activates panel with selected item', () => {
    const { result } = setup();
    act(() => {
       result.current.openPanel(mockItem1);
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedItem).toEqual(mockItem1);
  });

  it('closes panel and clears selected item', () => {
    const { result } = setup();
    act(() => {
      result.current.openPanel(mockItem2);
      result.current.closePanel();
    });
    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedItem).toBeNull();
  });

it('reopens the panel with a new item after closing it', () => {
  const { result } = setup();
  act(() => {
      result.current.openPanel(mockItem1);
      result.current.closePanel();
      result.current.openPanel(mockItem2);
  });

  expect(result.current.isOpen).toBe(true);
  expect(result.current.selectedItem).toEqual(mockItem2);
});

});
