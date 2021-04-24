import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { useCheckIfMounted } from './useCheckIfMounted';

type WithDelayedCb = {
  delayedCb: () => void;
};

const DELAY = 100

const InnerComponent = ({ delayedCb }: WithDelayedCb) => {
  const checkIfMounted = useCheckIfMounted();

  useEffect(() => {
    setTimeout(() => {
      checkIfMounted(() => {
        delayedCb();
      });
    }, DELAY);
  });

  return null;
};

const OuterComponent = ({
  delayedCb,
  shouldDestroyInnerComponent,
}: WithDelayedCb & { shouldDestroyInnerComponent: boolean }) => {
  const [shouldShowInnerComponent, setShouldShowInnerComponent] = useState(
    true
  );

  useEffect(() => {
    if (shouldDestroyInnerComponent) {
      setShouldShowInnerComponent(false);
    }
  }, [shouldDestroyInnerComponent]);

  return shouldShowInnerComponent ? (
    <InnerComponent delayedCb={delayedCb} />
  ) : null;
};

describe('useCheckIfMounted hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runAllTimers();
  });

  test('should not call callback if the component is not mounted', async () => {
    const spy = jest.fn();
    render(
      <OuterComponent delayedCb={spy} shouldDestroyInnerComponent={true} />
    );

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(0);
    }, DELAY)

  });

  test('should call callback if the component is mounted', async () => {
    const spy = jest.fn();
    render(
      <OuterComponent delayedCb={spy} shouldDestroyInnerComponent={false} />
    );

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    }, DELAY)
  });
});
