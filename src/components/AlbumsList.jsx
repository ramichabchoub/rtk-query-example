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
      <div className="m-2 flex flex-row items-center justify-between">
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        <h3 className="text-lg font-bold">
          Albums for <span className="text-red-500">"{user.name}"</span>
        </h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  )
}
