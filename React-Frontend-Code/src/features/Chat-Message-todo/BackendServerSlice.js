import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  BackendLink: 'https://chat-me-1z46.onrender.com'
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
