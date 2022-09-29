import { renderHook } from '@testing-library/react';
import useOutsideClick from '../useOutsideClick';
import { RefObject } from 'react';

describe('useOutsideClick', () => {
  let clickListener: any = null;
  const addEventListenerSpy = jest
    .spyOn(document, 'addEventListener')
    .mockImplementation((_, handler) => (clickListener = handler));
  const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
  const callback = jest.fn();
  const refContains = jest.fn()
  const ref = { current: { contains: refContains } } as RefObject<any>;
  const stopPropagationSpy = jest.fn();
  const event = { stopPropagation: stopPropagationSpy };

  afterEach(() => {
    clickListener = null;
    addEventListenerSpy.mockClear();
    stopPropagationSpy.mockClear();
    refContains.mockReturnValue(true);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should register document listener', () => {
    renderHook(() => useOutsideClick({ active: true, callback, ref }));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.anything(),
      true,
    );
  });

  it('should un-register document listener on unmount, when active', () => {
    const { unmount } = renderHook(() =>
      useOutsideClick({ active: true, callback, ref }),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.anything(),
      true,
    );
  });

  it('should un-register document listener, when active switch to inactive', () => {
    const { rerender } = renderHook(
      ({ active }) => useOutsideClick({ active, callback, ref }),
      { initialProps: { active: true } },
    );

    rerender({ active: false });

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.anything(),
      true,
    );
  });

  it('should un-register document listener when inactive', () => {
    renderHook(() => useOutsideClick({ active: false, callback, ref }));

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.anything(),
      true,
    );
  });

  describe('clickHandler', () => {
    it('should call callback, when ref does not contain element which has been clicked on', () => {
      refContains.mockReturnValue(false)
      renderHook(() => useOutsideClick({ active: true, callback, ref }));

      clickListener(event);

      expect(stopPropagationSpy).toHaveBeenCalled();
      expect(callback).toHaveBeenCalled();
    });

    it('should not call callback, when ref contains element which has been clicked on', () => {
      renderHook(() => useOutsideClick({ active: true, callback, ref }));

      clickListener(event);

      expect(stopPropagationSpy).not.toHaveBeenCalled();
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
