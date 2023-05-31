import { GoTrashcan } from 'react-icons/go'
import { useRemoveAlbumMutation } from '../store'
import Button from './Button'
import ExpendadblePanel from './ExpendadblePanel'
import PhotosList from './PhotosList'

export default function AlbumListItem({ album }) {
  const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation()

  const handleRemoveAlbum = () => {
    removeAlbum(album)
  }

  const header = (
    <>
      <Button
        isRemoving={removeAlbumResults.isLoading}
        onClick={handleRemoveAlbum}
        className="mr-2"
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  )
  return (
    <ExpendadblePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpendadblePanel>
  )
}
