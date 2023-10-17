import React, { useEffect, useState } from 'react';
import { UserType } from '../redux/store';
import { useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../redux/store';
import AddUserModal from './modal/index';
import axios from 'axios';

interface UserListProps {
    users: UserType[];
    onUpdateUser: (username: string, firstName: string, lastName: string) => void;
    onDeleteUser: (username: string) => void;
    onAddUser: (user: UserType) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUpdateUser, onDeleteUser, onAddUser }) => {
    const dispatch = useDispatch();

    // Define functions to handle editing and saving
    const [editedUser, setEditedUser] = useState<UserType | null>(null);
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    const handleEdit = (user: UserType) => {
        setEditedUser(user);
    };

    const handleCancel = () => {
        setEditedUser(null);
    };

    const handleSave = () => {
        if (editedUser) {
            onUpdateUser(editedUser.username, editedUser.firstName, editedUser.lastName);
            setEditedUser(null);
        }
    };

    return (
        <div className="p-3">

            <AddUserModal onAddUser={onAddUser} />

            <table className="table-fixed w-full mt-4">
                <thead>
                    <tr>
                        <th className="w-1/4">Username</th>
                        <th className="w-1/4">First Name</th>
                        <th className="w-1/4">Last Name</th>
                        <th className="w-1/4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className='text-center'>
                                {editedUser && editedUser.username === user.username ? (
                                    <input
                                        type="text"
                                        value={editedUser.username}
                                        onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                                        className="w-full border rounded py-1 px-2"
                                    />
                                ) : (
                                    user.username
                                )}
                            </td>
                            <td className='text-center'>
                                {editedUser && editedUser.username === user.username ? (
                                    <input
                                        type="text"
                                        value={editedUser.firstName}
                                        onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                                        className="w-full border rounded py-1 px-2"
                                    />
                                ) : (
                                    user.firstName
                                )}
                            </td>
                            <td className='text-center'>
                                {editedUser && editedUser.username === user.username ? (
                                    <input
                                        type="text"
                                        value={editedUser.lastName}
                                        onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                                        className="w-full border rounded py-1 px-2"
                                    />
                                ) : (
                                    user.lastName
                                )}
                            </td>
                            <td className='text-center'>
                                {editedUser && editedUser.username === user.username ? (
                                    <>
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => onDeleteUser(user.username)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
