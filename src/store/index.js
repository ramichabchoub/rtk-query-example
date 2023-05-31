// ---- createAsyncThunk ----
// states that we need for now:
// users list:      Array of objects {id, name}
// isLoading:       boolean
// error:           object {message}

// actions:

// thunks:
// fetch users:     {type: 'users/fetchUsers'}
// add user:        {type: 'users/addUser', payload: {name}}
// remove user:     {type: 'users/removeUser', payload: {id}}

// ---- createApi ----
// states:
// albums list:     Array of objects {id, title, userId}
// photos list:     Array of objects {id, title}

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersReducer } from './slices/usersSlice'
import { albumsApi } from './apis/albumsApi'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(albumsApi.middleware),
})

setupListeners(store.dispatch)

export * from './thunks/fetchUsers'
export * from './thunks/addUser'
export * from './thunks/removeUser'

export { useFetchAlbumsQuery } from './apis/albumsApi'
