import { rest } from 'msw';
import { ConsentTargetModel } from '../../models/ConsentTargetModel';
import { CONSENT_TARGETS_ENDPOINT } from '../consentTargets';
import { delay } from './helpers';

export const MOCK_CONSENT_TARGETS: ConsentTargetModel[] = [
  {
    id: 'RECEIVE_NEWSLETTER',
    label: 'Receive newsletter',
  },
  {
    id: 'BE_SHOWN_ADS',
    label: 'Be shown targeted ads',
  },
  {
    id: 'CONTRIBUTE_TO_STATISTICS',
    label: 'Contribute to anonymous visit statistics',
  },
];

export const consentTargetsMocks = [
  rest.get(CONSENT_TARGETS_ENDPOINT, (req, res, ctx) => {
    return res(
      ctx.delay(delay(1500)),
      ctx.status(200),
      ctx.json(MOCK_CONSENT_TARGETS)
    );
  }),
];
