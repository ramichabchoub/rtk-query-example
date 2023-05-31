import { GoTrashcan } from 'react-icons/go'
import { faker } from '@faker-js/faker'
import {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from '../store'
import Skeleton from './Skeleton'
import ExpendadblePanel from './ExpendadblePanel'
import Button from './Button'

export default function AlbumsList({ user }) {
  const { data: albums, isLoading, error } = useFetchAlbumsQuery(user)
  const [addAlbum, addAlbumResults] = useAddAlbumMutation()
  const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation()

  const handleAddAlbum = () => {
    addAlbum({
      title: faker.commerce.productName(),
      userId: user.id,
    })
  }

  const handleRemoveAlbum = (album) => {
    removeAlbum(album)
  }

  let content
  if (isLoading) {
    content = <Skeleton times={3} className="h-10 w-full" />
  } else if (error) {
    content = <div>Error fetching albums: {JSON.stringify(error, null, 2)}</div>
  } else {
    content = albums.map((album) => {
      const header = (
        <>
          <Button
            isRemoving={removeAlbumResults.isLoading}
            onClick={() => handleRemoveAlbum(album)}
            className="mr-2"
          >
            <GoTrashcan />
          </Button>
          {album.title}
        </>
      )
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
        <Button loading={addAlbumResults.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  )
}
