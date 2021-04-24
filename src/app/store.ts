import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { consentTargetsSlice } from '../features/consentTargets/consentTargetsSlice';

export const store = configureStore({
  reducer: {
    consentTargets: consentTargetsSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
