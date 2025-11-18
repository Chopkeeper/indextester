import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { getUsers, addUser, deleteUser } from '../services/db';
import { useAuth } from './AuthContext';
import { PlusIcon, TrashIcon, UserCircleIcon } from './Icons';

interface User {
    id: string;
    createdAt: string;
}

const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUserId, setNewUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Failed to load users from database", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!newUserId || !newPassword) {
            alert('User ID and Password cannot be empty.');
            return;
        }
        if (users.some(user => user.id === newUserId)) {
            alert('User ID already exists.');
            return;
        }

        try {
            await addUser(newUserId, newPassword);
            setNewUserId('');
            setNewPassword('');
            await fetchUsers();
        } catch (error) {
            alert('Failed to add user.');
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (id === currentUser?.id) {
            alert("You cannot delete your own account.");
            return;
        }
        if (id === 'admin') {
            alert("The primary 'admin' account cannot be deleted.");
            return;
        }
        if (window.confirm(`Are you sure you want to delete user "${id}"? This action cannot be undone.`)) {
            try {
                await deleteUser(id);
                await fetchUsers();
            } catch (error) {
                alert('Failed to delete user.');
                console.error(error);
            }
        }
    };

    return (
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <aside className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
                    <h2 className="text-2xl font-bold text-brand-blue-dark mb-6 border-b pb-4">Add New User</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="new-user-id" className="block text-sm font-medium text-gray-600">New User ID</label>
                            <input
                                type="text"
                                id="new-user-id"
                                value={newUserId}
                                onChange={(e) => setNewUserId(e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
                                required
                            />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center justify-center space-x-2">
                                <PlusIcon className="w-5 h-5" />
                                <span>Add User</span>
                            </button>
                        </div>
                    </form>
                </div>
            </aside>

            <section className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-brand-blue-dark mb-6 border-b pb-4">Existing Users ({users.length})</h2>
                    {isLoading ? (
                        <p className="text-center text-gray-500">Loading users...</p>
                    ) : users.length > 0 ? (
                        <div className="space-y-4">
                            {users.map(user => (
                                <div key={user.id} className="border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-md hover:border-brand-blue">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <UserCircleIcon className="w-8 h-8 text-brand-blue-dark" />
                                            <div>
                                                <h3 className="font-bold text-lg text-brand-blue-dark">{user.id} {currentUser?.id === user.id && <span className="text-sm font-normal text-green-600">(You)</span>}</h3>
                                                <p className="text-xs text-gray-400">
                                                    Joined on: {new Date(user.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 ml-4">
                                            {(user.id !== 'admin' && currentUser?.id !== user.id) && (
                                                <button onClick={() => handleDelete(user.id)} className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition" aria-label="Delete user">
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No users found.</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default AdminUsers;
