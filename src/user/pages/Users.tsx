import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import useHttpClient from '../../shared/hooks/http-hook';

const Users: React.FC = () => {
  const { error, loading, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const res = await sendRequest({
          url: 'http://localhost:3001/api/users',
        });
        setUsers(res.users);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    getUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && users.length > 0 && <UsersList users={users} />}
    </>
  );
};

export default Users;
