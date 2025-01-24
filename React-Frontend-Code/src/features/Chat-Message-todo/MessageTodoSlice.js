import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  messages: [{ chatId: 123, message: 'Hello, There!' }]
}

const MessageTodoSlice = createSlice({
  name: 'messageTodo',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const newMessage = {
        chatId: nanoid(),
        message: action.payload
      }
      state.messages.push(newMessage);
    },
    removeMessage: (state, action) => {
      
    }
  }
});

export const { addMessage, removeMessage } = MessageTodoSlice.actions;//for components

export default MessageTodoSlice.reducer;//for store