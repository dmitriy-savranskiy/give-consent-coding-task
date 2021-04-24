import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as ConsentTargetsApi from '../../api/consentTargets';
import { RootState } from '../../app/store';
import { FetchableStatus } from '../../common/types/fetchableStatus';
import { ConsentTargetModel } from '../../models/ConsentTargetModel';

export interface ConsentTargetsState {
  consentTargets: ConsentTargetModel[];
  status: FetchableStatus;
}

const initialState: ConsentTargetsState = {
  consentTargets: [],
  status: 'initial',
};

export const fetchConsentTargets = createAsyncThunk(
  'consentTargets/fetch',
  async () => {
    const rsp = await ConsentTargetsApi.getConsentTargets();

    return rsp;
  }
);

export const consentTargetsSlice = createSlice({
  name: 'consent-targets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConsentTargets.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchConsentTargets.rejected, (state) => {
      state.status = 'failed';
    });

    builder.addCase(fetchConsentTargets.fulfilled, (state, action) => {
      state.status = 'idle';
      state.consentTargets = action.payload;
    });
  },
});

export const selectConsentTargets = (state: RootState) =>
  state.consentTargets.consentTargets;
export const selectIsConsentTargetsLoading = (state: RootState) =>
  state.consentTargets.status === 'loading';
export const selectIsConsentTargetsLoadingFailed = (state: RootState) =>
  state.consentTargets.status === 'failed';

export const consentTargetsReducer = consentTargetsSlice.reducer;
