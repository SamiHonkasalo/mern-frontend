import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

import './PlaceList.css';

interface Props {
  places: Place[];
  deleteCb: (id: string) => void;
}

const PlaceList: React.FC<Props> = ({ places, deleteCb }: Props) => {
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
        <PlaceItem key={p.id} place={p} deleteCb={deleteCb} />
      ))}
    </ul>
  );
};

export default PlaceList;
