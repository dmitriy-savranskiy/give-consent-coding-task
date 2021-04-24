import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/dom';
import { act } from 'react-test-renderer';
import { createConsent } from '../../../api/consents';
import { MOCK_CONSENT_TARGETS } from '../../../api/mocks/consentTargetsMocks';
import { getInputEl, renderWithStore } from '../../../common/testUtils/helpers';
import {
  tidGiveConsentConsentTargets,
  tidGiveConsentEmail,
  tidGiveConsentGiveBtn,
  tidGiveConsentName,
  tidLoader,
} from '../../../common/testUtils/testIds';
import { ConsentModel } from '../../../models/ConsentModel';
import { GiveConsentPage } from './GiveConsentPage';

jest.mock('../../../api/consents', () => {
  return {
    createConsent: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});

describe('GiveConsentPage component', () => {
  test('should render and work properly', async () => {
    const { getAllByTestId, getByTestId, history } = renderWithStore(
      <GiveConsentPage />
    );

    const loaders = getAllByTestId(tidLoader());
    expect(loaders.length).toBeGreaterThan(0);
    await waitForElementToBeRemoved(loaders);

    const nameInput = getByTestId(tidGiveConsentName());
    const emailInput = getByTestId(tidGiveConsentEmail());
    const consentTargets = getByTestId(tidGiveConsentConsentTargets());
    const giveBtn = getByTestId(tidGiveConsentGiveBtn());

    // should render all required elements
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(consentTargets).toBeInTheDocument();
    expect(giveBtn).toBeInTheDocument();

    const creatingConsent: ConsentModel = {
      name: 'New consent name',
      email: 'newconsent@email.com',
      consentTargetIds: [MOCK_CONSENT_TARGETS[0].id],
    };

    // give button should be disabled until the user put their name,
    // email and check at least one checkbox
    expect(giveBtn.hasAttribute('disabled')).toBeTruthy();
    act(() => {
      fireEvent.change(getInputEl(nameInput), {
        target: { value: creatingConsent.name },
      });
    });
    expect(giveBtn.hasAttribute('disabled')).toBeTruthy();
    act(() => {
      fireEvent.change(getInputEl(emailInput), {
        target: { value: creatingConsent.email },
      });
    });
    expect(giveBtn.hasAttribute('disabled')).toBeTruthy();

    const checkboxes = consentTargets.querySelectorAll(
      'input[type="checkbox"]'
    );
    act(() => {
      fireEvent.click(checkboxes[0]);
    });
    expect(giveBtn.hasAttribute('disabled')).toBeFalsy();

    act(() => {
      fireEvent.click(giveBtn);
    });

    expect(createConsent).toHaveBeenCalledWith(creatingConsent);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/consents')
    })
  });
});
