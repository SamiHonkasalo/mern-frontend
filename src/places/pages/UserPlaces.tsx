import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

interface ParamTypes {
    userId: string;
}

interface Props {}

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

const UserPlaces: React.FC<Props> = (props: Props) => {
    const userId = useParams<ParamTypes>().userId;
    const filteredPlaces = DUMMY_PLACES.filter((p) => p.creatorId === userId);

    return <PlaceList places={filteredPlaces} />;
};

export default UserPlaces;
