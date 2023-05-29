import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:3333/users')

  await pause(1000)
  return response.data
})

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
