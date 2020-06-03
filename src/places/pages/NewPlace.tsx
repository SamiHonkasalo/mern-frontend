import React from 'react';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import useForm from '../../shared/hooks/useForm';

const NewPlace: React.FC = () => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send to backend
    console.log(formState);
  };

  return (
    <form className="place-form" onSubmit={handleSubmit}>
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
  );
};

export default NewPlace;
