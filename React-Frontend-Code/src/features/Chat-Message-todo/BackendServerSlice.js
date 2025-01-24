import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  BackendLink: 'https://indicated-need-brown-integrating.trycloudflare.com'
  
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
