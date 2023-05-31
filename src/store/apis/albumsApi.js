import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const albumsApi = createApi({
  reducerPath: 'albumsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333',
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          }
        },
        // cache for 5 minutes
        keepUnusedDataFor: 5 * 60 * 1000,
        // use pause method to pause fetching for 1 seconds
        transformResponse: async (response) => {
          await pause(3000)
          return response
        },
      }),
      addAlbum: builder.mutation({
        query: (data) => {
          console.log('data', data)
          return {
            url: '/albums',
            method: 'POST',
            body: {
              title: data.title,
              userId: data.userId,
            },
          }
        },
      }),
    }
  },
})
// console.log(albumsApi)
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi
export { albumsApi }
