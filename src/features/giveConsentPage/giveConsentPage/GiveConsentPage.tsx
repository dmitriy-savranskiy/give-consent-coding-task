import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router';
import * as ConsentsApi from '../../../api/consents';
import { CONSENTS_ROUTE } from '../../../app/AppRouter';
import { useAppSelector } from '../../../app/hooks';
import {
  tidGiveConsentConsentTargets,
  tidGiveConsentEmail,
  tidGiveConsentGiveBtn,
  tidGiveConsentName,
} from '../../../common/testUtils/testIds';
import { ConsentModel } from '../../../models/ConsentModel';
import { ConsentTargetsList } from '../../consentTargets/consentTargetsList/ConsentTargetsList';
import { selectIsConsentTargetsLoading } from '../../consentTargets/consentTargetsSlice';

import styles from './GiveConsentPage.module.scss';

export function GiveConsentPage(): JSX.Element {
  const areConsentTargetsLoading = useAppSelector(
    selectIsConsentTargetsLoading
  );
  const history = useHistory();
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTargetIds, setSelectedTargetIds] = useState<string[]>([]);

  const isGiveConsentDisabled =
    isRequestInProgress ||
    areConsentTargetsLoading ||
    name === '' ||
    email === '' ||
    selectedTargetIds.length === 0;

  const onGiveConsentClick = async () => {
    setIsRequestInProgress(true);
    const consent: ConsentModel = {
      name,
      email,
      consentTargetIds: selectedTargetIds,
    };
    await ConsentsApi.createConsent(consent);
    history.push(CONSENTS_ROUTE);
  };

  const giveConsentBtnContent = isRequestInProgress
    ? 'Processing...'
    : 'Give consent';

  return (
    <div className={styles.container}>
      <div>
        <TextField
          data-testid={tidGiveConsentName()}
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          data-testid={tidGiveConsentEmail()}
          placeholder="Email address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div
        data-testid={tidGiveConsentConsentTargets()}
        className={styles.consentTargets}
      >
        <ConsentTargetsList
          selectedIds={selectedTargetIds}
          onChange={setSelectedTargetIds}
        />
      </div>
      <Button
        data-testid={tidGiveConsentGiveBtn()}
        color="primary"
        variant="contained"
        onClick={onGiveConsentClick}
        disabled={isGiveConsentDisabled}
      >
        {giveConsentBtnContent}
      </Button>
    </div>
  );
}
