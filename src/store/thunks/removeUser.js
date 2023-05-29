import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const removeUser = createAsyncThunk('users/removeUser', async (id) => {
  const response = await axios.delete(`http://localhost:3333/users/${id}`)

  await pause(10000)
  return id
})

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
