import { GoTrashcan } from 'react-icons/go'
import { useRemoveAlbumMutation } from '../store'
import Button from './Button'
import ExpendadblePanel from './ExpendadblePanel'

export default function AlbumListItem({ album }) {
  const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation()

  const handleRemoveAlbum = (album) => {
    removeAlbum(album)
  }

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
}
