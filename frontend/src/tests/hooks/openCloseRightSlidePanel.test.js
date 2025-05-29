import { renderHook, act } from '@testing-library/react';
import useRightSlidePanel from '../../hooks/useRightSlidePanel';

describe('useRightSlidePanel', () => {
  it('initializes with panel closed and no item selected', () => {
    const { result } = renderHook(() => useRightSlidePanel());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedItem).toBeNull();
  });

  it('activates panel with selected item', () => {
    const { result } = renderHook(() => useRightSlidePanel());
    const mockItem = { id: 1, name: 'Test Item' };

    act(() => {
      result.current.openPanel(mockItem);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedItem).toEqual(mockItem);
  });

  it('closes panel and clears selected item', () => {
    const { result } = renderHook(() => useRightSlidePanel());
    const mockItem = { id: 2, name: 'Another Item' };

    act(() => {
      result.current.openPanel(mockItem);
      result.current.closePanel();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedItem).toBeNull();
  });

it('reopens the panel with a new item after closing it', () => {
  const { result } = renderHook(() => useRightSlidePanel());
  const firstItem = { id: 1, name: 'First' };
  const secondItem = { id: 2, name: 'Second' };

  act(() => {
    result.current.openPanel(firstItem);
    result.current.closePanel();
    result.current.openPanel(secondItem);
  });

  expect(result.current.isOpen).toBe(true);
  expect(result.current.selectedItem).toEqual(secondItem);
});

});
