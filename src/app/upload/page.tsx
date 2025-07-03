"use client"
import React, { useState } from 'react';
import { CldUploadWidget,CldImage } from 'next-cloudinary';

interface CloudinaryUploadResult{
    public_id:string;
}
const UploadPage = () => {
    const [publicId, setPublicId] = useState('');
  return (
    <>
    {publicId && 
        <CldImage width="400" height="300" src={publicId} alt='image'/>}
    <CldUploadWidget
      uploadPreset="preset"
      options={{
        sources:['local','camera','google_drive'],
        multiple:true,
        maxFiles:10
      }}
      onSuccess={(result,) => {
        if(result.event !== 'success') return;
        const info = result.info as CloudinaryUploadResult
        setPublicId(info.public_id  );
      }}
    >
      {({ open }) => (
        <button className="btn btn-primary" onClick={() => open()}>
          Upload
        </button>
      )}
    </CldUploadWidget>
    </>

  );
};

export default UploadPage;
