import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { faker } from '@faker-js/faker'

export const addUser = createAsyncThunk('users/addUser', async () => {
  const response = await axios.post('http://localhost:3333/users', {
    name: faker.person.fullName(),
  })

  await pause(1000)
  return response.data
})

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
