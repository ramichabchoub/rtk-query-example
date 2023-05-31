import { faker } from '@faker-js/faker'
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton'
import Button from './Button'
import AlbumListItem from './albumListItem'

export default function AlbumsList({ user }) {
  const { data: albums, isLoading, error } = useFetchAlbumsQuery(user)
  const [addAlbum, addAlbumResults] = useAddAlbumMutation()

  const handleAddAlbum = () => {
    addAlbum({
      title: faker.commerce.productName(),
      userId: user.id,
    })
  }

  let content
  if (isLoading) {
    content = <Skeleton times={3} className="h-10 w-full" />
  } else if (error) {
    content = <div>Error fetching albums: {JSON.stringify(error, null, 2)}</div>
  } else {
    content = albums.map((album) => (
      <AlbumListItem key={album.id} album={album} />
    ))
  }

  // console.log(useFetchAlbumsQuery(user))
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        <h3 className="text-lg font-bold">
          Albums for <span className="text-red-500">"{user.name}"</span>
        </h3>
        <Button loading={addAlbumResults.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  )
}
