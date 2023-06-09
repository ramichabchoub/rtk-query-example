import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const albumsApi = createApi({
  reducerPath: 'albumsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333',
    // fetchFn: async (...args) => {
    //   await pause(1000)
    //   return fetch(...args)
    // },
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, args) => {
          // console.log('args from fetchAlbums', args)
          const tags = result.map((album) => ({ type: 'Albums', id: album.id }))
          tags.push({ type: 'UserAlbums', id: args.id })
          return tags
        },
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
          // await pause(1000)
          return response
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: 'UserAlbums', id: args.userId }]
        },
        query: (data) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              title: data.title,
              userId: data.userId,
            },
          }
        },
        transformResponse: async (response) => {
          // await pause(1000)
          return response
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: 'Albums', id: args.id }]
        },
        query: (data) => {
          return {
            url: `/albums/${data.id}`,
            method: 'DELETE',
          }
        },
        transformResponse: async (response) => {
          // await pause(1000)
          return response
        },
      }),
    }
  },
})
// console.log(albumsApi)
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi
export { albumsApi }
