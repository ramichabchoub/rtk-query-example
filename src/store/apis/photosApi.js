import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333',
  }),
  endpoints: (builder) => {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, args) => {
          const tags = result.map((photo) => ({ type: 'Photos', id: photo.id }))
          tags.push({ type: 'AlbumPhotos', id: args.id })
          return tags
        },
        query: (album) => {
          return {
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          }
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: 'AlbumPhotos', id: args.albumId }]
        },
        query: (data) => {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              albumId: data.albumId,
              url: data.url,
            },
          }
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: 'Photos', id: args.id }]
        },
        query: (data) => {
          return {
            url: `/photos/${data.id}`,
            method: 'DELETE',
          }
        },
      }),
    }
  },
})

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi
export { photosApi }
