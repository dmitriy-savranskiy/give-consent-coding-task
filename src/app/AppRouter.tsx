import { Switch, Route, Redirect } from 'react-router-dom';
import { CollectedConsentsPage } from '../features/collectedConsentsPage/collectedConsentsPage/CollectedConsentsPage';
import { GiveConsentPage } from '../features/giveConsentPage/giveConsentPage/GiveConsentPage';

export const GIVE_CONSENT_ROUTE = '/give-consent'
export const CONSENTS_ROUTE = '/consents'

export function AppRouter(): JSX.Element {
  return (
    <Switch>
      <Route path={GIVE_CONSENT_ROUTE}>
        <GiveConsentPage />
      </Route>
      <Route path={CONSENTS_ROUTE}>
        <CollectedConsentsPage />
      </Route>
      <Route path="/">
        <Redirect to={GIVE_CONSENT_ROUTE} />
      </Route>
    </Switch>
  );
}
