import { ConsentModel } from '../models/ConsentModel';
import { url } from './helpers';
import axios from 'axios';

export const CONSENTS_ENDPOINT = url('consents');

export async function getConsents(): Promise<ConsentModel[]> {
  const rsp = await axios.get<ConsentModel[]>(CONSENTS_ENDPOINT);

  return rsp.data;
}

export async function createConsent(
  consent: ConsentModel
): Promise<ConsentModel> {
  const rsp = await axios.post<ConsentModel>(CONSENTS_ENDPOINT, { consent });

  return rsp.data;
}
