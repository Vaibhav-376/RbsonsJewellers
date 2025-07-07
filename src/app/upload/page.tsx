"use client";
import React, { useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryUploadResult {
  public_id: string;
}

const UploadProductImages = () => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {images.map((id, index) => (
          <CldImage key={index} width="200" height="150" src={id} alt={`Product image ${index + 1}`} />
        ))}
      </div>

      <CldUploadWidget
        uploadPreset="preset"
        options={{
          sources: ['local', 'camera', 'google_drive'],
          multiple: true,
          maxFiles: 10
        }}
        onSuccess={(result) => {
          if (result.event !== 'success') return;
          const info = result.info as CloudinaryUploadResult;
          setImages(prev => [...prev, info.public_id]);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary mt-4" onClick={() => open()}>
            Upload Product Images
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default UploadProductImages;
