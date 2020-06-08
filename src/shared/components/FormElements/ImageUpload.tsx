import React, { useState, useRef, useEffect } from 'react';

import './ImageUpload.css';
import Button from './Button';

interface Props {
  id: string;
  center?: boolean;
  onInput: (id: string, file: File | null, valid: boolean) => void;
  errorText: string;
}

const ImageUpload: React.FC<Props> = ({
  id,
  center,
  onInput,
  errorText,
}: Props) => {
  const [file, setfile] = useState<File | null>();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          setPreviewUrl(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile: File | null = null;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files.item(0);
      setfile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  const handleImagePickInput = () => filePickerRef?.current?.click();

  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        id={id}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={handleImagePick}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Please select an image</p>
          )}
        </div>
        <Button buttonType="button" onClick={handleImagePickInput}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
