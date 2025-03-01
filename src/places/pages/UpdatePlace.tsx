import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

import './PlaceForm.css';
import useForm from '../../shared/hooks/useForm';
import Card from '../../shared/components/UIElements/Card';
import useHttpClient from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import AuthContext from '../../shared/context/auth-context';

interface ParamTypes {
  placeId: string;
}

const UpdatePlace: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>();
  const { placeId } = useParams<ParamTypes>();
  const { error, loading, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formState, handleInput, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getPlace = async () => {
      try {
        const data = await sendRequest({
          url: `${process.env.REACT_APP_API_URL}places/${placeId}`,
        });
        setSelectedPlace(data?.place);
        setFormData(
          {
            title: {
              value: data?.place?.title || '',
              isValid: !!data?.place,
            },
            description: {
              value: data?.place?.description || '',
              isValid: !!data?.place,
            },
          },
          true
        );
        // eslint-disable-next-line no-empty
      } catch (e) {}
    };
    getPlace();
  }, [placeId, sendRequest, setFormData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await sendRequest({
        url: `${process.env.REACT_APP_API_URL}places/${placeId}`,
        method: 'PATCH',
        body: JSON.stringify({
          title: formState.inputs.title?.value,
          description: formState.inputs.description?.value,
        }),
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });
      // Redirect after succesfull send
      history.push(`/${auth.userId}/places`);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  if (loading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!selectedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Unknown place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!loading && selectedPlace && (
        <form className="place-form" onSubmit={handleSubmit}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter a valid title"
            onInput={handleInput}
            initialValue={selectedPlace?.title}
            initialValidity
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Enter a valid description (at least 5 characters)"
            onInput={handleInput}
            initialValue={selectedPlace?.description}
            initialValidity
          />
          <Button buttonType="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
