import { useFetchAlbumsQuery } from '../store'

export default function AlbumsList({ user }) {
  const { data: albums, isLoading, error } = useFetchAlbumsQuery(user)
  console.log(useFetchAlbumsQuery(user))
  return <div>Albums for {user.name}</div>
}
