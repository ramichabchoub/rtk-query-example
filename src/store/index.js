// states that we need for now:
// users list:      Array of objects {id, name}
// isLoading:       boolean
// error:           object {message}

// actions:

// thunks:
// fetch users:     {type: 'users/fetchUsers'}
// add user:        {type: 'users/addUser', payload: {name}}

import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './slices/usersSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})

export * from './thunks/fetchUsers'
export * from './thunks/addUser'
export * from './thunks/removeUser'
