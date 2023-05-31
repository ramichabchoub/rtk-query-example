import { GoTrashcan } from 'react-icons/go'
import { useRemovePhotoMutation } from '../store'
import Button from './Button'

export default function PhotosListItem({ photo }) {
  const [removePhoto, removePhotoResults] = useRemovePhotoMutation()

  const hanlderRemovePhoto = () => {
    removePhoto(photo)
  }
  return (
    <div onClick={hanlderRemovePhoto} className="relative m-2 cursor-pointer">
      <img src={photo.url} alt={photo.title} className="h20 w-20" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <Button isRemoving={removePhotoResults.isLoading}>
          <GoTrashcan className="text-3xl" />
        </Button>
      </div>
    </div>
  )
}
