import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async (userId) => {
  const response = await axios.get(`http://localhost:3333/albums?userId=${userId}`)
  return response.data
})
