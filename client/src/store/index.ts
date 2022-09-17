import ReduxLogger from "redux-logger";
import {
  Action,
  AnyAction,
  configureStore,
  EnhancedStore,
  ThunkAction,
} from "@reduxjs/toolkit";

import { IRootState } from "./types";
import profileReducer from "./slices/profileSlice";
import homePostsReducer from "./slices/homePostsSlice";
import profilePostsReducer from "./slices/profilePostsSlice";
import newPostsReducer from "./slices/newPostsSlice";

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(ReduxLogger);

export const store: EnhancedStore<IRootState, AnyAction, any> = configureStore({
  middleware,
  reducer: {
    profile: profileReducer,
    homePosts: homePostsReducer,
    profilePosts: profilePostsReducer,
    newPosts: newPostsReducer,
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
