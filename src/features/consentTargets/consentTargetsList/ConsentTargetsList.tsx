import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Loader } from '../../../common/components/loader/Loader';
import { tidConsentTarget } from '../../../common/testUtils/testIds';
import {
  fetchConsentTargets,
  selectConsentTargets,
  selectIsConsentTargetsLoading,
  selectIsConsentTargetsLoadingFailed,
} from '../consentTargetsSlice';

export type ConsentTargetsListProps = {
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
};

export function ConsentTargetsList({
  selectedIds,
  onChange,
}: ConsentTargetsListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsConsentTargetsLoading);
  const isFailed = useAppSelector(selectIsConsentTargetsLoadingFailed);
  const consentTargets = useAppSelector(selectConsentTargets);
  const getIsSelected = (targetId: string) => selectedIds.includes(targetId);
  const toggleTarget = (toggledId: string) => {
    const updatedIds = getIsSelected(toggledId)
      ? selectedIds.filter((selectedId) => selectedId !== toggledId)
      : [...selectedIds, toggledId];
    onChange(updatedIds);
  };

  useEffect(() => {
    dispatch(fetchConsentTargets());
  }, [dispatch]);

  if (isLoading) {
    return <div><Loader /></div>;
  }

  if (isFailed) {
    return <div>Loading failed</div>;
  }

  return (
    <div>
      {consentTargets.map((consentTarget) => {
        return (
          <div
            data-testid={tidConsentTarget(consentTarget.id)}
            key={consentTarget.id}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={getIsSelected(consentTarget.id)}
                  onChange={() => toggleTarget(consentTarget.id)}
                />
              }
              label={consentTarget.label}
            />
          </div>
        );
      })}
    </div>
  );
}
