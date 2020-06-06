import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

interface Props {
  onClear: () => void;
  error?: Error;
}

const ErrorModal: React.FC<Props> = ({ onClear, error }: Props) => {
  const modalContent = <p>{error}</p>;
  return (
    <Modal
      onCancel={onClear}
      overlayProps={{
        header: 'An Error Occurred!',
        footer: <Button onClick={onClear}>Okay</Button>,
        children: modalContent,
      }}
      show={!!error}
    />
  );
};

export default ErrorModal;
