import { GoTrashcan } from 'react-icons/go'
import Button from './Button'
import { removeUser } from '../store'
import useThunk from '../hooks/use-thunk'
import ExpendadblePanel from './ExpendadblePanel'
import AlbumsList from './AlbumsList'

export default function UsersListItem({ user }) {
  const [doRemoveUser, isRemovingUser, removingUserError] = useThunk(removeUser)

  const handleRemoveUser = () => {
    doRemoveUser(user.id)
  }

  const header = (
    <>
      <Button
        isRemovingUser={isRemovingUser}
        onClick={handleRemoveUser}
        className="mr-2"
      >
        <GoTrashcan />
      </Button>
      {removingUserError && (
        <div>Error removing user: {removingUserError.message}</div>
      )}
      {user.name}
    </>
  )

  return (
    <ExpendadblePanel header={header}>
      <AlbumsList user={user} />
    </ExpendadblePanel>
  )
}
