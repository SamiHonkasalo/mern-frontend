import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import './PlaceItem.css';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import AuthContext from '../../shared/context/auth-context';
import useHttpClient from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

interface Props {
  place: Place;
  deleteCb: (id: string) => void;
}

const PlaceItem: React.FC<Props> = ({ place, deleteCb }: Props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { error, loading, sendRequest, clearError } = useHttpClient();

  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);
  const handleOpenConfirmation = () => setShowConfirmation(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);

  const handleDelete = async () => {
    setShowConfirmation(false);
    try {
      await sendRequest({
        url: `${process.env.REACT_APP_API_URL}places/${place.id}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      deleteCb(place.id);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  const closeButton = <Button onClick={handleCloseMap}>CLOSE</Button>;

  const mapModalContent = (
    <div className="map-container">
      <Map center={place.location} zoom={16} />
    </div>
  );

  const confirmModalContent = (
    <p>
      Do you want to proceed and delete this place? This action cannot be
      undone.
    </p>
  );
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={handleCloseMap}
        overlayProps={{
          header: place.address,
          contentClass: 'place-item__modal-content',
          footerClass: 'place-item__modal-actions',
          footer: closeButton,
          children: mapModalContent,
        }}
      />
      <Modal
        onCancel={handleCloseConfirmation}
        show={showConfirmation}
        overlayProps={{
          header: 'Are you sure?',
          footerClass: 'place-item__modal-actions',
          footer: (
            <>
              <Button inverse onClick={handleCloseConfirmation}>
                CANCEL
              </Button>
              <Button danger onClick={handleDelete}>
                DELETE
              </Button>
            </>
          ),
          children: confirmModalContent,
        }}
      />
      <li className="place-item">
        <Card className="place-item__content">
          {loading && <LoadingSpinner asOverlay />}
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
            {auth.userId === place.creator && (
              <>
                <Button to={`/places/${place.id}`}>EDIT</Button>
                <Button danger onClick={handleOpenConfirmation}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
