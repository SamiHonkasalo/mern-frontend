import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import useForm from '../../shared/hooks/useForm';
import useHttpClient from '../../shared/hooks/http-hook';
import AuthContext from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const NewPlace: React.FC = () => {
  const auth = useContext(AuthContext);
  const { error, loading, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const [formState, handleInputChange] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await sendRequest({
        url: 'http://localhost:3001/api/places',
        method: 'POST',
        body: JSON.stringify({
          title: formState.inputs.title?.value,
          description: formState.inputs.description?.value,
          address: formState.inputs.address?.value,
          creator: auth.userId,
        }),
      });
      // Redirect after succesfull send
      history.push('/');
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={handleSubmit}>
        {loading && <LoadingSpinner asOverlay />}
        <Input
          element="input"
          type="text"
          label="Title"
          errorText="Enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          id="title"
          onInput={handleInputChange}
        />
        <Input
          element="textarea"
          label="Description"
          errorText="Enter a valid description (at least 5 characters)"
          validators={[VALIDATOR_MINLENGTH(5)]}
          id="description"
          onInput={handleInputChange}
        />
        <Input
          element="input"
          type="text"
          label="Address"
          errorText="Enter a valid address"
          validators={[VALIDATOR_REQUIRE()]}
          id="address"
          onInput={handleInputChange}
        />
        <Button buttonType="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
