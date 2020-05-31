import React from 'react';
import UsersList from '../components/UsersList';

const Users: React.FC = () => {
    const USERS: User[] = [
        {
            id: 'u1',
            name: 'Sami Honkasalo',
            image:
                'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            placeCount: 5,
        },
    ];
    return <UsersList users={USERS} />;
};

export default Users;
