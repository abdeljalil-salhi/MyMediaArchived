import ReduxLogger from "redux-logger";
import {
  Action,
  AnyAction,
  configureStore,
  EnhancedStore,
  ThunkAction,
} from "@reduxjs/toolkit";

import profileReducer from "./slices/profileSlice";
import homePostsReducer from "./slices/homePostsSlice";
import profilePostsReducer from "./slices/profilePostsSlice";
import { IRootState } from "./types";

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(ReduxLogger);

export const store: EnhancedStore<IRootState, AnyAction, any> = configureStore({
  middleware,
  reducer: {
    profile: profileReducer,
    homePosts: homePostsReducer,
    profilePosts: profilePostsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: e.i. {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Inferred type: ThunkAction<void, RootState, unknown, Action<string>>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
