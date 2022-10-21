import React, { useState } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

type Props = {};

export const ImageCropper = (props: Props) => {
  const [image] = useState(
    'https://images.unsplash.com/photo-1599140849279-1014532882fe?fit=crop&w=1300&q=80'
  );

  const onChange = (cropper: CropperRef) => {
    console.log(cropper.getCoordinates(), cropper.getCanvas());
  };

  return <Cropper src={image} onChange={onChange} className={'cropper'} />;
};
