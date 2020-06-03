import React from 'react';
import './UsersList.css';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

interface Props {
  users: User[];
}

const UsersList: React.FC<Props> = ({ users }: Props) => {
  if (users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
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
