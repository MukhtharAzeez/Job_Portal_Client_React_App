import { combineReducers, configureStore } from "@reduxjs/toolkit";
import companyAdminAuthSlice from "./company-admin/CompanyAdminAuthSlicer";
import companyAuthSlice from "./company/companyAuthSlicer";
import notifierSlice from "./notifier/Notifier";
import progressBarSlice from "./progressBar/ProgressBarSlicer";
import userSideThemeSlice from "./user/ThemeSlice";
import userAuthSlice from "./user/userAuthSlicer";

const reducer = combineReducers({
  progress: progressBarSlice.reducer,
  user: userAuthSlice.reducer,
  userTheme: userSideThemeSlice.reducer,
  company: companyAuthSlice.reducer,
  companyAdmin: companyAdminAuthSlice.reducer,
  notifier: notifierSlice.reducer
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
