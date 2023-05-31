import { createSlice } from '@reduxjs/toolkit'
import { fetchAlbums } from '../thunks/fetchAlbums'

const initialState = {
  albumsList: [],
  isLoading: false,
  error: null,
}

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    createAlbum: (state, action) => {
      state.push(action.payload)
    },
    deleteAlbum: (state, action) => {
      return state.filter((album) => album.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.isLoading = false
      state.albumsList = action.payload
    })
    builder.addCase(fetchAlbums.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
})

export const { createAlbum, deleteAlbum } = albumsSlice.actions
export const albumsReducer = albumsSlice.reducer
