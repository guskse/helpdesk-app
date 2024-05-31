import { configureStore } from "@reduxjs/toolkit";

//reducer Slices
import authReducer from "../features/auth/authSlice";
import ticketReducer from "../features/ticket/ticketSlice";
import noteReducer from "../features/note/noteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
});
