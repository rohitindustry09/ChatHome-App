import { configureStore } from '@reduxjs/toolkit';
import MessageReducer from '../features/Chat-Message-todo/MessageTodoSlice.js';
import chatInputReducer from '../features/Chat-Message-todo/ChatInputSlice.js';
import chatUserReducer from '../features/Chat-Message-todo/ChatUserSlice.js';
import BackendServerReducer from '../features/Chat-Message-todo/BackendServerSlice.js';

export const store = configureStore({
  reducer: {
    message: MessageReducer,
    chatInput: chatInputReducer,
    chatUser: chatUserReducer,
    backendLink: BackendServerReducer
  }
});
