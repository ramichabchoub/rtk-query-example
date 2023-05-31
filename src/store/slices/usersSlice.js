import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../thunks/fetchUsers'
import { addUser } from '../thunks/addUser'
import { removeUser } from '../thunks/removeUser'

const initialState = {
  usersList: [],
  isLoading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.push(action.payload)
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload)
    },
  },
  // extraReducers: {
  //   [fetchUsers.pending]: (state) => {
  //     state.isLoading = true
  //   },
  //   [fetchUsers.fulfilled]: (state, action) => {
  //     state.isLoading = false
  //     state.usersList = action.payload
  //   },
  //   [fetchUsers.rejected]: (state, action) => {
  //     state.isLoading = false
  //     state.error = action.error
  //   },
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUsers.pending, (state) => {
  //     state.isLoading = true
  //   })
  // }
  extraReducers(builder) {
    // fetch users
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.usersList = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    // add user
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.usersList.push(action.payload)
    })
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    // remove user
    builder.addCase(removeUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.usersList = state.usersList.filter(
        (user) => user.id !== action.payload
      )
    })
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
})

export const { createUser, deleteUser } = usersSlice.actions
export const usersReducer = usersSlice.reducer
