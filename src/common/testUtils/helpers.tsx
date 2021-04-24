import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory, MemoryHistory } from 'history';
import { store } from '../../app/store';

export function renderWithStore(
  ui: JSX.Element
): ReturnType<typeof render> & { history: MemoryHistory } {
  const history = createMemoryHistory()
  const renderResult = render(
    <Router history={history}>
      <Provider store={store}>{ui}</Provider>
    </Router>
  );

  return {
    ...renderResult,
    history,
  };
}

export function mockComponentForSnapshot(name: string) {
  return (props: { children?: JSX.Element } & unknown): JSX.Element => {
    const { children, ...restProps } = props;

    return (
      <div>
        <div>{name}Mock</div>
        <div>{JSON.stringify(restProps)}</div>
        <div>{children}</div>
      </div>
    );
  };
}

// use this function only when you know that the input element is rendered no matter what.
export function getInputEl(element: HTMLElement): HTMLInputElement {
  return element.querySelector('input') as HTMLInputElement;
}
