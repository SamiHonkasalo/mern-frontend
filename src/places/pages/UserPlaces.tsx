import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import useHttpClient from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

interface ParamTypes {
  userId: string;
}

const UserPlaces: React.FC = () => {
  const [userPlaces, setUserPlaces] = useState<Place[]>([]);
  const { userId } = useParams<ParamTypes>();
  const { error, loading, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const data = await sendRequest({
          url: `http://localhost:3001/api/places/user/${userId}`,
        });
        setUserPlaces(data?.places);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    };

    fetchUserPlaces();
  }, [sendRequest, userId]);

  const handlePlaceDelete = (delId: string) => {
    setUserPlaces((prevPlaces) => prevPlaces.filter((p) => p.id !== delId));
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && userPlaces && (
        <PlaceList places={userPlaces} deleteCb={handlePlaceDelete} />
      )}
    </>
  );
};

export default UserPlaces;
