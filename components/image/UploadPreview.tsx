import React from 'react';
import Image from 'next/image';
import { TiDelete } from 'react-icons/ti';

type Props = {
  images: File[];
  uploadState: 'idle' | 'uploading' | 'uploaded';
  // uploadProgress: number;
  onRemoveImage: (image: File) => void;
};

export const UploadPreview = ({ images, onRemoveImage }: Props) => {
  return (
    <div className='flex flex-wrap gap-4'>
      {images.map((image) => (
        <div key={image.name} className='relative group w-[100px] h-[100px]'>
          <Image
            width={100}
            height={100}
            src={URL.createObjectURL(image)}
            alt={image.name}
            objectFit='contain'
          />
          <TiDelete
            className='group-hover:visible invisible absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6'
            onClick={() => onRemoveImage(image)}
          />
        </div>
      ))}
    </div>
  );
};
