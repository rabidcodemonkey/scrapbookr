import React, { useCallback } from 'react';
import { ImageDropper } from './ImageDropper';
import { UploadPreview } from './UploadPreview';
import { MdCloudUpload } from 'react-icons/md';
import axios from 'axios';
import { IBookr } from '../../pages/api/bookr';
import Router from 'next/router';

type Props = {
  uploadUrl: string;
};

export const ImageUploader = ({ uploadUrl }: Props) => {
  const [images, setImages] = React.useState<File[]>([]);

  const addImages = useCallback((newImages: File[]) => {
    setImages((prevImages: File[]) => {
      return [...prevImages, ...newImages];
    });
  }, []);

  const removeImage = useCallback((image: File) => {
    setImages((prevImages: File[]) => {
      return prevImages.filter((i) => i !== image);
    });
  }, []);

  const uploadImages = useCallback(() => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    axios
      .post<IBookr>(uploadUrl, formData, {
        onUploadProgress: (progressEvent) => {
          console.log(
            'Upload Progress: ',
            Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%',
          );
        },
      })
      .then((response) => {
        //- Redirect to the url in the response
        console.log('Upload response', response);
        Router.push(response.data.url);
      })
      .catch((error) => {
        console.error('Upload error', error);
        alert('Upload failed');
      });
  }, [images, uploadUrl]);

  return (
    <>
      <ImageDropper onDropImages={addImages} />
      <button
        className='mt-8 inline-flex items-center space-x-1'
        disabled={images.length === 0}
        onClick={uploadImages}
      >
        <MdCloudUpload />
        <span>Upload</span>
      </button>
      <UploadPreview images={images} onRemoveImage={removeImage} uploadState='idle' />
    </>
  );
};
