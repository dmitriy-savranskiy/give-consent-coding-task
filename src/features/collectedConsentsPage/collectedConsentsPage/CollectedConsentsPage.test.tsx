import { waitForElementToBeRemoved } from '@testing-library/dom';
import { rest } from 'msw';
import { CONSENTS_ENDPOINT } from '../../../api/consents';
import { MOCK_CONSENTS } from '../../../api/mocks/consentsMocks';
import { MOCK_CONSENT_TARGETS } from '../../../api/mocks/consentTargetsMocks';
import { server } from '../../../api/mocks/server';
import { renderWithStore } from '../../../common/testUtils/helpers';
import { tidLoader } from '../../../common/testUtils/testIds';
import { CollectedConsentsPage } from './CollectedConsentsPage';

describe('CollectedConsentsPage component', () => {
  test('should show "no rows" if there are no consents', async () => {
    server.use(
      rest.get(CONSENTS_ENDPOINT, (req, res, ctx) => res(ctx.json([])))
    );
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const {
      getByText,
      getByTestId,
    } = renderWithStore(<CollectedConsentsPage />);
    const loader = getByTestId(tidLoader());

    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
    consoleSpy.mockRestore();

    expect(getByText('No rows')).toBeInTheDocument();
  });

  test('should show given consents properly', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const {
      getAllByRole,
      getByText,
      getByTestId,
      queryByText,
    } = renderWithStore(<CollectedConsentsPage />);
    const loader = getByTestId(tidLoader());

    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);

    consoleSpy.mockRestore();
    const rows = getAllByRole('row');
    // 1 row is the header and 2 are consents
    expect(rows.length).toBe(3);

    const shouldBeInTheDocument = MOCK_CONSENTS.slice(0, 2);
    const shouldNotBeInTheDocument = MOCK_CONSENTS.slice(2);

    shouldBeInTheDocument.forEach((consent) => {
      const consentTargets = consent.consentTargetIds
        .map(
          (targetId) =>
            MOCK_CONSENT_TARGETS.find((target) => target.id === targetId)?.label
        )
        .join(', ');
      expect(getByText(consent.name)).toBeInTheDocument();
      expect(getByText(consent.email)).toBeInTheDocument();
      expect(getByText(consentTargets)).toBeInTheDocument();
    });

    shouldNotBeInTheDocument.forEach((consent) => {
      expect(queryByText(consent.email)).not.toBeInTheDocument();
    });
  });
});
