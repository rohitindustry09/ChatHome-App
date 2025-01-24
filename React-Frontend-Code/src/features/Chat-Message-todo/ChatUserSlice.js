import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { 
    username: '',
    avatar: '', 
    email: '',
    phone: '', 
    bio: '', 
    friends: ''
  }
};

const ChatUserSlice = createSlice({
  name: 'chatUser',
  initialState,
  reducers: {
    addChatUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    }
  }
});

export const { addChatUser } = ChatUserSlice.actions;
export default ChatUserSlice.reducer;