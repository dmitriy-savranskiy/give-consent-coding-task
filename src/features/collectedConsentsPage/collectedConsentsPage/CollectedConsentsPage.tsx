import { DataGrid } from '@material-ui/data-grid';
import { useEffect, useMemo, useState } from 'react';
import * as ConsentsApi from '../../../api/consents';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Loader } from '../../../common/components/loader/Loader';
import { useCheckIfMounted } from '../../../common/hooks/useCheckIfMounted';
import { ConsentModel } from '../../../models/ConsentModel';
import { ConsentTargetModel } from '../../../models/ConsentTargetModel';
import {
  fetchConsentTargets,
  selectConsentTargets,
  selectIsConsentTargetsLoading,
} from '../../consentTargets/consentTargetsSlice';

import styles from './CollectedConsentsPage.module.scss';

export function CollectedConsentsPage(): JSX.Element {
  const checkIfMounted = useCheckIfMounted();
  const dispatch = useAppDispatch();
  const consentTargets = useAppSelector(selectConsentTargets);
  const areConsentTargetsLoading = useAppSelector(
    selectIsConsentTargetsLoading
  );
  const [consents, setConsents] = useState<ConsentModel[]>([]);
  const [areConsentsLoading, setAreConsentsLoading] = useState(true);
  const consentTargetsById = useMemo<Record<string, ConsentTargetModel>>(() => {
    return consentTargets.reduce((result, target) => {
      return {
        ...result,
        [target.id]: target,
      };
    }, {});
  }, [consentTargets]);

  useEffect(() => {
    const initConsents = async () => {
      const consents = await ConsentsApi.getConsents();

      checkIfMounted(() => {
        setAreConsentsLoading(false);
        setConsents(consents);
      });
    };
    const initConsentTargets = async () => {
      dispatch(fetchConsentTargets());
    };

    initConsents();
    initConsentTargets();
  }, [dispatch, checkIfMounted]);

  if (areConsentsLoading || areConsentTargetsLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <DataGrid
        columns={[
          {
            field: 'name',
            headerName: 'Name',
            width: 200,
          },
          {
            field: 'email',
            headerName: 'Email',
            width: 200,
          },
          {
            field: 'consentTargetIds',
            hide: true,
          },
          {
            field: 'consentTargets',
            headerName: 'Consent given for',
            flex: 1,
            valueGetter: (params) => {
              const consentTargetIds: string[] = params.getValue(
                'consentTargetIds'
              ) as string[];

              return consentTargetIds
                .map((targetId) => consentTargetsById[targetId]?.label)
                .join(', ');
            },
          },
        ]}
        rows={consents}
        autoHeight={true}
        pageSize={2}
      />
    </div>
  );
}
