import React from 'react';
import { waitFor } from '@testing-library/react';
import { renderWithStore } from '../../../common/testUtils/helpers';
import { ConsentTargetsList } from './ConsentTargetsList';
import { MOCK_CONSENT_TARGETS } from '../../../api/mocks/consentTargetsMocks';
import { act } from 'react-dom/test-utils';
import { tidConsentTarget } from '../../../common/testUtils/testIds';

const onChangeSpy = jest.fn();
const render = (selectedIds: string[]) => {
  return renderWithStore(
    <ConsentTargetsList onChange={onChangeSpy} selectedIds={selectedIds} />
  );
};

describe('ConsentTargetsList component', () => {
  it('should show loader', () => {
    const { getByText } = render([]);

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should show consent targets', async () => {
    const { getByTestId } = render([]);

    await waitFor(() =>
      getByTestId(tidConsentTarget(MOCK_CONSENT_TARGETS[0].id))
    );

    MOCK_CONSENT_TARGETS.forEach((mock) => {
      expect(getByTestId(tidConsentTarget(mock.id))).toBeInTheDocument();
    });
  });

  it('should show consent targets checked', async () => {
    const { getByTestId } = render([MOCK_CONSENT_TARGETS[0].id]);

    await waitFor(() =>
      getByTestId(tidConsentTarget(MOCK_CONSENT_TARGETS[0].id))
    );

    const checkedConsentTargetCheckbox = getByTestId(
      tidConsentTarget(MOCK_CONSENT_TARGETS[0].id)
    ).querySelector('input');
    const notCheckedConsentTargetCheckbox = getByTestId(
      tidConsentTarget(MOCK_CONSENT_TARGETS[1].id)
    ).querySelector('input');

    expect(checkedConsentTargetCheckbox?.hasAttribute('checked')).toBeTruthy();
    expect(notCheckedConsentTargetCheckbox?.hasAttribute('checked')).toBeFalsy();
  });

  it('should trigger onChange callback', async () => {
    const { getByTestId } = render([]);

    await waitFor(() =>
      getByTestId(tidConsentTarget(MOCK_CONSENT_TARGETS[0].id))
    );

    const checkbox = getByTestId(
      tidConsentTarget(MOCK_CONSENT_TARGETS[0].id)
    ).querySelector('input');

    act(() => {
      checkbox?.click();
    })

    expect(onChangeSpy).toHaveBeenLastCalledWith([MOCK_CONSENT_TARGETS[0].id])
  })
});
