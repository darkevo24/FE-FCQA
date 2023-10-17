import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserType, addUser } from '../../redux/store';
import { ThunkDispatch } from '@reduxjs/toolkit';

interface AddUserModalProps {
    onAddUser: (user: UserType) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onAddUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
    });

    const [error, setError] = useState<string>(''); // Initialize error state

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddUser = async () => {
        const { username, firstName, lastName } = formData;

        // Validation
        if (username.length < 4 || username.length > 50) {
            setError('Username must be between 4 and 50 characters.');
            return;
        }

        if (firstName.length < 4 || firstName.length > 50) {
            setError('First name must be between 4 and 50 characters.');
            return;
        }

        if (lastName.length > 55) {
            setError('Last name cannot exceed 55 characters.');
            return;
        }

        // If validation passes, create the user and dispatch the action
        const userData: UserType = {
            username: username,
            firstName: firstName,
            lastName: lastName,
        };
        dispatch(addUser(userData));
        setFormData({
            username: '',
            firstName: '',
            lastName: '',
        });
    };

    return (
        <div>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <button className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    {/* Display validation error message */}
                    {error && <div className="text-red-600">{error}</div>}
                </section>
                <footer className="modal-card-foot">
                    <button
                        className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddUser}
                    >
                        Add User
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default AddUserModal;
