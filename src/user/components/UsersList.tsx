import React from 'react';
import './UsersList.css';
import UserItem from './UserItem';

interface Props {
    users: User[];
}

const UsersList = ({ users }: Props) => {
    if (users.length === 0) {
        return (
            <div className="center">
                <h2>No users found</h2>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {users.map((u) => (
                <UserItem key={u.id} user={u} />
            ))}
        </ul>
    );
};

export default UsersList;
