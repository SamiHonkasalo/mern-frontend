import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

import './PlaceForm.css';
import useForm from '../../shared/hooks/useForm';
import Card from '../../shared/components/UIElements/Card';

interface ParamTypes {
  placeId: string;
}

const DUMMY_PLACES: Place[] = [
  {
    id: 'p1',
    title: 'Cat',
    description: 'Very cute cat',
    image:
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1342&q=80',
    address: 'Heinämutka 5 A 17',
    location: { lat: 62.28111, lng: 25.77576 },
    creatorId: 'u1',
  },
  {
    id: 'p2',
    title: 'Cat2',
    description: 'Very cute cat2',
    image:
      'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80',
    address: 'Heinämutka 5',
    location: { lat: 62.28111, lng: 25.77576 },
    creatorId: 'u2',
  },
];

const UpdatePlace: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { placeId } = useParams<ParamTypes>();

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

  const selectedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    setFormData(
      {
        title: {
          value: selectedPlace ? selectedPlace.title : '',
          isValid: !!selectedPlace,
        },
        description: {
          value: selectedPlace ? selectedPlace.description : '',
          isValid: !!selectedPlace,
        },
      },
      true
    );
    setLoading(false);
  }, [selectedPlace, setFormData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send to backend
    console.log(formState);
  };

  if (!selectedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Unknown place!</h2>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={handleSubmit}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid title"
        onInput={handleInput}
        initialValue={formState.inputs.title.value}
        initialValidity={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Enter a valid description (at least 5 characters)"
        onInput={handleInput}
        initialValue={formState.inputs.description.value}
        initialValidity={formState.inputs.description.isValid}
      />
      <Button buttonType="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
