// src/components/PhotoUploader.tsx
import React from 'react';

type Props = {
  photos: string[];
  setPhotos: (photos: string[]) => void;
};

const PhotoUploader = ({ photos, setPhotos }: Props) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file));
    setPhotos([...photos, ...newPhotos]);
  };

  return (
    <div className="photo-uploader">
      <input type="file" accept="image/*" multiple onChange={handleUpload} />
      <div className="photo-preview">
        {photos.map((photo, idx) => (
          <img key={idx} src={photo} alt={`photo-${idx}`} width="100" />
        ))}
      </div>
    </div>
  );
};

export default PhotoUploader;
