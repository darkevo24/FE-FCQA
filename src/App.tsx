import { useDispatch, useSelector } from 'react-redux';
import { updateUser, deleteUser, RootState, fetchUsers, UserType, addUser } from './redux/store';
import UserList from './components/UserList';
import "./index.css";
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const users = useSelector((state: RootState) => state.users);

  const handleUpdateUser = (username: string, firstName: string, lastName: string) => {
    dispatch(updateUser({ username, firstName, lastName }));
  };

  const handleDeleteUser = (username: string) => {
    dispatch(deleteUser(username));
  };

  const handleAddUser = (user: UserType) => {
    dispatch(addUser(user)).then(() => {
      dispatch(fetchUsers());
    });
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className='p-2'>
      <h3 className=' text-4xl'>Dashboard</h3>
      <p>(Note : Username cannot be same)</p>
      <UserList users={users} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} onAddUser={handleAddUser} />
    </div>
  );
}

export default App;
