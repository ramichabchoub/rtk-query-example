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
      }),
    }
  },
})

console.log(albumsApi)

export const { useFetchAlbumsQuery } = albumsApi
export { albumsApi }
