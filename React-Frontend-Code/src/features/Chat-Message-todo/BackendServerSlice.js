import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  BackendLink: 'http://localhost:8000'
};

const BackendServerSlice = createSlice({
  name: 'backendServer',
  initialState,
  reducers: {
    updateBackendLink: (state, action) => {
      state.BackendLink = action.payload;
    }
  }
});

export const { updateBackendLink } = BackendServerSlice.actions;

export default BackendServerSlice.reducer;
