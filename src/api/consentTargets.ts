import { url } from './helpers';
import axios from 'axios';
import { ConsentTargetModel } from '../models/ConsentTargetModel';

export const CONSENT_TARGETS_ENDPOINT = url('consent-targets');

export async function getConsentTargets(): Promise<ConsentTargetModel[]> {
  const rsp = await axios.get<ConsentTargetModel[]>(CONSENT_TARGETS_ENDPOINT);

  return rsp.data;
}
