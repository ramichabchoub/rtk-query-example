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

// queries:
// fetchAlbums
// addAlbum

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersReducer } from './slices/usersSlice'
// import { albumsReducer } from './slices/albumSlice'
import { albumsApi } from './apis/albumsApi'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // albums: albumsReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(albumsApi.middleware),
})

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

setupListeners(store.dispatch)

export * from './thunks/fetchUsers'
export * from './thunks/addUser'
export * from './thunks/removeUser'
export * from './thunks/fetchAlbums'

export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albumsApi'
