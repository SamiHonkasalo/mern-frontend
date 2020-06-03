import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

import './PlaceList.css';

interface Props {
  places: Place[];
}

const PlaceList: React.FC<Props> = ({ places }: Props) => {
  if (places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {places.map((p) => (
        <PlaceItem key={p.id} place={p} />
      ))}
    </ul>
  );
};

export default PlaceList;
