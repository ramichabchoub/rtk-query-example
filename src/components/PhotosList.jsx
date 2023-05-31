import { faker } from '@faker-js/faker'
import { useFetchPhotosQuery, useAddPhotoMutation } from '../store'
import Button from './Button'
import Skeleton from './Skeleton'
import PhotosListItem from './PhotosListItem'

export default function PhotosList({ album }) {
  const { data: photos, isFetching, error } = useFetchPhotosQuery(album)
  const [addPhoto, addPhotoResults] = useAddPhotoMutation()

  const handleAddPhoto = () => {
    addPhoto({
      albumId: album.id,
      url: faker.image.url({ height: 500, width: 500 }),
    })
  }

  let content
  if (isFetching) {
    content = <Skeleton times={4} className="h-8 w-8" />
  } else if (error) {
    content = <div>Error fetching photos: {JSON.stringify(error, null, 2)}</div>
  } else {
    content = photos.map((photo) => (
      <PhotosListItem key={photo.id} photo={photo} />
    ))
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">
          Photos in <span className="text-blue-500">{album.title}</span>
        </h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flew-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  )
}
