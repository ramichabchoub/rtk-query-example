import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton'
import ExpendadblePanel from './ExpendadblePanel'
import Button from './Button'
import { faker } from '@faker-js/faker'

export default function AlbumsList({ user }) {
  const { data: albums, isLoading, error } = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()

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
    content = albums.map((album) => {
      const header = <>{album.title}</>
      return (
        <ExpendadblePanel key={album.id} header={header}>
          List of photos in the album
        </ExpendadblePanel>
      )
    })
  }

  // console.log(useFetchAlbumsQuery(user))
  return (
    <div>
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        Albums for {user.name}
        <Button onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  )
}
