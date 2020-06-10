import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import useHttpClient from '../../shared/hooks/http-hook';

const Users: React.FC = () => {
  const { error, loading, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState<User[] | null>(null);
  useEffect(() => {
    async function getUsers() {
      try {
        const res = await sendRequest({
          url: `${process.env.REACT_APP_API_URL}users`,
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
      {!loading && users && <UsersList users={users} />}
    </>
  );
};

export default Users;
