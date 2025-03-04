import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userComments: {},
}

const CommentSlice = createSlice({
  name: 'userComments',
  initialState,
  reducers: {
    updateUserCommentId: (state, action) => {
      state.userComments = action.payload;
    }
  }
});

export const { updateUserCommentId } = CommentSlice.actions;

export default CommentSlice.reducer;
