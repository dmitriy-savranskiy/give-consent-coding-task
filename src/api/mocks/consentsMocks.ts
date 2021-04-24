import { rest } from 'msw';
import { ConsentModel } from '../../models/ConsentModel';
import { CONSENTS_ENDPOINT } from '../consents';
import { MOCK_CONSENT_TARGETS } from './consentTargetsMocks';
import {
  delay,
  getFromSessionStorage,
  getUniqueId,
  saveToSessionStorage,
} from './helpers';

const SESSION_STORAGE_KEY = 'http-mock-consents';

export const MOCK_CONSENTS: ConsentModel[] = [
  {
    id: '1',
    consentTargetIds: [MOCK_CONSENT_TARGETS[0].id],
    email: 'mock@email.com',
    name: 'mock name',
  },
  {
    id: '2',
    consentTargetIds: [MOCK_CONSENT_TARGETS[1].id, MOCK_CONSENT_TARGETS[2].id],
    email: 'mock2@email.com',
    name: 'mock name2',
  },
  {
    id: '3',
    consentTargetIds: [MOCK_CONSENT_TARGETS[2].id],
    email: 'mock3@email.com',
    name: 'mock name3',
  },
];

export const consentsMocks = [
  rest.get(CONSENTS_ENDPOINT, (req, res, ctx) => {
    return res(
      ctx.delay(delay(1500)),
      ctx.status(200),
      ctx.json(getFromSessionStorage(SESSION_STORAGE_KEY, MOCK_CONSENTS) || [])
    );
  }),

  rest.post<{ consent: ConsentModel }>(CONSENTS_ENDPOINT, (req, res, ctx) => {
    const currentConsents =
      getFromSessionStorage<ConsentModel[]>(SESSION_STORAGE_KEY) || [];
    const newConsent = {
      ...req.body.consent,
      id: getUniqueId(),
    };
    const updatedConsents = [...currentConsents, newConsent];

    saveToSessionStorage(SESSION_STORAGE_KEY, updatedConsents);

    return res(
      ctx.delay(delay(2000)),
      ctx.status(200),
      ctx.json(updatedConsents)
    );
  }),
];
