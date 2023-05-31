import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchUsers, addUser } from '../store'
import useThunk from '../hooks/use-thunk'
import Skeleton from './Skeleton'
import Button from './Button'
import UsersListItem from './UsersListItem'

export default function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
  const [doAddUser, isAddingUser, addingUserError] = useThunk(addUser)

  const { usersList } = useSelector((state) => state.users)

  useEffect(() => {
    // console.log('useEffect:', dispatch(fetchUsers()))
    doFetchUsers()
  }, [doFetchUsers])

  const handleAddUser = () => {
    doAddUser()
  }

  const renderUsers = usersList.map((user) => (
    <UsersListItem key={user.id} user={user} />
  ))

  let content
  if (isLoadingUsers) {
    content = <Skeleton times={5} className="h-10 w-full" />
  } else if (loadingUsersError) {
    content = <div>Error fetching users: {loadingUsersError.message}</div>
  } else {
    content = renderUsers.length ? renderUsers : <div>No users...</div>
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users:</h1>
        <Button loading={isAddingUser} onClick={handleAddUser}>
          Add User
        </Button>
        {addingUserError && (
          <div>Error adding user: {addingUserError.message}</div>
        )}
      </div>
      {content}
    </div>
  )
}
