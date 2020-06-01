import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';

import './PlaceList.css';

interface Props {
    places: Place[];
}

const PlaceList: React.FC<Props> = ({ places }: Props) => {
    if (places.length === 0) {
        return (
            <Card>
                <div className="place-list center">
                    <h2>No places found. Maybe create one?</h2>
                    <button>Share Place</button>
                </div>
            </Card>
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
