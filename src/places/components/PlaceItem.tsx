import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import './PlaceItem.css';
import Button from '../../shared/components/FormElements/Button/Button';
import Modal from '../../shared/components/UIElements/Modal';

interface Props {
    place: Place;
}

const PlaceItem: React.FC<Props> = ({ place }: Props) => {
    const [showMap, setShowMap] = useState(false);

    const handleOpenMap = () => setShowMap(true);
    const handleCloseMap = () => setShowMap(false);

    const closeButton = <Button onClick={handleCloseMap}>CLOSE</Button>;
    const modalContent = (
        <div className="map-container">
            <h2>MAP</h2>
        </div>
    );

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={handleCloseMap}
                overlayProps={{
                    header: place.address,
                    contentClass: 'place-item__modal-content',
                    footerClass: 'place-item__modal-actions',
                    footer: closeButton,
                    children: modalContent,
                }}
            />
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={place.image} alt={place.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{place.title}</h2>
                        <h3>{place.address}</h3>
                        <p>{place.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={handleOpenMap}>
                            VIEW ON MAP
                        </Button>
                        <Button to={`/places/${place.id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;
