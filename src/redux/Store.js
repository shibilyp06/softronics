import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/Slice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
