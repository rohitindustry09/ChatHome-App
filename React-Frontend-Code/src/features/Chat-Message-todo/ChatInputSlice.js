import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  input: '',
};

const chatInputSlice = createSlice({
  name: 'chatInput',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
  },
});

export const { setInput } = chatInputSlice.actions; // Export the action
export default chatInputSlice.reducer; // Export the reducer
